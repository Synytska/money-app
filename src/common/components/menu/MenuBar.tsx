import { raleway } from '../../fonts/commonfonts';
import { FetchMenu } from './fetchMenu';

export const MenuBar = () => {
    return (
        <div className={`${raleway.className} hidden lg:flex flex-col bg-main_white rounded-2xl mt-[-2.5rem] ml-[-2.5rem] pt-10 px-6 h-screen`}>
            <h1 className="text-[38px] pb-40">MoneyApp</h1>
            <FetchMenu />
        </div>
    );
};

