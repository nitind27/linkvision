import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { offers as allOffers, coupons as allCoupons } from '../../dummy-data/index';
import { formatCurrency, formatDate } from '../../utils/helpers';

export default function Offers() {
  const [tab, setTab] = useState('offers');

  return (
    <div className="space-y-5">
      <PageHeader title="Offers & Coupons" subtitle="Manage discounts and promotions" breadcrumbs={[{ label: 'Offers' }]}
        actions={<Button size="sm" icon={<Plus size={14} />} onClick={() => toast.success('Add offer form')}>Add {tab === 'offers' ? 'Offer' : 'Coupon'}</Button>} />

      <div className="flex gap-2">
        {['offers', 'coupons'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-5 py-2 rounded-xl text-sm font-medium transition capitalize ${tab === t ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-400 border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800'}`}>
            {t} ({t === 'offers' ? allOffers.length : allCoupons.length})
          </button>
        ))}
      </div>

      {tab === 'offers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {allOffers.map((offer, i) => (
            <motion.div key={offer.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card className="p-4 card-hover">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center text-xl">🏷️</div>
                    <div>
                      <h3 className="font-semibold text-gray-700 dark:text-slate-200 text-sm">{offer.title}</h3>
                      <p className="text-[12px] text-gray-500 dark:text-slate-400">{offer.category}</p>
                    </div>
                  </div>
                  <Badge status={offer.status} />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
                    <p className="text-lg font-bold text-blue-600">{offer.discountType === 'Percentage' ? `${offer.discountValue}%` : formatCurrency(offer.discountValue)}</p>
                    <p className="text-[12px] text-gray-500 dark:text-slate-400">Discount</p>
                  </div>
                  <div className="flex-1 p-2 bg-gray-50 dark:bg-slate-800/50 rounded-xl text-center">
                    <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">{offer.usageCount}</p>
                    <p className="text-[12px] text-gray-500 dark:text-slate-400">Used</p>
                  </div>
                </div>
                <p className="text-[12px] text-gray-500 dark:text-slate-400 mb-3">Expires: {formatDate(offer.endDate)}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="xs" className="flex-1" icon={<Edit size={12} />} onClick={() => toast.success('Edit offer')}>Edit</Button>
                  <Button variant="danger" size="xs" icon={<Trash2 size={12} />} onClick={() => toast.error('Offer deleted')}>Delete</Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === 'coupons' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {allCoupons.map((coupon, i) => (
            <motion.div key={coupon.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card className="p-4 card-hover border-dashed border-2 border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Tag size={18} className="text-blue-600" />
                    <span className="font-bold text-blue-600 font-mono tracking-wide text-sm">{coupon.code}</span>
                  </div>
                  <Badge status={coupon.status} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="bg-gray-50 dark:bg-slate-800/50 p-2 rounded-lg">
                    <p className="text-gray-500 dark:text-slate-400">Discount</p>
                    <p className="font-bold text-gray-700 dark:text-slate-200">{coupon.discountType === 'Percentage' ? `${coupon.discountValue}%` : formatCurrency(coupon.discountValue)}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-800/50 p-2 rounded-lg">
                    <p className="text-gray-500 dark:text-slate-400">Used</p>
                    <p className="font-bold text-gray-700 dark:text-slate-200">{coupon.usedCount}/{coupon.usageLimit}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-800/50 p-2 rounded-lg">
                    <p className="text-gray-500 dark:text-slate-400">Min Order</p>
                    <p className="font-bold text-gray-700 dark:text-slate-200">{formatCurrency(coupon.minOrder)}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-800/50 p-2 rounded-lg">
                    <p className="text-gray-500 dark:text-slate-400">Expires</p>
                    <p className="font-bold text-gray-700 dark:text-slate-200">{formatDate(coupon.expiryDate)}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="xs" className="flex-1" icon={<Edit size={12} />} onClick={() => toast.success('Edit coupon')}>Edit</Button>
                  <Button variant="danger" size="xs" icon={<Trash2 size={12} />} onClick={() => toast.error('Coupon deleted')}>Delete</Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
