import { fetchInvoicesPages } from '@/lib/data';
import { BalancePage } from '@/src/modules/balance_page/BalancePage';

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

    return <BalancePage query={query} page={searchParams.page} currentPage={currentPage} totalPages={totalPages} />;
};

export default Page;

