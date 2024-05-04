import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { HeadLayout } from './OverviewLayouts';

import { formatDateToLocal } from '@/lib/utils';
import { fetchLatestInvoices } from '@/lib/data';

import { LATEST_INVOICES, USER, AMOUNT, DATE, VIEW_ALL } from '@/src/common/constants/mainconstants';

import { CounterClockwiseClockIcon } from '@radix-ui/react-icons';

export const LatestInvoices = async () => {
    const latestInvoices = await fetchLatestInvoices(); 
    console.log(latestInvoices)

    return (
        <div className="flex flex-col bg-main_white rounded-2xl w-full p-2 lg:p-4 gap-4 relative border border-gray-300">
            <HeadLayout name={LATEST_INVOICES} action={VIEW_ALL} href="/balance">
                <CounterClockwiseClockIcon className="w-7 h-7" />
            </HeadLayout>
            <Table className="rounded-xl p-2 shadow-sm mt-12">
                <TableHeader>
                    <TableRow>
                        <TableHead>{USER}</TableHead>
                        <TableHead>{AMOUNT}</TableHead>
                        <TableHead>{DATE}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {latestInvoices.map((invoice, i) => {
                        return (
                            <TableRow key={i} className="pointer">
                                <TableCell className="font-medium">{invoice.name}</TableCell>
                                <TableCell className="text-left">{invoice.amount}</TableCell>
                                <TableCell className="text-left">{invoice.date}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

