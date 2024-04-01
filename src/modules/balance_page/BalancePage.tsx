import Pagination from '@/src/modules/balance_page/Pagination';
import Search from '@/src/modules/balance_page/Search';
import InvoicesTable from '@/src/modules/balance_page/InvoicesTable';
import { CreateInvoice } from '@/src/modules/balance_page/BalanceButtons';
import { FC } from 'react';

interface IBalance {
    query: string;
    page: string | undefined;
    currentPage: number;
    totalPages: number;
}

export const BalancePage: FC<IBalance> = ({ query, page, currentPage, totalPages }) => {
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl">Invoices</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..." />
                <CreateInvoice />
            </div>
            <InvoicesTable query={query} currentPage={currentPage} />

            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
};

