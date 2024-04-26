'use client';
import Link from 'next/link';
import { ICON_MAP } from '../../constants/menuconstants';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export const FetchMenu = () => {
    const pathname = usePathname();
    return (
        <div className="flex flex-col gap-8 text-[16px] md:text-[22px]">
            {Object.entries(ICON_MAP).map(([key, { icon: Icon, label, href }]) => (
                <Link
                    key={key}
                    href={href}
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

