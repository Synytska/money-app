'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['unpaid', 'paid']),
    date: z.string(),
    method: z.string(),
    categ_name: z.string()
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
    const { customerId, amount, status, method, categ_name } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
        method: formData.get('method'),
        categ_name: formData.get('categ_name')
    });

    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    await Promise.all([
        sql`
        INSERT INTO invoices (customer_id, amount, status, date, method)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date}, ${method})
`,
        sql`
        UPDATE categories
        SET categ_amount = categ_amount + ${amountInCents}
        WHERE categ_name = ${categ_name}
`
    ]);
    // console.log(categ_name);

    revalidatePath('/balance');
    revalidatePath('/');
    redirect('/balance');
}

export const payInvoice = async (id: string) => {
    await Promise.all([
        sql`
        INSERT INTO archives (customer_id, amount, status, date, method)
        SELECT customer_id, amount, status, date, method FROM invoices WHERE id = ${id};

`,
        sql`
        UPDATE archives
        SET status = 'paid'
`,
        sql`
        DELETE FROM invoices WHERE id = ${id};
`
    ]);

    revalidatePath('/balance');
    revalidatePath('/');
    revalidatePath('/archive');
    redirect('/archive');
};

const UpdateInvoice = FormSchema.omit({ id: true, date: true, method: true, categ_name: true });

// ...

export const updateInvoice = async (id: string, formData: FormData) => {
    const { customerId, amount, status } = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    });

    const amountInCents = amount * 100;

    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;

    revalidatePath('/balance');
    redirect('/balance');
};

export const deleteInvoice = async(id: string) => {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/balance');
    redirect('/balance');

  }

