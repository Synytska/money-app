// import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';

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



export function CreateInvoiceTest({name, children}: {name: string, children:ReactNode}) {
  return (
    <Link
      href={`${name}/create`}
      className="flex h-10 items-center rounded-lg px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      {children}
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
    return (
        <Link href={`/balance/${id}/edit`} className="rounded-md border p-2 hover:bg-gray-100">
            Edit
        </Link>
    );
}

export function DeleteInvoice({ id }: { id: string }) {
    return (
        <>
            <button className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
            </button>
        </>
    );
}
