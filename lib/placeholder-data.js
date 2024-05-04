import moment from 'moment';

const date = moment(new Date()).format();

const users = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        name: 'Khrystyna',
        email: 'synystskak@gmail.com',
        password: '123456'
    },
    {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        name: 'Yevhenii',
        email: 'zekagood@gmail.com',
        password: '123456'
    }
];

const invoices = [
    {
        customer_id: users[0].id,
        amount: 0,
        status: 'paid',
        date: new Date(),
        method: 'cash',
        categ_name: 'Car'
    },
    {
        customer_id: users[1].id,
        amount: 0,
        status: 'paid',
        date: new Date(),
        method: 'card',
        categ_name: 'Food'
    }
];

const archives = [
    {
        customer_id: users[0].id,
        amount: 0,
        status: 'paid',
        date: new Date(),
        method: 'cash',
        categ_name: invoices[0].categ_name
    },
    {
        customer_id: users[1].id,
        amount: 0,
        status: 'paid',
        date: new Date(),
        method: 'card',
        categ_name: invoices[1].categ_name
    }
];

const categories = [
    {
        categ_name: 'Food',
        categ_amount: 0
    },
    {
        categ_name: 'Car',
        categ_amount: 0
    },
    {
        categ_name: 'Restaurants',
        categ_amount: 0
    },
    {
        categ_name: 'Clothes',
        categ_amount: 0
    },
    {
        categ_name: 'Pharmacy',
        categ_amount: 0
    },
    {
        categ_name: 'Comunication',
        categ_amount: 0
    }
];
export const dateSeed = {
    users,
    invoices,
    categories,
    archives
};

