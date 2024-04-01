import { UpdateInvoice, DeleteInvoice } from './BalanceButtons';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/src/common/components/table';
import { fetchFilteredInvoices } from '@/lib/data';

export default async function InvoicesTable({ query, currentPage }: { query: string; currentPage: number }) {
    const invoices = await fetchFilteredInvoices(query, currentPage);
    // console.log(invoices);
    return (
        <div className="mt-6 flow-root min-w-full align-middle rounded-lg bg-gray-50 p-2 md:pt-0">
            <Table className="md:hidden">
                {invoices?.map((invoice) => (
                    <TableBody key={invoice.customer_id} className="border-b-[3px]">
                        <TableRow className="pointer mb-2 w-full rounded-md bg-white grid grid-cols-2 justify-between items-center px-3">
                            <TableCell>{invoice.name}</TableCell>
                            <TableCell>{invoice.method}</TableCell>
                            <TableCell className="text-xl font-medium">{invoice.amount}</TableCell>
                            <TableCell>
                                <UpdateInvoice id={invoice.id} />
                            </TableCell>
                            <TableCell>{invoice.date}</TableCell>
                            <TableCell>
                                <DeleteInvoice id={invoice.id} />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                ))}
            </Table>

            <Table className="hidden md:table">
                <TableHeader>
                    <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices?.map((invoice) => {
                        return (
                            <TableRow key={invoice.customer_id} className="pointer mb-2 w-full rounded-md bg-white p-4">
                                <TableCell className="font-medium">{invoice.name}</TableCell>
                                <TableCell>{invoice.amount}</TableCell>
                                <TableCell>{invoice.date}</TableCell>
                                <TableCell className="text-left">{invoice.status}</TableCell>
                                <TableCell className="text-left">{invoice.method}</TableCell>
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
    );
}

