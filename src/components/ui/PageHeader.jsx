import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function PageHeader({ title, subtitle, breadcrumbs = [], actions }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
    >
      <div>
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-[11.5px] text-gray-400 dark:text-slate-500 mb-1.5">
            <Link to="/" className="hover:text-blue-600 flex items-center gap-1 transition">
              <Home size={11} /><span>Home</span>
            </Link>
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight size={11} className="text-gray-300 dark:text-slate-600" />
                {b.to
                  ? <Link to={b.to} className="hover:text-blue-600 transition font-medium">{b.label}</Link>
                  : <span className="text-gray-500 dark:text-slate-400 font-medium">{b.label}</span>
                }
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-[20px] font-bold text-gray-900 dark:text-white tracking-tight">{title}</h1>
        {subtitle && <p className="text-[13px] text-gray-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
    </motion.div>
  );
}
