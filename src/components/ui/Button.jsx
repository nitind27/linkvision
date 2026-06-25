import { motion } from 'framer-motion';

const variants = {
  primary: `bg-blue-600 hover:bg-blue-700 text-white border border-blue-700
    shadow-sm shadow-blue-100 dark:shadow-blue-900/30`,
  secondary: `bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200
    border border-gray-200 dark:border-slate-700
    hover:bg-gray-50 dark:hover:bg-slate-700 shadow-sm`,
  danger: `bg-red-500 hover:bg-red-600 text-white border border-red-600
    shadow-sm shadow-red-100 dark:shadow-red-900/30`,
  success: `bg-emerald-500 hover:bg-emerald-600 text-white border border-emerald-600 shadow-sm`,
  outline: `bg-transparent border border-gray-200 dark:border-slate-700
    text-gray-600 dark:text-slate-300
    hover:bg-gray-50 dark:hover:bg-slate-800`,
  ghost: `bg-transparent text-gray-600 dark:text-slate-300
    hover:bg-gray-100 dark:hover:bg-slate-800`,
};

const sizes = {
  xs: 'px-2.5 py-1    text-[11.5px] rounded-lg   gap-1',
  sm: 'px-3.5 py-1.5  text-[12.5px] rounded-xl  gap-1.5',
  md: 'px-4   py-2    text-[13px]   rounded-xl  gap-2',
  lg: 'px-5   py-2.5  text-[14px]   rounded-xl  gap-2',
};

export default function Button({ children, variant = 'primary', size = 'md', className = '', loading = false, icon, ...props }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center font-semibold transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon ? <span className="flex items-center shrink-0">{icon}</span> : null}
      {children}
    </motion.button>
  );
}
