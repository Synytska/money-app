'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { Button } from '@/src/common/components/button';

export const Header = () => {
    const pathname = usePathname();
    return (
        <div className="flex flex-row justify-between w-full items-center pb-16">
            <Button asChild>
                <Link
                    href="/login"
                    className={clsx('flex', {
                        'bg-sky-100 text-blue-600': pathname === '/login'
                    })}
                >
                    Login
                </Link>
            </Button>
            <p className="text-[20px]">Month</p>
            <Button>Archive</Button>
        </div>
    );
};
