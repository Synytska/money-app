import Link from 'next/link';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

import { formatDateToLocal } from '@/lib/utils';
import { fetchLatestInvoices } from '@/lib/data';

import { LATEST_INVOICES, USER, AMOUNT, DATE, VIEW_ALL } from '@/src/common/constants/mainconstants';

import { CounterClockwiseClockIcon } from '@radix-ui/react-icons';

export const LatestInvoices = async () => {
    const latestInvoices = await fetchLatestInvoices();

    return (
        <div className="flex flex-col bg-main_white rounded-2xl w-full p-2 lg:p-4 gap-4 relative xl:min-w-[500px]">
            <div className="absolute left-0 top-0 bg-icon_blue w-full px-2 lg:px-4 py-2 rounded-t-2xl flex gap-2 items-center">
                <CounterClockwiseClockIcon className="w-7 h-7" />
                <span>{LATEST_INVOICES}</span>
            </div>
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
                                <TableCell className="text-left">{formatDateToLocal(invoice.date)}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <Button asChild className="w-full">
                <Link href="/balance">{VIEW_ALL}</Link>
            </Button>
        </div>
    );
};
