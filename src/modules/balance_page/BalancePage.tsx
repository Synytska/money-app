import Pagination from '@/src/modules/balance_page/Pagination';
import Search from '@/src/modules/balance_page/Search';
import { InvoicesTable } from '@/src/modules/balance_page/InvoicesTable';
import { FC } from 'react';

interface IBalance {
    query: string;
    currentPage: number;
    totalPages: number;
}

export const BalancePage: FC<IBalance> = async ({ query, currentPage, totalPages }) => {
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl">Transactions</h1>
            </div>
            <div className="my-4  flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..." />
                {/* <CreateInvoice /> */}
            </div>
            <InvoicesTable query={query} currentPage={currentPage} />
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages}/>
            </div>
        </div>
    );
};

