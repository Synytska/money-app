import { Icons } from './Icons';
import Image from 'next/image';
import Link from 'next/link';
import {CreateInvoiceTest} from '/Users/hrustyk/Desktop/money-app/src/modules/balance_page/BalanceButtons'
import { fetchCategories, fetchCategoriesByName } from '@/lib/data';
import { CategoriesForm, CategoriesField } from '@/lib/definitions';
import { formatCurrency } from '@/lib/utils';

export const Categories =  async () => {
    const categories = await fetchCategories();
    // console.log(categories)
    return (
        <div className='w-full grid grid-cols-3 gap-4'>
            {categories.map((categorie, i) => (
                <div key={i} className='bg-[#d7ddeb] p-4 flex flex-col justify-between items-center gap-4 rounded-lg'>
                    <div>{categorie.categ_name}</div>
                    <CreateInvoiceTest name = {categorie.categ_name}>
                    <Image src={categorie.categ_img} alt="logo" width={50} height={50}/>
                    </CreateInvoiceTest>
                    <div>{categorie.categ_amount}</div>
                </div>
            ))}
        </div>

        // <Icons>
        //     <div className="rounded-full bg-[white] size-[230px] border-[30px] border-[#D282C5] flex justify-center items-center">
        //         <p>300$</p>
        //     </div>
        // </Icons>
    );
};

