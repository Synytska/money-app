import { db } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import moment from 'moment';

import { dateSeed } from '../lib/placeholder-data.js';

const { users, invoices, categories, archives } = dateSeed;

const formatMainDate = (date) => {
    return moment(date).format('YYYY-MM-DD');
};

const seedUsers = async (client) => {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );
        `;
        console.log(`Created "users" table`);

        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.sql`
                INSERT INTO users (id, name, email, password)
                VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
                ON CONFLICT (id) DO NOTHING;
                `;
            })
        );
        console.log(`Seeded ${insertedUsers.length} users`);
        return {
            createTable,
            users: insertedUsers
        };
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
};

const seedCategories = async (client) => {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createCategories = await client.sql`
        CREATE TABLE IF NOT EXISTS categories (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            categ_name VARCHAR(255) NOT NULL,
            categ_amount INT NOT NULL
          );
        `;
        console.log(`Created "categories" table`);

        const insertedCategories = await Promise.all(
            categories.map(
                (categorie) => client.sql`
                INSERT INTO categories (categ_name, categ_amount)
                VALUES (${categorie.categ_name}, ${categorie.categ_amount})
                ON CONFLICT (id) DO NOTHING;
                `
            )
        );
        console.log(`Seeded ${insertedCategories.length} categories`);
        return {
            createCategories,
            categories: insertedCategories
        };
    } catch (error) {
        console.error('Error seeding categories:', error);
        throw error;
    }
};

const seedArchive = async (client) => {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createArchives = await client.sql`
        CREATE TABLE IF NOT EXISTS archives (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            customer_id UUID NOT NULL,
            amount INT NOT NULL,
            status VARCHAR(255) NOT NULL,
            date VARCHAR(255) NOT NULL,
            method VARCHAR(255) NOT NULL,
            categ_name VARCHAR(255) NOT NULL
        );
        `;
        console.log(`Created "archives" table`);

        const insertedArchives = await Promise.all(
            archives.map((invoice) => {
                const formattedDate = formatMainDate(invoice.date);
                client.sql`
                INSERT INTO archives (customer_id, amount, status, date, method, categ_name)
                VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${formattedDate}, ${invoice.method}, ${invoice.categ_name})
                 ON CONFLICT (id) DO NOTHING;
          `;
            })
        );

        console.log(`Seeded ${insertedArchives.length} archivinvoices`);
        return {
            createArchives,
            archives: insertedArchives
        };
    } catch (error) {
        console.error('Error seeding archives:', error);
        throw error;
    }
};

const seedInvoices = async (client) => {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
              CREATE TABLE IF NOT EXISTS invoices (
              id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
              customer_id UUID NOT NULL,
              amount INT NOT NULL,
              status VARCHAR(255) NOT NULL,
              date VARCHAR(255) NOT NULL,
              method VARCHAR(255) NOT NULL,
              categ_name VARCHAR(255) NOT NULL
            );
          `;

        console.log(`Created "invoices" table`);

        const insertedInvoices = await Promise.all(
            invoices.map((invoice) => {
                const formattedDate = formatMainDate(invoice.date);
                client.sql`
          INSERT INTO invoices (customer_id, amount, status, date, method, categ_name)
          VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${formattedDate}, ${invoice.method}, ${invoice.categ_name})
          ON CONFLICT (id) DO NOTHING;
        `;
            })
        );

        console.log(`Seeded ${insertedInvoices.length} invoices`);

        return {
            createTable,
            invoices: insertedInvoices
        };
    } catch (error) {
        console.error('Error seeding invoices:', error);
        throw error;
    }
};

async function main() {
    const client = await db.connect();

    await seedUsers(client);
    await seedInvoices(client);
    await seedCategories(client);
    await seedArchive(client);

    await client.end();
}

main().catch((err) => {
    console.error('An error occurred while attempting to seed the database:', err);
});

