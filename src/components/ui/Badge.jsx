const statusMap = {
  // General
  Active:     'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Inactive:   'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
  // Products
  Published:  'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Draft:      'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Archived:   'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
  // Orders
  Delivered:  'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Shipped:    'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Processing: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  Pending:    'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Cancelled:  'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  // Payment
  Paid:       'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Failed:     'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  Refunded:   'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  // Repairs
  Completed:  'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'In Progress': 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Waiting for Parts': 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'Approval Required': 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  Rejected:   'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  // Reviews
  Approved:   'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  // Tickets
  Open:       'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Resolved:   'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Closed:     'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
  // Offers
  Expired:    'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
  Blocked:    'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
};

export default function Badge({ status, className = '' }) {
  const style = statusMap[status] || 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold tracking-wide ${style} ${className}`}>
      {status}
    </span>
  );
}
