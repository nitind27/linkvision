import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2 } from 'lucide-react';
import Button from './Button';

export default function ConfirmDialog({ open, title = 'Are you sure?', message, onConfirm, onCancel, danger = true }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onCancel}
          />
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 dark:border-slate-800 z-10"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto ${danger ? 'bg-red-100 dark:bg-red-900/30' : 'bg-blue-100 dark:bg-blue-900/30'}`}>
              {danger ? <Trash2 className="text-red-500" size={20} /> : <AlertTriangle className="text-blue-500" size={20} />}
            </div>
            <h3 className="text-[16px] font-bold text-slate-800 dark:text-white text-center mb-2">{title}</h3>
            {message && <p className="text-[13px] text-slate-500 dark:text-slate-400 text-center mb-6 leading-relaxed">{message}</p>}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={onCancel}>Cancel</Button>
              <Button variant={danger ? 'danger' : 'primary'} className="flex-1" onClick={onConfirm}>
                {danger ? 'Delete' : 'Confirm'}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
