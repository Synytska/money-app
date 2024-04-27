export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type Invoice = {
    customer_id: string;
    amount: number;
    status: string;
    date: string;
    name: string;
    method: string;
};

export type InvoicesTable = {
    id: string;
    customer_id: string;
    name: string;
    date: string;
    amount: number;
    status: string;
    method: string;
};

export type Categories = {
    categ_name: string;
    categ_img: string;
    categ_amount: number;
};

export type CustomerField = {
    id: string;
    name: string;
};

export type InvoiceForm = {
    id: string;
    customer_id: string;
    amount: number;
    status: string;
};

export type CategoriesForm = {
    name: string;
};

export type CategoriesField = {
    id: string,
    categ_name: string;
    categ_amount: number;
};
