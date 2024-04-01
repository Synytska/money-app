import { fetchCardDataTest } from '@/lib/data';

interface ICards {
    title?: string;
    value1?: number | string;
    value2?: number | string;
}

export default async function BalanceCards() {
    const { totalPaidInvoices, totalPendingInvoices, numberOfKInvoices, numberOfYInvoices, debtKhrystyna, debtYevhenii } = await fetchCardDataTest();
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card title="Paid" value1={totalPaidInvoices} />
            <Card title="Unpaid" value1={totalPendingInvoices} />
            <DebtCard title="Total" value1={numberOfKInvoices} value2={numberOfYInvoices} />
            <DebtCard title="Debt" value1={debtKhrystyna} value2={debtYevhenii} />

        </div>
    );
}

export function Card({ title, value1 }: ICards) {
    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex py-1">
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <p
                className="
            truncate rounded-xl bg-white px-4 py-2 text-center text-2xl lg:py-8"
            >
                {value1}
            </p>
        </div>
    );
}

export function DebtCard({ title, value1, value2 }: ICards) {
    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex py-1">
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <div className="truncate rounded-xl bg-white px-4 py-2 text-center text-2xl lg:py-8">
                <p>Khrystyna: {value1}</p>
                <p>Yevhenii: {value2}</p>
            </div>
        </div>
    );
}

