import { nunitoExtraLight, raleway } from '@/src/common/fonts/commonfonts';

import { Categories } from './Categories/Categories';


export const MainComponent = () => {
    return (
        <div className="flex flex-col justify-between gap-10"> 
            {/* <BalanceCards /> */}
            <div className="flex items-center md:gap-[15rem]">
                <div className="flex flex-col">
                    <span className={`${raleway.className} text-[28px] md:text-[42px]`}>Welcome back, Name!</span>
                    <span className={`${nunitoExtraLight.className}`}>Thursday, date, year</span>
                </div>
                <div className="md:flex flex-col hidden">
                    <span className="">Name Surname</span>
                    <span className={`${nunitoExtraLight.className}`}>mail@gmail.com</span>
                </div>
            </div>
            <Categories />
        </div>
    );
};

