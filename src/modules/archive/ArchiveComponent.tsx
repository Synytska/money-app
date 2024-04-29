import { fetchArchives } from '@/lib/data';
import { TableComponent } from '../balance_page/Filter&Table/TableComponent';
import Pagination from '../balance_page/Pagination';

export const ArchiveComponent = async (props: any) => {
    const current = props.currentPage;
    const total = props.totalPages;
    const { archiveInvoices } = await fetchArchives(current);
    return (
        <>
            {archiveInvoices && (
                <div className="w-full">
                    <div className="flex w-full items-center justify-between">
                        <h1 className="text-2xl">Archive</h1>
                    </div>
                    <TableComponent invoices={archiveInvoices} />
                    <div className="mt-5 flex w-full justify-center">
                        <Pagination totalPages={total} />
                    </div>
                </div>
            )}
        </>
    );
};

