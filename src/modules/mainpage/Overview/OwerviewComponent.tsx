import { lazy } from 'react';

import { LatestInvoices } from './LatestInvoices';

import { OverviewLayouts } from '@/src/modules/mainpage/Overview/OverviewLayouts';

import { OVERVIEW } from '@/src/common/constants/mainconstants';

const ChartComponent = lazy(() => import('./ChartComponent'));

export const OverviewComponent = () => {
    return (
        <OverviewLayouts name={OVERVIEW}>
            <div className="flex flex-col lg:flex-row w-full gap-8">
                <LatestInvoices />
                <ChartComponent />
            </div>
        </OverviewLayouts>
    );
};

