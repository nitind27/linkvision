import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const accents = {
  blue:    { gradient: 'from-blue-500 to-blue-700',    glow: 'rgba(37,99,235,0.12)',  light: 'bg-blue-50 dark:bg-blue-950/40'    },
  emerald: { gradient: 'from-emerald-500 to-emerald-700', glow: 'rgba(5,150,105,0.12)', light: 'bg-emerald-50 dark:bg-emerald-950/40' },
  violet:  { gradient: 'from-violet-500 to-violet-700', glow: 'rgba(124,58,237,0.12)', light: 'bg-violet-50 dark:bg-violet-950/40' },
  cyan:    { gradient: 'from-cyan-500 to-cyan-700',    glow: 'rgba(8,145,178,0.12)',   light: 'bg-cyan-50 dark:bg-cyan-950/40'    },
  orange:  { gradient: 'from-orange-500 to-orange-700', glow: 'rgba(234,88,12,0.12)',  light: 'bg-orange-50 dark:bg-orange-950/40' },
  amber:   { gradient: 'from-amber-500 to-amber-600',  glow: 'rgba(217,119,6,0.12)',   light: 'bg-amber-50 dark:bg-amber-950/40'  },
  pink:    { gradient: 'from-pink-500 to-pink-700',    glow: 'rgba(219,39,119,0.12)',  light: 'bg-pink-50 dark:bg-pink-950/40'    },
  red:     { gradient: 'from-red-500 to-red-700',      glow: 'rgba(220,38,38,0.12)',   light: 'bg-red-50 dark:bg-red-950/40'      },
};

export default function StatCard({ title, value, icon, color = 'blue', change, prefix = '', suffix = '', index = 0 }) {
  const acc = accents[color] || accents.blue;
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: 'easeOut' }}
      className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden relative group"
    >
      {/* Subtle background glow */}
      <div
        className="absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ background: `radial-gradient(circle, ${acc.glow} 0%, transparent 70%)` }}
      />

      <div className="flex items-start justify-between mb-4 relative">
        {/* Icon */}
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${acc.gradient} flex items-center justify-center text-lg shadow-sm shrink-0`}>
          {icon}
        </div>

        {/* Change badge */}
        {change !== undefined && (
          <span className={`flex items-center gap-1 text-[11.5px] font-semibold px-2 py-1 rounded-full
            ${isPositive
              ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400'
              : 'text-red-600 bg-red-50 dark:bg-red-950/50 dark:text-red-400'
            }`}>
            {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {Math.abs(change)}%
          </span>
        )}
      </div>

      <p className="text-[22px] font-bold text-gray-900 dark:text-white tracking-tight mb-1">
        {prefix}{typeof value === 'number' ? value.toLocaleString('en-IN') : value}{suffix}
      </p>
      <p className="text-[13px] text-gray-500 dark:text-slate-400 font-medium">{title}</p>
    </motion.div>
  );
}
