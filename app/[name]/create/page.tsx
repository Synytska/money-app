import { fetchCustomers, fetchCategoriesByName } from '@/lib/data';
import BreadCrumbs from '@/src/common/components/BreadCrumbs';
import CreateForm from '@/src/modules/create_form/CreateForm';

export default async function Page({ params }: { params: { name: string } }) {
    const name = params.name;
    const [categorie, customers] = await Promise.all([fetchCategoriesByName(name), fetchCustomers()]);
    //  console.log(categorie)
    return (
        <main className="w-full">
            <BreadCrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/balance' },
                    {
                        label: `Create Invoice for ${name}`,
                        href: `/`,
                        active: true
                    }
                ]}
            />
            <CreateForm customers={customers} name={categorie} />
        </main>
    );
}
