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
            <div className="flex flex-col lg:flex-row w-full gap-8">
                <LatestInvoices />
                <ChartComponent />
            </div>
        </OverviewLayouts>
    );
};

