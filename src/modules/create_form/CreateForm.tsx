'use client';
import { CustomerField } from '@/lib/definitions';
import Link from 'next/link';
import {
    CheckIcon,
    ClockIcon,
    UserCircleIcon,
    CurrencyEuroIcon,
    CreditCardIcon,
    BanknotesIcon
} from '@heroicons/react/24/outline';
import { RADIO_STATUS, RADIO_METHOD } from '@/src/common/constants/mainconstants';
// import { Button } from '@/app/ui/button';
import { createInvoice } from '@/lib/actions';
import { Button } from '@/src/common/components/button';
import { RadioGroupComponent } from './RadioGroup';
import { useToast } from '@/components/ui/use-toast';

export default function CreateForm({ customers, name }: { customers: CustomerField[]; name: string }) {
    const { toast } = useToast();

    const onCreateClick = () => {
        toast({
            variant: 'success',
            title: 'Your invoice was successfully created!'
        });
    }

    return (
        <form action={createInvoice}>
            <div className="rounded-md bg-white p-4 md:p-6">
                <div className="mb-4">
                    <div className="flex justify-between">
                        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                            Choose customer
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="categ_name"
                            value={name}
                            className="text-right bg-white mb-2 font-semibold	text-sm text-gray-600"
                        />
                    </div>
                    <div className="relative">
                        <select
                            id="customer"
                            name="customerId"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue=""
                        >
                            <option value="Khrystyna" disabled>
                                Select a customer
                            </option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                </div>

                {/* Invoice Amount */}
                <div className="mb-4">
                    <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                        Choose an amount
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                step="0.01"
                                required
                                placeholder="Enter EUR amount"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            {/* <label htmlFor="name">{name}</label> */}
                            <CurrencyEuroIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>

                {/* Invoice Status */}
                <fieldset>
                    <div className="flex gap-6 items-center">
                        <legend className="block text-sm font-medium">Status: </legend>
                        <div className="flex gap-4">
                            {RADIO_STATUS.map((status, index) => (
                                <RadioGroupComponent
                                    id={status.id}
                                    value={status.value}
                                    name={status.name}
                                    label={status.label}
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>
                </fieldset>
                <fieldset className="mt-4">
                    <div className="flex gap-4 items-center">
                        <legend className="block text-sm font-medium">Method: </legend>
                        <div className="flex gap-7">
                            {RADIO_METHOD.map((method, index) => (
                                <RadioGroupComponent
                                    id={method.id}
                                    value={method.value}
                                    name={method.name}
                                    label={method.label}
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>
                </fieldset>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/balance"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button
                    onClick={onCreateClick}
                >
                    Create Invoice
                </Button>
            </div>
        </form>
    );
}

