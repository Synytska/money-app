'use client';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, DoughnutController, ArcElement, Tooltip } from 'chart.js';
import moment from 'moment';

import { fetchCardData } from '@/lib/data';
import { IconsLayout, HeadLayout } from '@/src/modules/mainpage/Overview/OverviewLayouts';

import { SPENDING, PAID, PENDING, MONTH } from '@/src/common/constants/mainconstants';

import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

ChartJS.register(DoughnutController, ArcElement, Tooltip);

export const ChartComponent = () => {
    const [paidInvoices, setPaidInvoices] = useState(0);
    const month = moment().format(MONTH);

    return (
        <div className="bg-main_white flex flex-col p-4 rounded-2xl justify-between w-full relative border border-gray-300">
            <HeadLayout name={SPENDING} action={month} href={'/'}>
                <ArrowTrendingUpIcon className="w-7 h-7" />
            </HeadLayout>
            <div className="flex flex-col mt-12 gap-2 items-center lg:items-start">
                <p className="text-[26px]">{`Paid: ${paidInvoices}`}</p>
                <div className="flex items-center gap-8 px-4">
                    <ChartDoughnut setPaidInvoices={setPaidInvoices}/>
                    <div className="hidden lg:flex flex-col gap-4">
                        <IconsLayout name={PAID} fill="#e0bfdf" />
                        <IconsLayout name={PENDING} fill="#f3ffab" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ChartDoughnut = ({ setPaidInvoices }: any) => {
    const [paid, setPaid] = useState(0);
    const [pending, setPending] = useState(0);

    useEffect(() => {
        const fetchingData = async () => {
            try {
                const { totalPaidInvoices, totalPendingInvoices } = await fetchCardData();
                setPaid(parseFloat(totalPaidInvoices.replace(/[^0-9.-]+/g, '')));
                setPending(parseFloat(totalPendingInvoices.replace(/[^0-9.-]+/g, '')));
                setPaidInvoices(totalPaidInvoices);
            } catch (error) {
                console.log(error);
            }
        };
        fetchingData();
    }, [setPaidInvoices]);

    if (!paid || !pending) {
        return (
            <div className="animate-spin rounded-full border-4 border-solid border-icon_purp border-r-transparent h-48 w-48"></div>
        );
    }

    return (
        <div className="w-[200px] h-[200px]">
            <Doughnut
                data={{
                    labels: ['Paid invoices', 'Pending invoices'],
                    datasets: [
                        {
                            label: 'Total',
                            data: [paid, pending],
                            backgroundColor: ['#e0bfdf', '#f3ffab'],
                            hoverOffset: 4,
                            borderWidth: 0
                        }
                    ]
                }}
            />
        </div>
    );
};

