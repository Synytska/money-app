import moment from 'moment';

import { Categories } from './Categories/Categories';
import { OverviewComponent } from './Overview/OwerviewComponent';

import { WHOLE_DATE, WELCOME } from '@/src/common/constants/mainconstants';
import { nunitoExtraLight, raleway } from '@/src/common/fonts/commonfonts';

import { AuthProvider } from '@/auth';

export const MainComponent = () => (
    <div className="marg_l flex flex-col justify-between">
        <div className="flex items-center justify-between">
            <div className="flex flex-col">
                <p className={`${raleway.className} text-3xl lg:text-4xl`}>{`${WELCOME} Name!`}</p>
                <span className={`${nunitoExtraLight.className}`}>{moment().format(WHOLE_DATE)}</span>
            </div>

            <div className="md:flex flex-col hidden">
                <AuthProvider />
            </div>
        </div>
        <Categories />
        <OverviewComponent />
    </div>
);

