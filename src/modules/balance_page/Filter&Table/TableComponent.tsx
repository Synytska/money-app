'use client';
import { useState } from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UpdateInvoice, DeleteInvoice, PayInvoice } from './BalanceButtons';

export const TableComponent = ({ invoices }: any) => {
    const [ids, setIds] = useState<string[]>([]);

    const handleOnClick = (id: string) => {
        setIds((prevIds) => {
            if (prevIds.includes(id)) {
                return prevIds.filter((existingId) => existingId !== id);
            } else {
                return [...prevIds, id];
            }
        });
    };
    console.log(ids);

    return (
        <div className="flex flex-col gap-2">
            <div className="mt-6 flow-root min-w-full align-middle rounded-lg bg-icon_blue p-2 md:pt-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='p-4'>All</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Category</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice: any) => {
                            return (
                                <TableRow key={invoice.id} className="pointer mb-2 w-full rounded-md bg-white p-4">
                                    <TableCell>
                                        <input
                                            type="checkbox"
                                            id={invoice.id}
                                            onClick={() => handleOnClick(invoice.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{invoice.name}</TableCell>
                                    <TableCell>{invoice.amount}</TableCell>
                                    <TableCell>{invoice.date}</TableCell>
                                    <TableCell className="text-left">{invoice.status}</TableCell>
                                    <TableCell className="text-left">{invoice.method}</TableCell>
                                    <TableCell className="text-left">{invoice.categ_name}</TableCell>
                                    <TableCell className="flex justify-end gap-3">
                                        <UpdateInvoice id={invoice.id} />
                                        <DeleteInvoice id={invoice.id} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
            <PayInvoice ids={ids} />
        </div>
    );
};

