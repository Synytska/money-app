'use server';
import moment from 'moment-timezone';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { roundAmount } from './utils';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['unpaid', 'paid']),
    date: z.string(),
    method: z.string(),
    categ_name: z.string()
});

const CreateInvoice = FormSchema.omit({ id: true });

export async function createInvoice(formData: FormData) {
    const { customerId, amount, status, method, categ_name, date } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
        method: formData.get('method'),
        categ_name: formData.get('categ_name'),
        date: formData.get('date')
    });

    const amountInCents = amount * 100;
    const dateTZ = moment(date).format();

    try {
        await Promise.all([
            sql`
         INSERT INTO invoices (customer_id, amount, status, date, method, categ_name)
         VALUES (${customerId}, ${roundAmount(amountInCents)}, ${status}, ${dateTZ}, ${method}, ${categ_name})
 `,
            sql`
         UPDATE categories
         SET categ_amount = categ_amount + ${roundAmount(amountInCents)}
         WHERE categ_name = ${categ_name}
 `
        ]);
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Invoice.'
        };
    }

    revalidatePath('/balance');
    revalidatePath('/');
    redirect('/');
}

export const payInvoice = async (ids: string[]) => {
    try {
        await Promise.all(
            ids.map(async (id) => {
                await sql`
                INSERT INTO archives (customer_id, amount, status, date, method, categ_name)
                SELECT customer_id, amount, status, date, method, categ_name FROM invoices WHERE id = ${id};
            `;

                await sql`
                UPDATE archives
                SET status = 'paid'
                WHERE id = ${id};
            `;

                await sql`
                DELETE FROM invoices
                WHERE id = ${id};
            `;
            })
        );
    } catch (error) {
        return { message: 'Database Error: Failed to Pay Invoice.' };
    }

    revalidatePath('/balance');
    revalidatePath('/');
    revalidatePath('/archive');
    redirect('/archive');
};

const UpdateInvoice = FormSchema.omit({ id: true, date: true, method: true, categ_name: true });

export const updateInvoice = async (id: string, formData: FormData) => {
    const { customerId, amount, status } = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    });

    const amountInCents = amount * 100;

    try {
        await sql`
     UPDATE invoices
     SET customer_id = ${customerId}, amount = ${roundAmount(amountInCents)}, status = ${status}
     WHERE id = ${id}
   `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice.' };
    }
    revalidatePath('/balance');
    redirect('/balance');
};

export const deleteInvoice = async (id: string) => {
    try {
        const deletedAmount = await sql`
        SELECT amount
        FROM invoices
        WHERE id = ${id}
    `.then((result) => result.rows[0].amount);
        console.log(deletedAmount);

        await sql`
    UPDATE categories
    SET categ_amount = categ_amount - ${deletedAmount}
    WHERE categ_name IN (
        SELECT categ_name
        FROM invoices
        WHERE id = ${id}
    )
`;
        await sql`DELETE FROM invoices
    WHERE id = ${id}`;
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Invoice.' };
    }
    revalidatePath('/');
    revalidatePath('/balance');
    redirect('/');
};

