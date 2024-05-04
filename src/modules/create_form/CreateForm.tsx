'use client';
import { CustomerField } from '@/lib/definitions';
import Link from 'next/link';
import { UserCircleIcon, CurrencyEuroIcon } from '@heroicons/react/24/outline';
import { RADIO_STATUS, RADIO_METHOD } from '@/src/common/constants/mainconstants';
import { createInvoice } from '@/lib/actions';
import { Button } from '@/src/common/components/button';
import { RadioGroupComponent } from './RadioGroup';
import { InputAmount } from './InputGroup';
import { useToast } from '@/components/ui/use-toast';
import { CalendarComponent } from '../balance_page/Filter&Table/Calendar';

export default function CreateForm({ customers, name }: { customers: CustomerField[]; name: string }) {
    const { toast } = useToast();
    const date = new Date().toISOString().split('T')[0];

    const onCreateClick = () => {
        toast({
            variant: 'success',
            title: 'Your invoice was successfully created!'
        });
    };

    return (
        <form action={createInvoice}>
            <div className="flow-root min-w-full align-middle rounded-lg bg-icon_blue p-4 md:pt-0">
                <div className="rounded-lg bg-white p-4 md:p-6 mt-6">
                    <div className="mb-4">
                    <div className="flex items-center gap-4 mb-4">
                            <label htmlFor="date" className="block text-sm font-medium">
                                Choose date
                            </label>
                            <input type="date" id="date" name="date" defaultValue={date} className='border border-gray-200 pl-4 rounded-sm'></input>
                        </div>

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
                    <InputAmount name="amount" id="amount" />
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
            </div>

            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/balance"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button onClick={onCreateClick}>Create Invoice</Button>
            </div>
        </form>
    );
}

