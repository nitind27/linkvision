import { PackageOpen } from 'lucide-react';
import Button from './Button';

export default function EmptyState({ title = 'No data found', description = 'Nothing to show here yet.', action, actionLabel, icon: Icon = PackageOpen }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
        <Icon size={34} className="text-gray-400 dark:text-slate-500" />
      </div>
      <h3 className="text-[15px] font-semibold text-gray-700 dark:text-slate-200 mb-2">{title}</h3>
      <p className="text-[13px] text-gray-500 dark:text-slate-400 max-w-xs mb-6">{description}</p>
      {action && <Button onClick={action}>{actionLabel}</Button>}
    </div>
  );
}
