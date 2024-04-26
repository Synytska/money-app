import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { LatestInvoices } from '../LatestInvoice/LatestInvoices';
import { ChartComponent } from '../Chart/ChartComponent';
import { TriangleRightIcon } from 'lucide-react';
import { fetchCardDataTest } from '@/lib/data';

export const OverviewComponent = async () => {
    const { totalPaidInvoices } = await fetchCardDataTest();
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-[22px]">Owerview</h2>
            <div className="flex gap-4 md:gap-8">
                <LatestInvoices />
                <div className="bg-white flex flex-col p-4 rounded-2xl justify-between w-full relative">
                    <div className="flex items-center justify-between absolute left-0 top-0 bg-icon_blue w-full px-4 py-2 rounded-t-2xl">
                        <div className="flex gap-2 items-center">
                            <ArrowTrendingUpIcon className="w-7 h-7" />
                            <h2 className="text-[18px]">Spending</h2>
                        </div>
                        <h2>Month</h2>
                    </div>
                    <div className="flex flex-col mt-12 gap-8">
                        <p className="text-[26px]">{totalPaidInvoices}</p>
                        <div className="flex items-center gap-8 px-4">
                            <ChartComponent />
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <TriangleRightIcon fill="#e0bfdf" strokeWidth={0} />
                                    <p>Paid</p>
                                </div>
                                <div className="flex gap-4">
                                    <TriangleRightIcon fill="#f3ffab" strokeWidth={0} />
                                    <p>Pending</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

