import { MainComponent } from '@/src/modules/mainpage/MainComponent';
import { Categories } from '@/src/modules/mainpage/Categories/Categories';
import { fetchCategories, fetchCategoriesByName } from '@/lib/data';

export default function Home() {
    
    return (
        <main className='w-full'>
            <MainComponent />
        </main>
    );
}

