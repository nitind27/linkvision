const map = {
  Active:     'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
  Inactive:   'bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-slate-400',
  Published:  'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
  Draft:      'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400',
  Archived:   'bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-slate-400',
  Delivered:  'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
  Shipped:    'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
  Processing: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400',
  Pending:    'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400',
  Cancelled:  'bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400',
  Paid:       'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
  Failed:     'bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400',
  Refunded:   'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400',
  Completed:  'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
  'In Progress': 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
  'Waiting for Parts': 'bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400',
  'Approval Required': 'bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400',
  Rejected:   'bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400',
  Approved:   'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
  Open:       'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
  Resolved:   'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
  Closed:     'bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-slate-400',
  Expired:    'bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-slate-400',
  Blocked:    'bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400',
};

export default function Badge({ status, className = '' }) {
  const style = map[status] || 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-400';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold ${style} ${className}`}>
      {status}
    </span>
  );
}
