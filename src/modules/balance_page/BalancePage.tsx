import Pagination from '@/src/modules/balance_page/Pagination';
import Search from '@/src/modules/balance_page/Search';
import {InvoicesTable} from '@/src/modules/balance_page/InvoicesTable';
import { CreateInvoice } from '@/src/modules/balance_page/BalanceButtons';
import { FC } from 'react';

// import { CalendarFilter } from '@/src/common/components/CalendarFilter';

interface IBalance {
    query: string;
    currentPage: number;
    totalPages: number;
}

export const BalancePage: FC<IBalance> = async ({ query, currentPage, totalPages }) => {
    // const invoices =  await fetchFilteredInvoices(query, currentPage);
    // const test = await fetchFilteredDate(currentPage);
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl">Invoices</h1>
            </div>
            <div className="my-4  flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..." />
                <CreateInvoice />
            </div>

            {/* <CalendarFilter /> */}
            <InvoicesTable query={query} currentPage={currentPage} />
            {/* <InvoicesTable invoices = {test}/> */}
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
};

