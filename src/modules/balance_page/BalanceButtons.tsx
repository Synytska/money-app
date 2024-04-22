import Link from 'next/link';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { payInvoice, deleteInvoice } from '@/lib/actions';

export function CreateInvoice() {
    return (
        <Link
            href="/balance/create"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
            <span className="hidden md:block">Create Invoice</span>{' '}
        </Link>
    );
}

export const CreateInvoiceTest = ({ name, children }: { name: string; children: ReactNode }) => {
    return (
        <Link
            href={`${name}/create`}
            className="flex h-10 items-center rounded-lg px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
            {children}
        </Link>
    );
};

export const UpdateInvoice = ({ id }: { id: string }) => {
    return (
        <Link href={`/balance/${id}/edit`} className="block rounded-md bg-icon_yell p-2 hover:bg-gray-100">
            <span className="sr-only">Update</span>
            <PencilIcon className="w-5" />
        </Link>
    );
};

export const DeleteInvoice = ({ id }: { id: string }) => {
    const deleteInvoiceWithId = deleteInvoice.bind(null, id);

    return (
        <>
            <form action={deleteInvoiceWithId}>
                <button className="rounded-md bg-icon_red p-2 hover:bg-gray-100">
                    <span className="sr-only">Delete</span>
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
            <Button variant="green">Pay</Button>
        </form>
    );
};

