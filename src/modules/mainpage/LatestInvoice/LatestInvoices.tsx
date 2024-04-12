import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { formatDateToLocal } from '@/lib/utils';
import { fetchLatestInvoices } from '@/lib/data';

export const LatestInvoices = async () => {
    const latestInvoices = await fetchLatestInvoices();

    return (
        <Table className="rounded-xl p-2 shadow-sm">
            <TableHeader>
                <TableRow className="bg-gray-50">
                    <TableHead className="w-[100px]">User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-left">Amount</TableHead>
                    <TableHead>Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {latestInvoices.map((invoice, i) => {
                    return (
                        <TableRow key={i} className="pointer">
                            <TableCell className="font-medium">{invoice.name}</TableCell>
                            <TableCell>{invoice.status}</TableCell>
                            <TableCell>{invoice.method}</TableCell>
                            <TableCell className="text-left">{invoice.amount}</TableCell>
                            <TableCell className="text-left">{formatDateToLocal(invoice.date)}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

