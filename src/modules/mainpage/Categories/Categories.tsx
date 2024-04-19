import { CreateInvoiceTest } from '/Users/hrustyk/Desktop/money-app/src/modules/balance_page/BalanceButtons';
import { CarFrontIcon, ShirtIcon, WifiIcon, AppleIcon, PillIcon, Utensils } from 'lucide-react';
import { fetchCategories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


export const Categories = async () => {
    const categories = await fetchCategories();

    const renderIcon = (categoryName: string) => {
        switch (categoryName) {
            case 'Food':
                return (
                    <div className="bg-icon_green icon">
                        <AppleIcon/>
                    </div>
                );
            case 'Car':
                return (
                    <div className="bg-icon_yell icon">
                        <CarFrontIcon />
                    </div>
                );
            case 'Restaurants':
                return (
                    <div className="bg-icon_purp icon">
                        <Utensils />
                    </div>
                );
            case 'Clothes':
                return (
                    <div className="bg-icon_blue icon">
                        <ShirtIcon />
                    </div>
                );
            case 'Pharmacy':
                return (
                    <div className="bg-icon_red icon">
                        <PillIcon />
                    </div>
                );
            case 'Comunication':
                return (
                    <div className="bg-icon_beg icon">
                        <WifiIcon />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-[18px] md:text-[26px]'>Categories</h2>
            <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 pb-4">
                {categories.map((category, i) => (
                    <div key={i} className="bg-main_white p-2 md:p-4 flex flex-col justify-between items-center gap-2 md:gap-8 rounded-xl">
                        <div className='text-[15px] md:text-[22px]'>{category.categ_name}</div>
                        <CreateInvoiceTest name={category.categ_name}>
                            {renderIcon(category.categ_name)}
                        </CreateInvoiceTest>
                        <div className='text-[16px] md:text-[20px]'>{category.categ_amount}</div>
                    </div>
                ))}
            </div>
            <Button asChild className='w-full'>
                <Link href="/balance">View all transactions</Link>
            </Button>
        </div>
    );
};

