//menu icons
import {
    BuildingLibraryIcon,
    ChartPieIcon,
    ArchiveBoxIcon,
    ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

export const ICON_MAP = {
    dashboard: { icon: ChartPieIcon, label: 'Dashboard', href: '/' },
    transactions: { icon: BuildingLibraryIcon, label: 'Transactions', href: '/balance' },
    archive: { icon: ArchiveBoxIcon, label: 'Archive', href: '/archive' },
    balance: { icon: ClipboardDocumentListIcon, label: 'Balance', href: '/cards' }
};
