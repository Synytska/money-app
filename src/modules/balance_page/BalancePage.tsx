import { FC } from 'react';

import Pagination from '@/src/modules/balance_page/Pagination';
import { Search } from '@/src/modules/balance_page/Search';
import { FilterComponent } from '@/src/modules/balance_page/Filter&Table/FilterComponent';

import { TRANSACTIONS } from '@/src/common/constants/mainconstants';

interface IBalance {
    query: string;
    currentPage: number;
    totalPages: number; 
}

export const BalancePage: FC<IBalance> = async ({ query, currentPage, totalPages }) => (
    <div className="marg_l flex flex-col justify-between">
        <h1 className="text-xl md:text-[22px]">{TRANSACTIONS}</h1>

        <div className="my-4 md:mt-8">
            <Search placeholder="Search invoices..." />
        </div>
        <FilterComponent query={query} currentPage={currentPage} />
        <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
        </div>
    </div>
);

