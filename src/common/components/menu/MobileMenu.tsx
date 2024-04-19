import { Button } from '@/components/ui/button';
import { Cross1Icon, HomeIcon } from '@radix-ui/react-icons';

import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from '@/components/ui/drawer';
import { FetchMenu } from './fetchMenu';

export const MobileMenu = () => {
    return (
        <Drawer>
            <DrawerTrigger asChild className='lg:hidden'>
                <Button variant="outline" className='mx-auto'><HomeIcon className='h-6 w-6'/></Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm p-4">
                    <FetchMenu />
                    <DrawerFooter>
                        <DrawerClose asChild className='mx-auto'>
                            <Button variant="outline" size="icon">
                                <Cross1Icon className="h-4 w-4" />
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

