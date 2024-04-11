'use client';
import { DayPicker } from 'react-day-picker';
import { useState, useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { SelectRangeEventHandler } from 'react-day-picker';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/src/common/components/table';
import { UpdateInvoice, DeleteInvoice } from './BalanceButtons';
import 'react-day-picker/dist/style.css';
import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { fetchFilteredInvoices } from '@/lib/data';
import { CalendarFilter } from '@/src/common/components/CalendarFilter';
import { formatDateToLocal } from '@/lib/utils';

export const InvoicesTable = ({ query, currentPage }: any) => {
    // const today = new Date();
    // const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth()-1, 1);
    const [selected, setSelected] = useState<DateRange | undefined>({
        from: new Date(2024, 2, 1),
        to: addDays(new Date(2024, 3, 20), 20)
    });

    const [filteredInvoices, setFilteredInvoices] = useState<any[]>([]);

    // console.log(from)
    useEffect(() => {
     
        (async () => {
            try {
                const invoices = await fetchFilteredInvoices(
                    query,
                    currentPage,
                    selected?.from?.toISOString().substring(0, 10),
                    selected?.to?.toISOString().substring(0, 10)
                );
                setFilteredInvoices(invoices);
                // console.log(invoices);
            } catch (error) {
                console.error('Error fetching invoicesTable:', error);
            }
        })();
    }, [query, currentPage, selected?.from, selected?.to]);

    const handleSelect: SelectRangeEventHandler = (dateRange) => {
        setSelected(dateRange);
    };
    // console.log(selected)

    return (
        <div>
            {/* <DayPicker
                mode="range"
                defaultMonth={new Date(2024, 2)}
                numberOfMonths={2}
                fixedWeeks
                selected={selected}
                onSelect={handleSelect}
            /> */}
            <div className='grid gap-2'>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={'outline'}
                        className={cn(
                            'w-[300px] justify-start text-left font-normal',
                            !selected && 'text-muted-foreground'
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selected?.from ? (
                            selected.to ? (
                                <>
                                    {format(selected.from, 'LLL dd, y')} - {format(selected.to, 'LLL dd, y')}
                                </>
                            ) : (
                                format(selected.from, 'LLL dd, y')
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={selected?.from}
                        selected={selected}
                        onSelect={handleSelect}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>

<div className="mt-6 flow-root min-w-full align-middle rounded-lg bg-gray-50 p-2 md:pt-0">
                 <Table className="md:hidden">
                   {filteredInvoices?.map((invoice: any) => (
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
                            <TableHead>All</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredInvoices?.map((invoice: any) => {
                            return (
                                <TableRow
                                    key={invoice.customer_id}
                                    className="pointer mb-2 w-full rounded-md bg-white p-4"
                                >
                                    <TableCell>
                                        <input type="checkbox" />
                                    </TableCell>
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
        </div>
    );
};

// import { UpdateInvoice, DeleteInvoice } from './BalanceButtons';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/src/common/components/table';
// import { fetchFilteredInvoices } from '@/lib/data';
// import { DateRange } from 'react-day-picker';
// import { Button } from '@/components/ui/button';

// import * as React from 'react';

// import { useState } from 'react';
// import { fetchTestDate } from '@/lib/data';
// import { FilterComponent } from '@/src/common/components/Filter';

// export default async function InvoicesTable({ query, currentPage }: { query: string; currentPage: number }) {
//     const invoices =  await fetchFilteredInvoices(query, currentPage);
//     return (
//         <>
//             {/* <FilterComponent onDateChange={handleDateChange} /> */}
// <Button></Button>
//             <div className="mt-6 flow-root min-w-full align-middle rounded-lg bg-gray-50 p-2 md:pt-0">
//                 <Table className="md:hidden">
//                     {invoices?.map((invoice: any) => (
//                         <TableBody key={invoice.customer_id} className="border-b-[3px]">
//                             <TableRow className="pointer mb-2 w-full rounded-md bg-white grid grid-cols-2 justify-between items-center px-3">
//                                 <TableCell>{invoice.name}</TableCell>
//                                 <TableCell>{invoice.method}</TableCell>
//                                 <TableCell className="text-xl font-medium">{invoice.amount}</TableCell>
//                                 <TableCell>
//                                     <UpdateInvoice id={invoice.id} />
//                                 </TableCell>
//                                 <TableCell>{invoice.date}</TableCell>
//                                 <TableCell>
//                                     <DeleteInvoice id={invoice.id} />
//                                 </TableCell>
//                             </TableRow>
//                         </TableBody>
//                     ))}
//                 </Table>

//                 <Table className="hidden md:table">
//                     <TableHeader>
//                         <TableRow>
//                             <TableHead>All</TableHead>
//                             <TableHead>Customer</TableHead>
//                             <TableHead>Amount</TableHead>
//                             <TableHead>Date</TableHead>
//                             <TableHead>Status</TableHead>
//                             <TableHead>Method</TableHead>
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         {invoices?.map((invoice: any) => {
//                             return (
//                                 <TableRow
//                                     key={invoice.customer_id}
//                                     className="pointer mb-2 w-full rounded-md bg-white p-4"
//                                 >
//                                     <TableCell>
//                                         <input type="checkbox" />
//                                     </TableCell>
//                                     <TableCell className="font-medium">{invoice.name}</TableCell>
//                                     <TableCell>{invoice.amount}</TableCell>
//                                     <TableCell>{invoice.date}</TableCell>
//                                     <TableCell className="text-left">{invoice.status}</TableCell>
//                                     <TableCell className="text-left">{invoice.method}</TableCell>
//                                     <TableCell className="flex justify-end gap-3">
//                                         <UpdateInvoice id={invoice.id} />
//                                         <DeleteInvoice id={invoice.id} />
//                                     </TableCell>
//                                 </TableRow>
//                             );
//                         })}
//                     </TableBody>
//                 </Table>
//             </div>
//         </>
//     );
// }

