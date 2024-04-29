import { FC } from 'react';

import Pagination from '@/src/modules/balance_page/Pagination';
import { Search } from '@/src/modules/balance_page/Search';
import { InvoicesTable } from '@/src/modules/balance_page/InvoicesTable';

import { TRANSACTIONS } from '@/src/common/constants/mainconstants';

interface IBalance {
    query: string;
    currentPage: number;
    totalPages: number;
}

export const BalancePage: FC<IBalance> = async ({ query, currentPage, totalPages }) => (
    <div className="w-full xl:ml-[17rem] flex flex-col justify-between">
        <h1 className="text-xl md:text-[22px]">{TRANSACTIONS}</h1>

        <div className="my-4 md:mt-8">
            <Search placeholder="Search invoices..." />
        </div>
        <InvoicesTable query={query} currentPage={currentPage} />
        <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
        </div>
    </div>
);

