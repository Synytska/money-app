// import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { payInvoice } from '@/lib/actions';

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
        <Link href={`/balance/${id}/edit`} className="rounded-md border p-2 hover:bg-gray-100">
            Edit
        </Link>
    );
};

export const DeleteInvoice = ({ id }: { id: string }) => {
    return (
        <>
            <button className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
            </button>
        </>
    );
};

export const PayInvoice = ({ id }: { id: string }) => {
    const payInvoiceWithId = payInvoice.bind(null, id);
   
    return (
      <form action={payInvoiceWithId}>
        <Button>Pay</Button>
      </form>
    );
  }

