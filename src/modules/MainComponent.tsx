import { Button } from '@/components/ui/button';
import { Categories } from './mainpage/Categories/Categories';
import { Header } from './mainpage/Header';

export const MainComponent = () => {
    return (
        <div className="flex flex-col justify-between p-10 h-screen items-center">
           <Header/>
           <Categories/>
           <Button className='w-full'>Balance</Button>
        </div>
    );
};
