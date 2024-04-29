import type { Metadata } from 'next';
import React from 'react';

import { BaseLayout } from '@/src/common/components/BaseLayout';
import { MobileMenu } from '@/src/common/components/menu/MobileMenu';
import { MenuBar } from '@/src/common/components/menu/MenuBar';

import '@/src/styles/index.css';

export const metadata: Metadata = {
    title: 'Money App',
    description: 'Generated by create next app'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-main_gray text-base">
                <React.StrictMode>
                    <BaseLayout>
                        <MenuBar />
                        {children}
                        <MobileMenu />
                    </BaseLayout>
                </React.StrictMode>
            </body>
        </html>
    );
}
