import { useState, FC } from 'react';
import { DateRange } from 'react-day-picker';
import { SelectRangeEventHandler } from 'react-day-picker';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { CalendarIcon, Cross1Icon } from '@radix-ui/react-icons';

import 'react-day-picker/dist/style.css';

interface DateRangePickerProps {
    onSelectDateRange: (dateRange: any) => void;
    onClose: () => void;
    isOpen: () => void;
    isDisabled: boolean;
}
export const CalendarComponent: FC<DateRangePickerProps> = ({ onSelectDateRange, onClose, isOpen, isDisabled }) => {
    const [selected, setSelected] = useState<DateRange | undefined>();

    const handleSelect: SelectRangeEventHandler = (dateRange) => {
        setSelected(dateRange);
    };

    const handleApply = () => {
        onSelectDateRange(selected);
    };
    return (
        <div className="gap-2 flex">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        onClick={isOpen}
                        id="date"
                        variant={'outline'}
                        className={cn(
                            'w-[300px] justify-start text-left font-normal rounded-lg',
                            !selected && 'text-muted-foreground'
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selected?.from ? (
                            selected.to ? (
                                <>
                                    {format(selected.from, 'LLL dd, y')} - {format(selected.to, 'LLL dd, y')}
                                </>
                            ) : (
                                format(selected.from, 'LLL dd, y')
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pb-6 relative" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={selected?.from}
                        selected={selected}
                        onSelect={handleSelect}
                    />
                    <Button
                        variant="outline"
                        className="absolute bottom-2 left-[39%] bg-icon_blue"
                        onClick={handleApply}
                    >
                        Apply
                    </Button>
                </PopoverContent>
            </Popover>
            <Button variant="outline" onClick={onClose} disabled={isDisabled}>
                <Cross1Icon />
            </Button>
        </div>
    );
};
