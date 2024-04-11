'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
    console.log(categ_name);

    revalidatePath('/balance');
    revalidatePath('/');
    redirect('/');
}

