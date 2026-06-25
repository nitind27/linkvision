import { Search, X } from 'lucide-react';

export default function SearchInput({ value, onChange, placeholder = 'Search...', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 text-[13px]
          bg-gray-50 dark:bg-slate-800
          border border-gray-200 dark:border-slate-700
          rounded-xl text-gray-700 dark:text-slate-200
          placeholder:text-gray-400
          outline-none focus:border-blue-400 focus:bg-white dark:focus:bg-slate-700
          transition-all"
      />
      {value && (
        <button onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
          <X size={13} />
        </button>
      )}
    </div>
  );
}
