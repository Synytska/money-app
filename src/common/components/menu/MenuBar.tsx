import { raleway } from '../../fonts/commonfonts';
import { FetchMenu } from './fetchMenu';

export const MenuBar = () => {
    return (
        <div className={`${raleway.className} hidden lg:flex flex-col bg-main_white rounded-2xl absolute top-0 left-0 bottom-0 pt-10 px-6 z-10`}>
            <h1 className="text-[38px] pb-40">MoneyApp</h1>
            <FetchMenu />
        </div>
    );
};



