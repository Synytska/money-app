import { FC } from 'react';

interface IForm {
    name: string;
    id: string;
    value: string;
    label: string;
}
export const RadioGroupComponent: FC<IForm> = ({ name, id, value, label }) => {
    return (
        <div className="flex items-center">
            <input
                id={id}
                name={name}
                type="radio"
                checked
                value={value}
                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
            />
            <label
                htmlFor={value}
                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-icon_blue px-3 py-1.5 text-xs font-medium text-gray-600"
            >
                {label}
            </label>
        </div>
    );
};

// <div className="flex items-center">
//                                 <input
//                                     id="pending"
//                                     name="status"
//                                     type="radio"
//                                     value="unpaid"
//                                     checked
//                                     className="h-4 w-4 cursor-pointer border-gray-300 bg-white text-gray-600 focus:ring-2"
//                                 />
//                                 <label
//                                     htmlFor="unpaid"
//                                     className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-icon_blue px-3 py-1.5 text-xs font-medium text-gray-600"
//                                 >
//                                     Unpaid <ClockIcon className="h-4 w-4" />
//                                 </label>
//                             </div>

