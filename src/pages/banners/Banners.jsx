import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { banners as allBanners } from '../../dummy-data/index';
import { formatDate } from '../../utils/helpers';

export default function Banners() {
  const [banners, setBanners] = useState(allBanners);
  const [deleteId, setDeleteId] = useState(null);

  return (
    <div className="space-y-5">
      <PageHeader title="Banners" subtitle={`${banners.length} banners`} breadcrumbs={[{ label: 'Banners' }]}
        actions={<Button size="sm" icon={<Plus size={14} />} onClick={() => toast.success('Add banner form')}>Add Banner</Button>} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {banners.map((banner, i) => (
          <motion.div key={banner.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="overflow-hidden card-hover">
              <div className="relative h-36">
                <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-bold text-white text-sm">{banner.title}</h3>
                  <p className="text-white/70 text-xs">{banner.subtitle}</p>
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                  <Badge status={banner.status} />
                  <span className="text-xs bg-black/40 text-white px-2 py-0.5 rounded-full backdrop-blur">{banner.type}</span>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Button: <span className="font-medium text-slate-700 dark:text-slate-300">{banner.buttonText}</span></p>
                  <p className="text-xs text-slate-400">Ends: {formatDate(banner.endDate)}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => toast.success('Preview opened')} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-slate-600 transition"><Eye size={14} /></button>
                  <button onClick={() => toast.success('Edit form opened')} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-slate-600 transition"><Edit size={14} /></button>
                  <button onClick={() => setDeleteId(banner.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-400 hover:text-red-500 transition"><Trash2 size={14} /></button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <ConfirmDialog open={!!deleteId} title="Delete Banner?" message="This banner will be permanently removed."
        onConfirm={() => { setBanners(b => b.filter(x => x.id !== deleteId)); toast.success('Banner deleted'); setDeleteId(null); }}
        onCancel={() => setDeleteId(null)} />
    </div>
  );
}
