import { FetchMenu } from './fetchMenu';

import { raleway } from '../../fonts/commonfonts';

export const MenuBar = () => {
    return (
        <div className={`${raleway.className} hidden xl:flex flex-col bg-main_white rounded-2xl absolute top-0 left-0 bottom-0 pt-10 px-6`}>
            <h1 className="text-4xl pb-40">MoneyApp</h1>
            <FetchMenu />
        </div>
    );
};



