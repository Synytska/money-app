import { ReactNode } from 'react';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';


import { Button } from '@/components/ui/button';

import { payInvoice, deleteInvoice } from '@/lib/actions';
import { UPDATE, DELETE, PAY } from '@/src/common/constants/mainconstants';

import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export const CreateInvoice = ({ name, children }: { name: string; children: ReactNode }) => {
    return (
        <Link
            href={`${name}/create`}
            className="flex h-10 items-center rounded-lg text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
            {children}
        </Link>
    );
};

export const UpdateInvoice = ({ id }: { id: string }) => {
    return (
        <Link href={`/balance/${id}/edit`} className="block rounded-md bg-icon_yell p-2 hover:bg-gray-100">
            <span className="sr-only">{UPDATE}</span>
            <PencilIcon className="w-5" />
        </Link>
    );
};

export const DeleteInvoice = ({ id }: { id: string }) => {
    const deleteInvoiceWithId = deleteInvoice.bind(null, id);
    const { toast } = useToast();

    const onDeleteClick = () => {
        toast({
            variant: 'delete',
            title: 'Your invoice was successfully deleted!'
        });
    };

    return (
        <>
            <form action={deleteInvoiceWithId}>
                <button onClick={onDeleteClick} className="rounded-md bg-icon_red p-2 hover:bg-gray-100">
                    <span className="sr-only">{DELETE}</span>
                    <TrashIcon className="w-5" />
                </button>
            </form>
        </>
    );
};

export const PayInvoice = ({ id }: { id: string }) => {
    const payInvoiceWithId = payInvoice.bind(null, id);

    return (
        <form action={payInvoiceWithId}>
            <Button variant="green">{PAY}</Button>
        </form>
    );
};

