import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'

import { formatDateToLocal } from '@/lib/utils';
import { fetchLatestInvoices } from '@/lib/data';

export const LatestInvoices = async () => {
    const latestInvoices = await fetchLatestInvoices();

    return (
        <div className='flex flex-col bg-white rounded-2xl w-full p-2 lg:p-4 gap-4 relative xl:min-w-[500px]'>
        <div className='absolute left-0 top-0 bg-icon_blue w-full px-2 lg:px-4 py-2 rounded-t-2xl flex gap-2 items-center'><CounterClockwiseClockIcon className="w-7 h-7"/><span>Latest invoices</span></div>
        <Table className="rounded-xl p-2 shadow-sm mt-12">
            <TableHeader>
                <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead >Amount</TableHead>
                    <TableHead>Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {latestInvoices.map((invoice, i) => {
                    return (
                        <TableRow key={i} className="pointer">
                            <TableCell className="font-medium">{invoice.name}</TableCell>
                            <TableCell className="text-left">{invoice.amount}</TableCell>
                            <TableCell className="text-left">{formatDateToLocal(invoice.date)}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
        </div>
    );
};

