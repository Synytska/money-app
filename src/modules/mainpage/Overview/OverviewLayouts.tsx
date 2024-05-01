import { ReactNode, FC } from 'react';
import Link from 'next/link';
import { TriangleRightIcon } from 'lucide-react';

interface IHeadLayout {
    name?: string;
    children?: ReactNode;
    action?: string;
    href?: string;
    fill?: string;
}

export const HeadLayout: FC<IHeadLayout> = ({ name, children, action, href }) => {
    return (
        <div className="flex items-center justify-between absolute left-0 top-0 bg-icon_blue w-full px-4 py-2 rounded-t-2xl">
            <div className="flex gap-2 items-center">
                {children}
                <span>{name}</span>
            </div>
            <Link className='underline text-gray-600' href={href ?? "/"}>{action}</Link>
        </div>
    );
};

export const OverviewLayouts: FC<IHeadLayout> = ({ name, children }) => {
    return (
        <div className="flex flex-col gap-4 pt-2">
            <h2 className="text-xl md:text-[22px]">{name}</h2>
            {children}
        </div>
    );
};

export const IconsLayout: FC<IHeadLayout> = ({ name, fill }) => {
    return (
        <div className="flex gap-4">
            <TriangleRightIcon fill={fill} strokeWidth={0} />
            <p>{name}</p>
        </div>
    );
};

