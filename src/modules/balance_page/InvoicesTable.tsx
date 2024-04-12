'use client';
import { useState, useEffect, useCallback } from 'react';

import { DateRange } from 'react-day-picker';
import { SelectRangeEventHandler } from 'react-day-picker';
import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format } from 'date-fns';
import { cn } from '@/lib/utils';

import { TableComponent } from './TableComponent';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { fetchFilteredInvoices } from '@/lib/data';

import 'react-day-picker/dist/style.css';

export const InvoicesTable = ({ query, currentPage }: any) => {
    const [selected, setSelected] = useState<DateRange | undefined>();
    const [filteredInvoices, setFilteredInvoices] = useState<any[]>([]);
    const [filteredByDate, setFilteredByDate] = useState<any[]>([]);
    const [isCalendar, setisCalendar] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
        try {
            const { invoiceByQuery, invoiceByDate } = await fetchFilteredInvoices(
                query,
                currentPage,
                selected?.from?.toISOString().substring(0, 10),
                selected?.to?.toISOString().substring(0, 10)
            );
            setFilteredInvoices(invoiceByQuery);
            setFilteredByDate(invoiceByDate);
        } catch (error) {
            console.error('Error fetching invoicesTable:', error);
        }
    }, [query, currentPage, selected?.from, selected?.to]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleOnClick = (prop: boolean) => {
        setisCalendar(prop);
        setSelected(undefined);
        setFilteredInvoices([]);
        setFilteredByDate([]);
        // fetchData();
    };

    const handleSelect: SelectRangeEventHandler = (dateRange) => {
        setSelected(dateRange);
    };

    return (
        <div>
            <div className="gap-2 flex">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            onClick={() => handleOnClick(true)}
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
                <Button variant="secondary" onClick={() => handleOnClick(false)}>
                    Clear X
                </Button>
            </div>
            <TableComponent invoices={isCalendar ? filteredByDate : filteredInvoices} />
        </div>
    );
};

