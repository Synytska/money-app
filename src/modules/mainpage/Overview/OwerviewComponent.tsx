import moment from 'moment';

import { LatestInvoices } from './LatestInvoices';
import { ChartComponent } from './ChartComponent';
import { OverviewLayouts, IconsLayout, HeadLayout } from '@/src/modules/mainpage/Overview/OverviewLayouts';

import { fetchCardData } from '@/lib/data';
import { OVERVIEW, SPENDING, PAID, PENDING, MONTH } from '@/src/common/constants/mainconstants';

import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

export const OverviewComponent = async () => {
    const month = moment().format(MONTH);
    const { totalPaidInvoices } = await fetchCardData();
    return (
        <OverviewLayouts name={OVERVIEW}>
            <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
                <LatestInvoices />
                <div className="bg-main_white flex flex-col p-4 rounded-2xl justify-between w-full relative">
                    <HeadLayout name={SPENDING} action={month} href="/">
                        <ArrowTrendingUpIcon className="w-7 h-7" />
                    </HeadLayout>
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

