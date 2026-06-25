import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const gradientMap = {
  blue:    'from-blue-500 to-blue-600',
  purple:  'from-violet-500 to-purple-600',
  emerald: 'from-emerald-500 to-teal-600',
  orange:  'from-orange-500 to-amber-600',
  pink:    'from-pink-500 to-rose-600',
  cyan:    'from-cyan-500 to-blue-500',
  yellow:  'from-yellow-500 to-amber-500',
  red:     'from-red-500 to-rose-600',
};

export default function StatCard({ title, value, icon, color = 'blue', change, prefix = '', suffix = '', index = 0 }) {
  const isPositive = change >= 0;
  const gradient = gradientMap[color] || gradientMap.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: 'easeOut' }}
      className="card card-hover p-5 relative overflow-hidden group"
    >
      {/* Background glow */}
      <div className={`absolute -right-6 -top-6 w-28 h-28 bg-gradient-to-br ${gradient} opacity-[0.06] rounded-full blur-xl group-hover:opacity-10 transition-opacity`} />

      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-lg shadow-sm`}>
          {icon}
        </div>
        {change !== undefined && (
          <span className={`flex items-center gap-1 text-[12px] font-semibold px-2.5 py-1 rounded-full ${isPositive ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30' : 'text-red-500 bg-red-50 dark:bg-red-900/30'}`}>
            {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {Math.abs(change)}%
          </span>
        )}
      </div>

      <p className="text-2xl font-bold text-slate-800 dark:text-white mb-1 tracking-tight">
        {prefix}{typeof value === 'number' ? value.toLocaleString('en-IN') : value}{suffix}
      </p>
      <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium">{title}</p>
    </motion.div>
  );
}
