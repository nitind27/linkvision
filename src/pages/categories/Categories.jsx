import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { categories as allCategories } from '../../dummy-data/index';

export default function Categories() {
  const [cats, setCats] = useState(allCategories);
  const [deleteId, setDeleteId] = useState(null);

  const parentCats = cats.filter(c => !c.parent);
  const getChildren = (id) => cats.filter(c => c.parent === id);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Categories"
        subtitle={`${cats.length} categories`}
        breadcrumbs={[{ label: 'Categories' }]}
        actions={<Button size="sm" icon={<Plus size={14} />} onClick={() => toast.success('Add category form')}>Add Category</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {parentCats.map((cat, i) => {
          const children = getChildren(cat.id);
          return (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Card className="p-4 card-hover">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-700 dark:text-slate-200 truncate">{cat.icon} {cat.name}</h3>
                      {cat.featured && <Star size={12} className="text-yellow-500 fill-yellow-500 shrink-0" />}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge status={cat.status} />
                      <span className="text-[12px] text-gray-500 dark:text-slate-400">{cat.productCount} products</span>
                    </div>
                    {children.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {children.map(ch => (
                          <span key={ch.id} className="text-xs bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 px-2 py-0.5 rounded-lg">
                            {ch.icon} {ch.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 shrink-0">
                    <button onClick={() => toast.success('Edit form opened')} className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-gray-400 hover:text-gray-600 transition"><Edit size={14} /></button>
                    <button onClick={() => setDeleteId(cat.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-gray-400 hover:text-red-500 transition"><Trash2 size={14} /></button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Category?"
        message="This will also remove all sub-categories. This action is irreversible."
        onConfirm={() => { setCats(c => c.filter(x => x.id !== deleteId && x.parent !== deleteId)); toast.success('Category deleted'); setDeleteId(null); }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
