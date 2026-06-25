import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Eye, Printer, Download, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import PageHeader from '../../components/ui/PageHeader';
import SearchInput from '../../components/ui/SearchInput';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Pagination from '../../components/ui/Pagination';
import { orders as allOrders } from '../../dummy-data/index';
import { formatCurrency, formatDateTime, paginate } from '../../utils/helpers';

const PER_PAGE = 10;

export default function Orders() {
  const [search, setSearch] = useState('');
  const [filterPayment, setFilterPayment] = useState('');
  const [filterDelivery, setFilterDelivery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filtered = useMemo(() =>
    allOrders.filter(o => {
      const s = search.toLowerCase();
      const matchSearch = !search || o.id.toLowerCase().includes(s) || o.customer.name.toLowerCase().includes(s);
      const matchPayment = !filterPayment || o.paymentStatus === filterPayment;
      const matchDelivery = !filterDelivery || o.deliveryStatus === filterDelivery;
      return matchSearch && matchPayment && matchDelivery;
    }), [search, filterPayment, filterDelivery]);

  const paginated = paginate(filtered, page, PER_PAGE);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Orders"
        subtitle={`${filtered.length} orders total`}
        breadcrumbs={[{ label: 'Orders' }]}
        actions={<Button variant="outline" size="sm" icon={<Download size={14} />}>Export</Button>}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', value: allOrders.length, color: 'bg-blue-500' },
          { label: 'Delivered', value: allOrders.filter(o => o.deliveryStatus === 'Delivered').length, color: 'bg-emerald-500' },
          { label: 'Pending', value: allOrders.filter(o => o.deliveryStatus === 'Pending').length, color: 'bg-yellow-500' },
          { label: 'Cancelled', value: allOrders.filter(o => o.deliveryStatus === 'Cancelled').length, color: 'bg-red-500' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700">
            <div className={`w-2 h-8 ${s.color} rounded-full mb-3`} />
            <p className="text-2xl font-bold text-slate-700 dark:text-white">{s.value}</p>
            <p className="text-sm text-slate-400 mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <Card>
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100 dark:border-slate-700">
          <SearchInput value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Order ID or customer..." className="w-full sm:w-64" />
          <select value={filterPayment} onChange={e => { setFilterPayment(e.target.value); setPage(1); }} className="text-sm border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Payment Status</option>
            {['Paid', 'Pending', 'Failed', 'Refunded'].map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={filterDelivery} onChange={e => { setFilterDelivery(e.target.value); setPage(1); }} className="text-sm border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Delivery Status</option>
            {['Delivered', 'Shipped', 'Processing', 'Cancelled', 'Pending'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr className="text-xs text-slate-500 dark:text-slate-400 uppercase">
                <th className="text-left px-4 py-3 font-semibold">Order ID</th>
                <th className="text-left px-4 py-3 font-semibold">Customer</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Items</th>
                <th className="text-left px-4 py-3 font-semibold">Amount</th>
                <th className="text-left px-4 py-3 font-semibold">Payment</th>
                <th className="text-left px-4 py-3 font-semibold">Delivery</th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Date</th>
                <th className="text-left px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
              {paginated.map((order, i) => (
                <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-blue-600 font-semibold">{order.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <img src={order.customer.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <p className="text-slate-700 dark:text-slate-200 font-medium text-xs">{order.customer.name}</p>
                        <p className="text-slate-400 text-xs">{order.customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-slate-500 text-xs">{order.items.length} item(s)</td>
                  <td className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-200">{formatCurrency(order.total)}</td>
                  <td className="px-4 py-3"><Badge status={order.paymentStatus} /></td>
                  <td className="px-4 py-3"><Badge status={order.deliveryStatus} /></td>
                  <td className="px-4 py-3 hidden lg:table-cell text-xs text-slate-400">{formatDateTime(order.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setSelectedOrder(order)} className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-slate-400 hover:text-blue-600 transition" title="View">
                        <Eye size={14} />
                      </button>
                      <button onClick={() => toast.success('Invoice generated')} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-slate-600 transition" title="Print">
                        <Printer size={14} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} total={filtered.length} perPage={PER_PAGE} onPageChange={setPage} />
      </Card>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white dark:bg-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl z-10">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-700">
              <div>
                <h2 className="font-bold text-slate-800 dark:text-white">Order {selectedOrder.id}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{formatDateTime(selectedOrder.createdAt)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge status={selectedOrder.deliveryStatus} />
                <button onClick={() => setSelectedOrder(null)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500">✕</button>
              </div>
            </div>
            <div className="p-5 space-y-5">
              {/* Customer */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <img src={selectedOrder.customer.avatar} alt="" className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-200">{selectedOrder.customer.name}</p>
                  <p className="text-xs text-slate-400">{selectedOrder.customer.email} · {selectedOrder.customer.phone}</p>
                </div>
              </div>
              {/* Items */}
              <div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-3">Order Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 border border-slate-100 dark:border-slate-700 rounded-xl">
                      <img src={item.thumbnail} alt="" className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.name}</p>
                        <p className="text-xs text-slate-400">Qty: {item.qty} × {formatCurrency(item.price)}</p>
                      </div>
                      <p className="font-semibold text-slate-700 dark:text-slate-200">{formatCurrency(item.total)}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Totals */}
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 space-y-2 text-sm">
                {[
                  ['Subtotal', selectedOrder.subtotal],
                  ['Shipping', selectedOrder.shipping],
                  ['Tax (18% GST)', selectedOrder.tax],
                  ...(selectedOrder.discount ? [['Discount', -selectedOrder.discount]] : []),
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>{l}</span>
                    <span className={v < 0 ? 'text-emerald-600' : ''}>{v < 0 ? '-' : ''}{formatCurrency(Math.abs(v))}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-slate-800 dark:text-white border-t border-slate-200 dark:border-slate-600 pt-2">
                  <span>Total</span>
                  <span>{formatCurrency(selectedOrder.total)}</span>
                </div>
              </div>
              {/* Timeline */}
              <div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-3">Order Timeline</h4>
                <div className="space-y-3">
                  {selectedOrder.timeline.map((t, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${t.done ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>
                        {t.done ? '✓' : i + 1}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${t.done ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400'}`}>{t.status}</p>
                        {t.done && <p className="text-xs text-slate-400">{formatDateTime(t.time)}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" icon={<Printer size={14} />} onClick={() => toast.success('Printing invoice...')}>Print Invoice</Button>
                <Button variant="danger" className="flex-1" icon={<RefreshCw size={14} />} onClick={() => toast.success('Refund initiated')}>Refund</Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
