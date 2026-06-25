import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-8xl font-black gradient-text mb-4">404</div>
        <h2 className="text-2xl font-bold text-slate-700 dark:text-white mb-3">Page Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/" className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition">
            <Home size={16} /> Go Home
          </Link>
          <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-5 py-2.5 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition">
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
