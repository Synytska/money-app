import { fetchCustomers, fetchCategoriesByName } from '@/lib/data';

import BreadCrumbs from '@/src/common/components/BreadCrumbs';
import CreateForm from '@/src/modules/create_form/CreateForm';

export default async function Page({ params }: { params: { name: string } }) {
    const name = params.name;
    const [categorie, customers] = await Promise.all([fetchCategoriesByName(name), fetchCustomers()])
    return (
        <main className="w-full xl:ml-[17rem]">
            <BreadCrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/balance' },
                    {
                        label: `Create Invoice for ${name} Category`,
                        href: `/`,
                        active: true
                    }
                ]}
            />
            <CreateForm customers={customers} name={categorie} />
        </main>
    );
}

