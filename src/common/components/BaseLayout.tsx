import { FC, PropsWithChildren } from 'react';
import { MenuBar } from './menu/MenuBar';
import { MobileMenu } from './menu/MobileMenu';
import { nunito } from '@/src/common/fonts/commonfonts';

export const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={`${nunito.className} antialiased max-w-screen-xl w-full p-10 flex flex-col lg:flex-row gap-20 justify-between`}>
            {children}
        </div>
    );
};

