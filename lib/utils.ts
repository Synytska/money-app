import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number) => {
    return (amount / 100).toLocaleString('en-US', {
        style: 'currency',
        currency: 'EUR'
    });
};

// export const formatDateToLocal = (dateStr: string, locale: string = 'en-US') => {
//     const date = new Date(dateStr);
//     const options: Intl.DateTimeFormatOptions = {
//         day: 'numeric',
//         month: 'short',
//         year: 'numeric'
//     };
//     const formatter = new Intl.DateTimeFormat(locale, options);
//     return formatter.format(date);
// };

export const formatDateToLocal = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, 'dd MMM yyyy');
};

export const generatePagination = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};
