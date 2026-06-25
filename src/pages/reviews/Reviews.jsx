import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Star, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/ui/PageHeader';
import SearchInput from '../../components/ui/SearchInput';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Pagination from '../../components/ui/Pagination';
import { reviews as allReviews } from '../../dummy-data/index';
import { formatDate, paginate, timeAgo } from '../../utils/helpers';

const PER_PAGE = 8;

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={12} className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
    ))}
  </div>
);

export default function Reviews() {
  const [reviews, setReviews] = useState(allReviews);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() =>
    reviews.filter(r => {
      const match = !search || r.customer.name.toLowerCase().includes(search.toLowerCase()) || r.productName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = !filterStatus || r.status === filterStatus;
      return match && matchStatus;
    }), [reviews, search, filterStatus]);

  const paginated = paginate(filtered, page, PER_PAGE);

  const approve = (id) => { setReviews(r => r.map(x => x.id === id ? { ...x, status: 'Approved' } : x)); toast.success('Review approved'); };
  const reject = (id) => { setReviews(r => r.map(x => x.id === id ? { ...x, status: 'Rejected' } : x)); toast.error('Review rejected'); };

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="space-y-5">
      <PageHeader title="Reviews" subtitle={`${reviews.length} total reviews`} breadcrumbs={[{ label: 'Reviews' }]} />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Average Rating', value: avgRating, icon: '⭐', color: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-900/30' },
          { label: 'Approved', value: reviews.filter(r => r.status === 'Approved').length, icon: '✅', color: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-900/30' },
          { label: 'Pending', value: reviews.filter(r => r.status === 'Pending').length, icon: '⏳', color: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-900/30' },
          { label: 'Rejected', value: reviews.filter(r => r.status === 'Rejected').length, icon: '❌', color: 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/30' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className={`${s.color} rounded-2xl p-4 border`}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <p className="text-2xl font-bold text-gray-700 dark:text-white">{s.value}</p>
            <p className="text-sm text-gray-500 dark:text-slate-400">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <Card>
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-gray-100 dark:border-slate-800">
          <SearchInput value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search reviews..." className="w-full sm:w-64" />
          <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
            className="text-[12.5px] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 text-gray-600 dark:text-slate-300 outline-none focus:border-blue-400 cursor-pointer transition-all">
            <option value="">All Status</option>
            {['Pending', 'Approved', 'Rejected'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="divide-y divide-gray-50 dark:divide-slate-800">
          {paginated.map((review, i) => (
            <motion.div key={review.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="p-4 hover:bg-gray-50 dark:hover:bg-slate-800/40 transition-colors">
              <div className="flex items-start gap-3">
                <img src={review.customer.avatar} alt="" className="w-9 h-9 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-2 mb-1">
                    <p className="font-semibold text-gray-700 dark:text-slate-200 text-sm">{review.customer.name}</p>
                    <StarRating rating={review.rating} />
                    <Badge status={review.status} />
                    <span className="text-[12px] text-gray-500 dark:text-slate-400">{timeAgo(review.createdAt)}</span>
                  </div>
                  <p className="text-xs text-blue-600 mb-1">On: {review.productName}</p>
                  <p className="font-medium text-gray-700 dark:text-slate-200 text-sm mb-1">{review.title}</p>
                  <p className="text-[13px] text-gray-500 dark:text-slate-400">{review.comment}</p>
                  {review.images.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {review.images.map((img, i) => <img key={i} src={img} alt="" className="w-16 h-16 rounded-xl object-cover" />)}
                    </div>
                  )}
                  {review.reply && (
                    <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-2 border-blue-500">
                      <p className="text-xs text-blue-600 font-medium">Admin Reply</p>
                      <p className="text-[13px] text-gray-600 dark:text-slate-400 mt-0.5">{review.reply}</p>
                    </div>
                  )}
                </div>
                {review.status === 'Pending' && (
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button onClick={() => approve(review.id)} className="flex items-center gap-1 text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 px-3 py-1.5 rounded-lg hover:bg-emerald-200 transition">
                      <CheckCircle size={12} /> Approve
                    </button>
                    <button onClick={() => reject(review.id)} className="flex items-center gap-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-200 transition">
                      <XCircle size={12} /> Reject
                    </button>
                    <button onClick={() => toast.success('Reply form opened')} className="flex items-center gap-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition">
                      <MessageSquare size={12} /> Reply
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <Pagination page={page} total={filtered.length} perPage={PER_PAGE} onPageChange={setPage} />
      </Card>
    </div>
  );
}
