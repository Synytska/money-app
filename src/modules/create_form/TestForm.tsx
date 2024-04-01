'use client';
import { CustomerField } from '@/lib/definitions';
import { useForm } from 'react-hook-form';
import { createInvoice } from '@/lib/actions';
import { Button } from '@/src/common/components/button';
import { z } from 'zod';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
// import { FormSchema } from '@/src/modules/create_form/ZodTest';

// const formSchema = z.object({
//     id: z.string(),
//     customerId: z.string(),
//     amount: z.coerce.number(),
//     status: z.enum(['pending', 'paid']),
//     date: z.string(),
//     method: z.string(),
//     categ_name: z.string()
// });

export const TestForm = ({ customers, name }: { customers: CustomerField[]; name: string }) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            status: 'paid'
        }
    });

    const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
        try {
            const data = new FormData();
            data.append('amount', formData.amount.toString());
            data.append('customerId', formData.customerId);
            data.append('method', formData.method);
            data.append('categ_name', formData.categ_name);
            data.append('status', formData.status);

            await createInvoice(data);
        } catch (error) {
            console.error('Error creating invoice:', error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Choose status</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormDescription>This is your public display name.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}

                {/* <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Choose status</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormDescription>This is your public display name.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
                <FormField
                    control={form.control}
                    name="customerId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Choose Customer</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a customer" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {customers.map((customer) => (
                                        <SelectItem key={customer.id} value={customer.id}>
                                            {customer.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />

                {/* Invoice Amount */}
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Choose an amount</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Enter EUR amount" {...field} />
                            </FormControl>
                            <FormMessage>Only digits</FormMessage>
                        </FormItem>
                    )}
                />

                {/* Name */}
                <FormField
                    control={form.control}
                    name="categ_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Choose Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={name} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value={name}>{name}</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />

                {/* Invoice Status */}
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-row"
                                >
                                    <FormItem className="flex items-center">
                                        <FormControl>
                                            <RadioGroupItem value="pending" />
                                        </FormControl>
                                        <FormLabel className="font-normal">unpaid</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center">
                                        <FormControl>
                                            <RadioGroupItem value="paid" />
                                        </FormControl>
                                        <FormLabel className="font-normal">paid</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Method */}
                <FormField
                    control={form.control}
                    name="method"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-row"
                                >
                                    <FormItem className="flex items-center">
                                        <FormControl>
                                            <RadioGroupItem value="cash" />
                                        </FormControl>
                                        <FormLabel className="font-normal">cash</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center">
                                        <FormControl>
                                            <RadioGroupItem value="card" />
                                        </FormControl>
                                        <FormLabel className="font-normal">card</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Link
                    href="/balance"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

