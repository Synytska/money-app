'use client';
import { useEffect, useState } from 'react';

import { fetchCardData } from '@/lib/data';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, DoughnutController, ArcElement, Tooltip } from 'chart.js';

ChartJS.register(DoughnutController, ArcElement, Tooltip);

export const ChartComponent = () => {
    const [paid, setPaid] = useState(0);
    const [pending, setPending] = useState(0);

    useEffect(() => {
        const fetchingData = async () => {
            try {
                const { totalPaidInvoices, totalPendingInvoices } = await fetchCardData();
                setPaid(parseFloat(totalPaidInvoices.replace(/[^0-9.-]+/g, '')));
                setPending(parseFloat(totalPendingInvoices.replace(/[^0-9.-]+/g, '')));
            } catch (error) {
                console.log(error);
            }
        };
        fetchingData();
    }, []);

    if (!paid || !pending) {
        return (
            <div className="animate-spin rounded-full border-4 border-solid border-current border-r-transparent h-12 w-12"></div>
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
