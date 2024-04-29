 import { BalancePage } from '@/src/modules/balance_page/BalancePage';

import { fetchInvoicesPages } from '@/lib/data';

const Page = async ({
    searchParams
}: {
    searchParams: {
        query?: string;
        page?: string;
    };
}) => {
    if (!searchParams) return null;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchInvoicesPages(query);

    return <BalancePage query={query} currentPage={currentPage} totalPages={totalPages} />;
};

export default Page;

