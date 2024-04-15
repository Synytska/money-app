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
        date: '2024-03-23',
        method: 'cash'
    },
    {
        customer_id: users[1].id,
        amount: 200,
        status: 'paid',
        date: '2024-03-21',
        method: 'card'
    }
];

const archives = [
    {
        customer_id: users[0].id,
        amount: 100,
        status: 'paid',
        date: '2024-03-23',
        method: 'cash'
    },
    {
        customer_id: users[1].id,
        amount: 200,
        status: 'paid',
        date: '2024-03-21',
        method: 'card'
    }
];

const categories = [
    {
        categ_name: 'Food',
        categ_img: '/shop.svg',
        categ_amount: 20
    },
    {
        categ_name: 'Car',
        categ_img: '/car.svg',
        categ_amount: 10
    },
    {
        categ_name: 'Restaurants',
        categ_img: '/restaurant.svg',
        categ_amount: 12
    },
    {
        categ_name: 'Clothes',
        categ_img: '/cloth.svg',
        categ_amount: 16
    },
    {
        categ_name: 'Pharmacy',
        categ_img: '/cross.svg',
        categ_amount: 22
    },
    {
        categ_name: 'Comunication',
        categ_img: '/wifi.svg',
        categ_amount: 122
    }
];

// const date = [{
//     from: new Date(2024, 3, 1),
//     to: addDays(new Date(2024, 4, 20), 20)
// }];

module.exports = {
    users,
    invoices,
    categories,
    archives
};

