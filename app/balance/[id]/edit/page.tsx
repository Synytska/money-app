import { fetchCustomers, fetchInvoiceById } from '@/lib/data';

import EditForm from '@/src/modules/edit_page/EditForm';
import BreadCrumbs from '@/src/common/components/BreadCrumbs';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()]);

    return (
        <main className="w-full xl:ml-[17rem]">
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

