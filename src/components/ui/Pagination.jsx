import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, total, perPage, onPageChange }) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  const delta = 1;
  const range = [];
  for (let i = Math.max(1, page - delta); i <= Math.min(totalPages, page + delta); i++) {
    range.push(i);
  }
  const showFirst = page - delta > 1;
  const showLast = page + delta < totalPages;

  return (
    <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 dark:border-slate-800">
      <p className="text-[12.5px] text-gray-500 dark:text-slate-400">
        Showing <span className="font-semibold text-gray-700 dark:text-slate-300">{Math.min((page - 1) * perPage + 1, total)}</span>
        {' – '}
        <span className="font-semibold text-gray-700 dark:text-slate-300">{Math.min(page * perPage, total)}</span>
        {' of '}
        <span className="font-semibold text-gray-700 dark:text-slate-300">{total}</span>
      </p>
      <div className="flex items-center gap-1">
        <button onClick={() => onPageChange(page - 1)} disabled={page === 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-30 text-gray-600 dark:text-slate-400 transition">
          <ChevronLeft size={14} />
        </button>

        {showFirst && (
          <>
            <button onClick={() => onPageChange(1)} className="w-8 h-8 text-[12.5px] font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-slate-400 transition">1</button>
            {page - delta > 2 && <span className="text-gray-400 text-xs px-1">…</span>}
          </>
        )}

        {range.map(p => (
          <button key={p} onClick={() => onPageChange(p)}
            className={`w-8 h-8 text-[12.5px] font-semibold rounded-lg transition ${p === page ? 'bg-blue-600 text-white shadow-sm shadow-blue-200 dark:shadow-blue-900' : 'hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-slate-400'}`}>
            {p}
          </button>
        ))}

        {showLast && (
          <>
            {page + delta < totalPages - 1 && <span className="text-gray-400 text-xs px-1">…</span>}
            <button onClick={() => onPageChange(totalPages)} className="w-8 h-8 text-[12.5px] font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-slate-400 transition">{totalPages}</button>
          </>
        )}

        <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-30 text-gray-600 dark:text-slate-400 transition">
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
