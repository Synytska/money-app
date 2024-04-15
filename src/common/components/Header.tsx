'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { Button } from '@/components/ui/button';
// import Test from './Test';

export const Header = () => {
    const pathname = usePathname();
    return (
        <div className="flex flex-row justify-between w-full items-center pb-16">
            <div className="flex">
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
                <Button asChild>
                    <Link
                        href="/"
                        className={clsx('flex', {
                            'bg-sky-100 text-blue-600': pathname === '/login'
                        })}
                    >
                        Home
                    </Link>
                </Button>
            </div>
            <p className="text-[20px]">Month</p>
            <Button asChild>
                <Link
                    href="/archive"
                    className={clsx('flex', {
                        'bg-sky-100 text-blue-600': pathname === '/login'
                    })}
                >
                    Archive
                </Link>
            </Button>
            {/* <Test/> */}
        </div>
    );
};

