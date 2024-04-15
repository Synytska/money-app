import { fetchArchives } from '@/lib/data';
import { TableComponent } from '../balance_page/TableComponent';

export const ArchiveComponent = async () => {
    const invoices = await fetchArchives();
    // console.log(invoices)
    return (
        <div>
           <TableComponent invoices={invoices}/>
        </div>
    );
};
