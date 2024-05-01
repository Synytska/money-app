import { CreateInvoice } from '@/src/modules/balance_page/Filter&Table/BalanceButtons';
import { OverviewLayouts } from '@/src/modules/mainpage/Overview/OverviewLayouts';

import { fetchCategories } from '@/lib/data';

import { CATEGORIES } from '@/src/common/constants/mainconstants';

import { CarFrontIcon, ShirtIcon, WifiIcon, AppleIcon, PillIcon, Utensils } from 'lucide-react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

export const Categories = async () => {
    const categories = await fetchCategories();

    const RENDER_ICON = (categoryName: string) => {
        switch (categoryName) {
            case 'Food':
                return <AppleIcon />;
            case 'Car':
                return <CarFrontIcon />;
            case 'Restaurants':
                return <Utensils />;
            case 'Clothes':
                return <ShirtIcon />;
            case 'Pharmacy':
                return <PillIcon />;
            case 'Comunication':
                return <WifiIcon />;

            default:
                return null;
        }
    };

    const RENDER_COLOR = (categoryName: string) => {
        switch (categoryName) {
            case 'Food':
                return ' bg-icon_green';
            case 'Car':
                return 'bg-icon_yell';
            case 'Restaurants':
                return 'bg-icon_purp';
            case 'Clothes':
                return 'bg-icon_blue';
            case 'Pharmacy':
                return 'bg-icon_red ';
            case 'Comunication':
                return 'bg-icon_beg';

            default:
                return null;
        }
    };

    return (
        <OverviewLayouts name={CATEGORIES}>
            <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 pb-4">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className={`${RENDER_COLOR(
                            category.categ_name
                        )} icon flex flex-col lg:flex-row items-start lg:items-center justify-between border border-gray-300`}
                    >
                        <div className="flex flex-col gap-2 lg:gap-4">
                            <div className="flex items-center gap-2 lg:gap-4">
                                <span className="w-6 h-6">{RENDER_ICON(category.categ_name)}</span>
                                <div className="md:text-lg">{category.categ_name}</div>
                            </div>
                            <div className="md:text-xl">{category.categ_amount}</div>
                        </div>
                        <CreateInvoice name={category.categ_name}>
                            <PlusCircleIcon className="w-8 h-8" />
                        </CreateInvoice>
                    </div>
                ))}
            </div>
        </OverviewLayouts>
    );
};

