'use client';
import { useState, useEffect, useCallback } from 'react';

import { DateRange } from 'react-day-picker';

import { TableComponent } from './TableComponent';
import { CalendarComponent } from './Calendar';

import { fetchFilteredInvoices } from '@/lib/data';

import 'react-day-picker/dist/style.css';

export interface IFiltered {
    amount: string;
    date: string;
    id: string;
    method: string;
    name: string;
    status: string;
}

export const FilterComponent = ({ query, currentPage }: { query: string; currentPage: number }) => {
    const [selected, setSelected] = useState<DateRange | undefined>();
    const [filteredInvoices, setFilteredInvoices] = useState<IFiltered[]>([]);
    const [filteredByDate, setFilteredByDate] = useState<IFiltered[]>([]);
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
    const [buttonClicked, setButtonClicked] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
        try {
            const { invoiceByQuery, invoiceByDate } = await fetchFilteredInvoices(
                query,
                currentPage,
                selected?.from,
                selected?.to
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
        setIsCalendarOpen(prop);
        setSelected(undefined);
        setFilteredByDate([]);
        setFilteredInvoices([]);
        setButtonClicked(false);

        if (prop === false) {
            setButtonClicked(true);
        }
    };
    return (
        <div>
            <CalendarComponent
                onSelectDateRange={setSelected}
                onClose={() => handleOnClick(false)}
                isOpen={() => handleOnClick(true)}
                isDisabled={buttonClicked}
            />
            <TableComponent invoices={isCalendarOpen ? filteredByDate : filteredInvoices} />
        </div>
    );
};

