import { LatestInvoices } from '../LatestInvoice/LatestInvoices';
import { ChartComponent } from '../Chart/ChartComponent';
import { OverviewLayouts, IconsLayout } from '@/src/common/components/OverviewLayouts';

import { fetchCardData } from '@/lib/data';
import { OVERVIEW, SPENDING, PAID, PENDING } from '@/src/common/constants/mainconstants';

import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

export const OverviewComponent = async () => {
    const { totalPaidInvoices } = await fetchCardData();
    return (
        <OverviewLayouts name={OVERVIEW}>
            <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
                <LatestInvoices />
                <div className="bg-main_white flex flex-col p-4 rounded-2xl justify-between w-full relative">
                    <div className="flex items-center justify-between absolute left-0 top-0 bg-icon_blue w-full px-4 py-2 rounded-t-2xl">
                        <div className="flex gap-2 items-center">
                            <ArrowTrendingUpIcon className="w-7 h-7" />
                            <h2>{SPENDING}</h2>
                        </div>
                        <h2>Month</h2>
                    </div>
                    <div className="flex flex-col mt-12 gap-2 items-center lg:items-start">
                        <p className="text-[26px]">{totalPaidInvoices}</p>
                        <div className="flex items-center gap-8 px-4">
                            <ChartComponent />
                            <div className="hidden lg:flex flex-col gap-4">
                                <IconsLayout name={PAID} fill="#e0bfdf" />
                                <IconsLayout name={PENDING} fill="#f3ffab" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </OverviewLayouts>
    );
};
