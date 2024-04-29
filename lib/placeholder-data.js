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
        amount: 100,
        status: 'paid',
        date: new Date(),
        method: 'cash'
    },
    {
        customer_id: users[1].id,
        amount: 200,
        status: 'paid',
        date: new Date(),
        method: 'card'
    }
];

const archives = [
    {
        customer_id: users[0].id,
        amount: 100,
        status: 'paid',
        date: new Date(),
        method: 'cash'
    },
    {
        customer_id: users[1].id,
        amount: 200,
        status: 'paid',
        date: new Date(),
        method: 'card'
    }
];

const categories = [
    {
        categ_name: 'Food',
        categ_amount: 20
    },
    {
        categ_name: 'Car',
        categ_amount: 10
    },
    {
        categ_name: 'Restaurants',
        categ_amount: 12
    },
    {
        categ_name: 'Clothes',
        categ_amount: 16
    },
    {
        categ_name: 'Pharmacy',
        categ_amount: 22
    },
    {
        categ_name: 'Comunication',
        categ_amount: 122
    }
];

module.exports = {
    users,
    invoices,
    categories,
    archives
};

