'use server';
import { sql } from '@vercel/postgres';

import { formatCurrency, formatDateToLocal, formatMainDate } from './utils';
import { User, Invoice, InvoicesTable, InvoiceForm, CategoriesField } from './definitions';

import { ITEMS_PER_PAGE } from '@/src/common/constants/dbconstants';

//USE!!!
export async function fetchLatestInvoices() {
    try {
        const data = await sql<Invoice>`
        SELECT invoices.amount, users.name, invoices.id, invoices.method, invoices.date, invoices.status
        FROM invoices
        JOIN users ON invoices.customer_id = users.id
        ORDER BY invoices.date DESC
        LIMIT 4`;

        const latestInvoices = data.rows.map((invoice) => ({
            ...invoice,
            date: formatDateToLocal(invoice.date),
            amount: formatCurrency(invoice.amount)
        }));
        return latestInvoices;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest invoices.');
    }
}

export const fetchArchives = async (currentPage: number) => {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const data = await sql`
        SELECT archives.amount, users.name, archives.id, archives.method, archives.date, archives.status, archives.categ_name
        FROM archives
        JOIN users ON archives.customer_id = users.id
        ORDER BY archives.date DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;
        const archiveInvoices = data.rows.map((invoice) => ({
            ...invoice,
            date: formatDateToLocal(invoice.date),
            amount: formatCurrency(invoice.amount)
        }));
        return { archiveInvoices };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch archive_invoices.');
    }
};

export const fetchArchivesPages = async () => {
    try {
        const count = await sql`SELECT COUNT(*)
        FROM archives
        JOIN users ON archives.customer_id = users.id
        `;
        const total = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return total;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of invoices.');
    }
};
//USE!!!
export async function fetchFilteredInvoices(query: string, currentPage: number, startDate?: Date, endDate?: Date) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const formattedStartDate = formatMainDate(startDate);
    const formattedEndDate = formatMainDate(endDate);

    try {
        const invoicesbydate = await sql<InvoicesTable>`
    SELECT * FROM invoices
    JOIN users ON invoices.customer_id = users.id
    WHERE
    invoices.date >= ${formattedStartDate} AND invoices.date <= ${formattedEndDate}
    ORDER BY invoices.date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
        const invoices = await sql<InvoicesTable>`
    SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        invoices.method,
        invoices.categ_name,
        users.name
    FROM invoices
    JOIN users ON invoices.customer_id = users.id
    WHERE
            users.name ILIKE ${`%${query}%`} OR
            invoices.amount::text ILIKE ${`%${query}%`} OR
            invoices.status ILIKE ${`%${query}%`} OR
            invoices.method ILIKE ${`%${query}%`} OR
            invoices.categ_name ILIKE ${`%${query}%`}
    ORDER BY invoices.date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
`;
        const data = await Promise.all([invoices, invoicesbydate]);

        const invoiceByQuery = data[0].rows.map((invoice) => ({
            ...invoice,
            date: formatDateToLocal(invoice.date),
            amount: formatCurrency(invoice.amount)
        }));
        const invoiceByDate = data[1].rows.map((invoice) => ({
            ...invoice,
            date: formatDateToLocal(invoice.date),
            amount: formatCurrency(invoice.amount)
        }));
        return { invoiceByQuery, invoiceByDate };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoices !!!.');
    }
}
//USE!!!
export async function fetchInvoicesPages(query: string) {
    try {
        const count = await sql`SELECT COUNT(*)
      FROM invoices
      JOIN users ON invoices.customer_id = users.id
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`} OR
        invoices.categ_name ILIKE ${`%${query}%`}
    `;

        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of invoices.');
    }
}

export async function fetchCustomers() {
    try {
        const data = await sql<User>`
        SELECT
          id,
          name
        FROM users
        ORDER BY name ASC
      `;

        const customers = data.rows;
        return customers;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all customers.');
    }
}

//USE!!!
export async function fetchCardData() {
    try {
        const cardDataPromise = sql`
            SELECT 
                SUM(CASE WHEN users.name = 'Khrystyna' THEN invoices.amount ELSE 0 END) AS "numberOfKInvoices",
                SUM(CASE WHEN users.name = 'Yevhenii' THEN invoices.amount ELSE 0 END) AS "numberOfYInvoices",
                SUM(CASE WHEN invoices.status = 'unpaid' THEN invoices.amount ELSE 0 END) AS "totalPendingInvoices"
            FROM invoices
            JOIN users ON invoices.customer_id = users.id
        `;

        const paidInvoicesPromise = sql`
            SELECT 
                SUM(CASE WHEN archives.status = 'paid' THEN archives.amount ELSE 0 END) AS "totalPaidInvoices"
            FROM archives
            JOIN users ON archives.customer_id = users.id
        `;

        const [data, payedData] = await Promise.all([cardDataPromise, paidInvoicesPromise]);

        const numberOfKInvoices = data.rows[0].numberOfKInvoices ?? 0;
        const numberOfYInvoices = data.rows[0].numberOfYInvoices ?? 0;

        const debtKhrystyna = Math.max(0, (numberOfYInvoices - numberOfKInvoices) / 2);
        const debtYevhenii = Math.max(0, (numberOfKInvoices - numberOfYInvoices) / 2);

        const formattedData = {
            numberOfKInvoices: formatCurrency(data.rows[0].numberOfKInvoices ?? '0'),
            numberOfYInvoices: formatCurrency(data.rows[0].numberOfYInvoices ?? '0'),
            totalPaidInvoices: formatCurrency(payedData.rows[0].totalPaidInvoices ?? '0'),
            totalPendingInvoices: formatCurrency(data.rows[0].totalPendingInvoices ?? '0'),
            debtKhrystyna: formatCurrency(debtKhrystyna),
            debtYevhenii: formatCurrency(debtYevhenii)
        };
        return formattedData;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card dataTest');
    }
}

export const getUser = async (email: string) => {
    try {
        console.log('Fetching users data...');
        const user = await sql`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0] as User;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
};

export async function fetchInvoiceById(id: string) {
    try {
        const data = await sql<InvoiceForm>`
        SELECT
          invoices.id,
          invoices.customer_id,
          invoices.amount,
          invoices.status
        FROM invoices
        WHERE invoices.id = ${id}
      `;

        const invoice = data.rows.map((invoice) => ({
            ...invoice,
            amount: formatCurrency(invoice.amount)
        }));
        return invoice[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoiceby_id.');
    }
}
//USE!!!
export const fetchCategories = async () => {
    try {
        const categoriesAmount = await sql<CategoriesField>`
        SELECT 
        categories.id,
        categories.categ_name,  
        categories.categ_amount
        FROM categories
        ORDER BY categ_name ASC
        `;
        const data = categoriesAmount.rows.map((data) => ({
            ...data,
            categ_amount: formatCurrency(data.categ_amount)
        }));
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch categories_amount');
    }
};

export const fetchCategoriesByName = async (name: string) => {
    try {
        const categoriesName = await sql`
            SELECT 
            categories.categ_name
            FROM 
            categories
            WHERE 
            categories.categ_name = ${name}
        `;

        const nameResult = categoriesName.rows[0]?.categ_name;
        return nameResult;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch categories_name');
    }
};

