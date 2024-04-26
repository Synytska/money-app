import { CreateInvoiceTest } from '@/src/modules/balance_page/BalanceButtons';
import { CarFrontIcon, ShirtIcon, WifiIcon, AppleIcon, PillIcon, Utensils } from 'lucide-react';
import { fetchCategories } from '@/lib/data';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

export const Categories = async () => {
    const categories = await fetchCategories();

    const renderIcon = (categoryName: string) => {
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

    const renderColor = (categoryName: string) => {
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
        <div className="flex flex-col gap-4">
            <h2 className="text-[18px] md:text-[26px]">Categories</h2>
            <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 pb-4">
                {categories.map((category, i) => (
                    <div key={i} className={`${renderColor(category.categ_name)} icon flex flex-row justify-between`}>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                {renderIcon(category.categ_name)}
                                <div className="text-[15px] md:text-[22px]">{category.categ_name}</div>
                            </div>
                            <div className="text-[16px] md:text-[20px]">{category.categ_amount}</div>
                        </div>
                        <CreateInvoiceTest name={category.categ_name}>
                            <PlusCircleIcon className="w-8 h-8" />
                        </CreateInvoiceTest>
                    </div>
                ))}
            </div>
            {/* <Button asChild className="w-full">
                <Link href="/balance">View all transactions</Link>
            </Button> */}
        </div>
    );
};

