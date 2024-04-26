import { nunitoExtraLight, raleway } from '@/src/common/fonts/commonfonts';
import { WHOLE_DATE } from '@/src/common/constants/mainconstants';
import { HomeIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import moment from 'moment';

import { Categories } from './Categories/Categories';
import { OverviewComponent } from './Overview/OwerviewComponent';

export const MainComponent = () => {
    return (
        <div className="flex flex-col justify-between gap-4 xl:ml-[17rem]">
            {/* <BalanceCards /> */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <p className={`${raleway.className} text-3xl lg:text-[42px]`}>Welcome back, Name!</p>
                    <span className={`${nunitoExtraLight.className}`}>{moment().format(WHOLE_DATE)}</span>
                </div>

                <div className="md:flex flex-col hidden">
                    <span className="">Name Surname</span>
                    <span className={`${nunitoExtraLight.className}`}>mail@gmail.com</span>
                </div>
            </div>
            <Categories />
            <OverviewComponent />
        </div>
    );
};

