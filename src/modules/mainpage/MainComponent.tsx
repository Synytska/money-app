import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Categories } from './Categories/Categories';
import { LatestInvoices } from './LatestInvoice/LatestInvoices';
import BalanceCards from './BalanceCards/BalanceCards';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from '@/components/ui/drawer';

export const MainComponent = () => {
    return (
        <div className="flex flex-col justify-between gap-10">
            <BalanceCards />
            <Categories />
            <Drawer>
                <DrawerTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-3xl h-10 px-6 py-2">
                    Balance
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Last 5 invoices</DrawerTitle>
                        <DrawerDescription>
                            <LatestInvoices />
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button asChild>
                            <Link href="/balance">More</Link>
                        </Button>
                        <DrawerClose>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

