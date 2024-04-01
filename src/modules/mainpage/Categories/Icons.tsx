import { FC, PropsWithChildren } from 'react';
import Image from 'next/image';

export const Icons: FC<PropsWithChildren> = ({ children }) => {
    return(
    <div className="flex flex-col justify-between items-center gap-4">
        <Image src="/shop.svg" alt="shopicon" width={50} height={50} />
        <IconsHorizon>{children}</IconsHorizon>
        <Image src="/cloth.svg" alt="clothicon" width={50} height={50} />
    </div>
);
    }
const IconsHorizon: FC<PropsWithChildren> = ({ children }) => (
    <div className="flex flex-row">
        <div className="flex flex-col justify-between">
            <Image src="/cross.svg" alt="crossicon" width={50} height={50} />
            <Image src="/car.svg" alt="caricon" width={50} height={50} />
        </div>
        {children}
        <div className="flex flex-col justify-between">
            <Image src="/wifi.svg" alt="wifiicon" width={50} height={50} />
            <Image src="/restaurant.svg" alt="restauranticon" width={50} height={50} />
        </div>
    </div>
);

