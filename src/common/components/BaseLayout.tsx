'use client';
import { FC, PropsWithChildren } from 'react';

import { Toaster } from '@/components/ui/toaster';

import { nunito } from '@/src/common/fonts/commonfonts';

export const BaseLayout: FC<PropsWithChildren> = ({ children }) => (
    <div
        className={`${nunito.className} antialiased max-w-screen-2xl w-full p-6 lg:p-10 flex flex-col xl:flex-row gap-8 justify-between`}
    >
        {children}
        <Toaster />
    </div>
);
