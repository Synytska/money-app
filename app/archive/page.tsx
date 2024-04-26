import { fetchArchivesPages } from '@/lib/data';
import { ArchiveComponent } from '@/src/modules/archive/ArchiveComponent';
const Page = async ({
    searchParams
}: {
    searchParams: {
        page?: string;
    };
}) => {
    if (!searchParams) return null;
    const currentPage = Number(searchParams?.page) || 1;
    const total = await fetchArchivesPages();

    return (
        <>
            <ArchiveComponent currentPage = {currentPage} totalPages={total}/>
        </>
    );
};
export default Page;
