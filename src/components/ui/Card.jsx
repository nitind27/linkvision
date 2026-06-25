import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = false, onClick, animate = true }) {
  const base = `bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800
    rounded-2xl shadow-sm ${hover ? 'card-hover cursor-pointer' : ''} ${className}`;

  if (!animate) return <div onClick={onClick} className={base}>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      onClick={onClick}
      className={base}
    >
      {children}
    </motion.div>
  );
}
