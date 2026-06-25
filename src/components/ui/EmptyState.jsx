import { PackageOpen } from 'lucide-react';
import Button from './Button';

export default function EmptyState({ title = 'No data found', description = 'There is nothing to show here yet.', action, actionLabel, icon: Icon = PackageOpen }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
        <Icon size={36} className="text-slate-400 dark:text-slate-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">{description}</p>
      {action && <Button onClick={action}>{actionLabel}</Button>}
    </div>
  );
}
