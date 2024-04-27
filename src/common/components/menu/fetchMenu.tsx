'use client';
import { FC } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import clsx from 'clsx';

import { ICON_MAP } from '../../constants/menuconstants';

interface ICloseFunc {
    closeDrawer?: () => void;
}

export const FetchMenu: FC<ICloseFunc> = ({ closeDrawer }) => {
    const pathname = usePathname();
    return (
        <div className="flex flex-col gap-8 md:text-xl">
            {Object.entries(ICON_MAP).map(([key, { icon: Icon, label, href }]) => (
                <Link
                    key={key}
                    href={href}
                    onClick={closeDrawer}
                    className={clsx('flex px-6 py-2 gap-6 items-center', {
                        'bg-icon_blue rounded-2xl': pathname === `${href}`
                    })}
                >
                    <Icon className="h-8 w-8" />
                    {label}
                </Link>
            ))}
        </div>
    );
};
