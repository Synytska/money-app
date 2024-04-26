'use client'
import { Button } from '@/components/ui/button';
import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useState } from 'react';


import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from '@/components/ui/drawer';
import { FetchMenu } from './fetchMenu';

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
            <DrawerTrigger asChild className='xl:hidden'>
                <Button type='button' variant="bording" onClick={toggleDrawer} className='mx-auto flex gap-2'><span className='text-base'>Menu</span><HamburgerMenuIcon className='h-5 w-5'/></Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm p-4">
                    <FetchMenu closeDrawer={closeDrawer}/>
                    <DrawerFooter>
                        <DrawerClose asChild className='mx-auto'>
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

