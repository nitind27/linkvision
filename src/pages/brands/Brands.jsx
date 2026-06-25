import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Globe, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { brands as allBrands } from '../../dummy-data/index';

export default function Brands() {
  const [brands, setBrands] = useState(allBrands);
  const [deleteId, setDeleteId] = useState(null);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Brands"
        subtitle={`${brands.length} brands`}
        breadcrumbs={[{ label: 'Brands' }]}
        actions={<Button size="sm" icon={<Plus size={14} />} onClick={() => toast.success('Add brand form')}>Add Brand</Button>}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {brands.map((brand, i) => (
          <motion.div key={brand.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="overflow-hidden card-hover">
              <div className="h-24 overflow-hidden relative">
                <img src={brand.banner} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 -mt-8 mb-3">
                  <div className="w-14 h-14 rounded-xl bg-white dark:bg-slate-800 border-2 border-white dark:border-slate-800 shadow overflow-hidden">
                    <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-700 dark:text-slate-200">{brand.name}</h3>
                      {brand.featured && <Star size={12} className="text-yellow-500 fill-yellow-500" />}
                    </div>
                    <Badge status={brand.status} />
                  </div>
                </div>
                <p className="text-[12px] text-gray-500 dark:text-slate-400 mb-3 line-clamp-2">{brand.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[12px] text-gray-500 dark:text-slate-400">
                    <Globe size={12} />
                    <a href={brand.website} target="_blank" rel="noreferrer" className="hover:text-blue-600">{brand.website.replace('https://', '')}</a>
                  </div>
                  <span className="text-[12px] text-gray-500 dark:text-slate-400">{brand.productCount} products</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="xs" className="flex-1" icon={<Edit size={12} />} onClick={() => toast.success('Edit brand')}>Edit</Button>
                  <Button variant="danger" size="xs" icon={<Trash2 size={12} />} onClick={() => setDeleteId(brand.id)}>Delete</Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <ConfirmDialog
        open={!!deleteId}
        title="Delete Brand?"
        message="Are you sure you want to remove this brand?"
        onConfirm={() => { setBrands(b => b.filter(x => x.id !== deleteId)); toast.success('Brand deleted'); setDeleteId(null); }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
