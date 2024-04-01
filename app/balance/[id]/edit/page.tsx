import EditForm from '@/src/modules/edit_page/EditForm';
import BreadCrumbs from '@/src/common/components/BreadCrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()]);
    console.log(invoice);

    return (
        <main>
            <BreadCrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/balance' },
                    {
                        label: 'Edit Invoice',
                        href: `/balance/${id}/edit`,
                        active: true
                    }
                ]}
            />
            <EditForm invoice={invoice} customers={customers} />
        </main>
    );
}

