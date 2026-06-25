import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/ui/PageHeader';
import SearchInput from '../../components/ui/SearchInput';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Pagination from '../../components/ui/Pagination';
import StatCard from '../../components/ui/StatCard';
import { orders } from '../../dummy-data/index';
import { formatCurrency, formatDateTime, paginate } from '../../utils/helpers';

const PER_PAGE = 10;

export default function Payments() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);

  const payments = orders.map(o => ({
    id: `PAY-${o.id}`,
    orderId: o.id,
    customer: o.customer,
    amount: o.total,
    method: o.paymentMethod,
    status: o.paymentStatus,
    date: o.createdAt,
  }));

  const filtered = useMemo(() => payments.filter(p => {
    const match = !search || p.customer.name.toLowerCase().includes(search.toLowerCase()) || p.orderId.includes(search);
    const matchStatus = !filter || p.status === filter;
    return match && matchStatus;
  }), [search, filter]);

  const paginated = paginate(filtered, page, PER_PAGE);
  const totalPaid = payments.filter(p => p.status === 'Paid').reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'Pending').reduce((s, p) => s + p.amount, 0);

  const stats = [
    { title: 'Total Revenue', value: Math.floor(totalPaid / 1000), prefix: '₹', suffix: 'K', icon: '💰', gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white', change: 12 },
    { title: 'Paid', value: payments.filter(p => p.status === 'Paid').length, icon: '✅', gradient: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white', change: 8 },
    { title: 'Pending', value: Math.floor(totalPending / 1000), prefix: '₹', suffix: 'K', icon: '⏳', gradient: 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white', change: -3 },
    { title: 'Failed', value: payments.filter(p => p.status === 'Failed').length, icon: '❌', gradient: 'bg-gradient-to-br from-red-500 to-red-600 text-white', change: -10 },
  ];

  return (
    <div className="space-y-5">
      <PageHeader title="Payments" subtitle="Payment transactions overview" breadcrumbs={[{ label: 'Payments' }]}
        actions={<Button variant="outline" size="sm" icon={<Download size={14} />}>Export</Button>} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => <StatCard key={s.title} {...s} index={i} />)}
      </div>
      <Card>
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100 dark:border-slate-700">
          <SearchInput value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search payments..." className="w-full sm:w-64" />
          <select value={filter} onChange={e => { setFilter(e.target.value); setPage(1); }} className="text-sm border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Status</option>
            {['Paid', 'Pending', 'Failed', 'Refunded'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr className="text-xs text-slate-500 dark:text-slate-400 uppercase">
                <th className="text-left px-4 py-3 font-semibold">Payment ID</th>
                <th className="text-left px-4 py-3 font-semibold">Customer</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Order</th>
                <th className="text-left px-4 py-3 font-semibold">Amount</th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Method</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Date</th>
                <th className="text-left px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
              {paginated.map((pay, i) => (
                <motion.tr key={pay.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-blue-600 font-semibold">{pay.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <img src={pay.customer.avatar} alt="" className="w-7 h-7 rounded-full" />
                      <span className="text-xs text-slate-700 dark:text-slate-200 font-medium">{pay.customer.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-xs font-mono text-slate-500">{pay.orderId}</td>
                  <td className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">{formatCurrency(pay.amount)}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500"><CreditCard size={12} />{pay.method}</div>
                  </td>
                  <td className="px-4 py-3"><Badge status={pay.status} /></td>
                  <td className="px-4 py-3 hidden lg:table-cell text-xs text-slate-400">{formatDateTime(pay.date)}</td>
                  <td className="px-4 py-3"><button onClick={() => toast.success('Invoice downloaded')} className="text-xs text-blue-600 hover:underline font-medium flex items-center gap-1"><Download size={12} />Invoice</button></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} total={filtered.length} perPage={PER_PAGE} onPageChange={setPage} />
      </Card>
    </div>
  );
}
