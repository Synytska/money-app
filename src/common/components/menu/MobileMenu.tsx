'use client';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from '@/components/ui/drawer';

import { FetchMenu } from './fetchMenu';

import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';

export const MobileMenu = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };
    return (
        <Drawer open={isDrawerOpen}>
            <DrawerTrigger asChild className="xl:hidden mx-auto flex gap-2">
                <Button type="button" variant="bording" onClick={toggleDrawer}>
                    Menu
                    <HamburgerMenuIcon className="h-5 w-5" />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm p-4">
                    <FetchMenu closeDrawer={closeDrawer} />
                    <DrawerFooter>
                        <DrawerClose asChild className="mx-auto">
                            <Button variant="outline" size="icon" onClick={toggleDrawer}>
                                <Cross1Icon className="h-5 w-5" />
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
};
