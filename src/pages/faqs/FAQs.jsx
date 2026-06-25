import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronDown, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { faqs as allFaqs } from '../../dummy-data/index';

export default function FAQs() {
  const [faqs, setFaqs] = useState(allFaqs);
  const [open, setOpen] = useState(null);

  return (
    <div className="space-y-5">
      <PageHeader title="FAQs" subtitle={`${faqs.length} questions`} breadcrumbs={[{ label: 'FAQs' }]}
        actions={<Button size="sm" icon={<Plus size={14} />} onClick={() => toast.success('Add FAQ form')}>Add FAQ</Button>} />
      <Card className="p-4">
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div key={faq.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
              className="border border-gray-100 dark:border-slate-800 rounded-xl overflow-hidden">
              <button onClick={() => setOpen(open === faq.id ? null : faq.id)} className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 dark:hover:bg-slate-800/40 transition">
                <span className="w-7 h-7 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-700 dark:text-slate-200">{faq.question}</p>
                  <span className="text-xs bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 px-2 py-0.5 rounded-full mt-0.5 inline-block">{faq.category}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={e => { e.stopPropagation(); toast.success('Edit FAQ'); }} className="p-1.5 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg text-gray-400 hover:text-gray-600 transition"><Edit size={12} /></button>
                  <button onClick={e => { e.stopPropagation(); setFaqs(f => f.filter(x => x.id !== faq.id)); toast.success('FAQ deleted'); }} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-gray-400 hover:text-red-500 transition"><Trash2 size={12} /></button>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform ${open === faq.id ? 'rotate-180' : ''}`} />
                </div>
              </button>
              <AnimatePresence>
                {open === faq.id && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                    <div className="px-4 pb-4 pt-1 text-[13px] text-gray-600 dark:text-slate-400 border-t border-gray-100 dark:border-slate-800">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
