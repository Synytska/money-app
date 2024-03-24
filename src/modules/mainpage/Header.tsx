import { Button } from '@/components/ui/button';

export const Header = () => {
    return (
        <div className="flex flex-row justify-between w-full items-center">
            <Button>Log in</Button>
            <p className="text-[20px]">Month</p>
            <Button>Archive</Button>
        </div>
    );
};
