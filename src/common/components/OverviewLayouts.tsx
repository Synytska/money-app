import { ReactNode } from 'react';
import { TriangleRightIcon } from 'lucide-react';

export const OverviewLayouts = ({ name, children }: { name: string; children: ReactNode }) => {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl md:text-[22px]">{name}</h2>
            {children}
        </div>
    );
};

export const IconsLayout = ({ name, fill }: { name: string; fill: string }) => {
    return (
        <div className="flex gap-4">
            <TriangleRightIcon fill={fill} strokeWidth={0} />
            <p>{name}</p>
        </div>
    );
};
