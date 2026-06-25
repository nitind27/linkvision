import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Eye, Ban, Mail, Phone, Star, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/ui/PageHeader';
import SearchInput from '../../components/ui/SearchInput';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Pagination from '../../components/ui/Pagination';
import { customers as allCustomers } from '../../dummy-data/index';
import { formatCurrency, formatDate, paginate, timeAgo } from '../../utils/helpers';

const PER_PAGE = 10;

export default function Customers() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filtered = useMemo(() =>
    allCustomers.filter(c => {
      const s = search.toLowerCase();
      const match = !search || c.name.toLowerCase().includes(s) || c.email.toLowerCase().includes(s) || c.phone.includes(s);
      const matchStatus = !filterStatus || c.status === filterStatus;
      return match && matchStatus;
    }), [search, filterStatus]);

  const paginated = paginate(filtered, page, PER_PAGE);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Customers"
        subtitle={`${allCustomers.length} total customers`}
        breadcrumbs={[{ label: 'Customers' }]}
      />

      <Card>
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100 dark:border-slate-700">
          <SearchInput value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search customers..." className="w-full sm:w-64" />
          <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1); }} className="text-sm border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Status</option>
            {['Active', 'Blocked', 'Inactive'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr className="text-xs text-slate-500 dark:text-slate-400 uppercase">
                <th className="text-left px-4 py-3 font-semibold">Customer</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Contact</th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Location</th>
                <th className="text-left px-4 py-3 font-semibold">Orders</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Spent</th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Joined</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="text-left px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
              {paginated.map((c, i) => (
                <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full object-cover" />
                        {c.verified && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-blue-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>}
                      </div>
                      <div>
                        <p className="font-medium text-slate-700 dark:text-slate-200">{c.name}</p>
                        <p className="text-xs text-slate-400">{c.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="text-xs text-slate-600 dark:text-slate-400">{c.email}</p>
                    <p className="text-xs text-slate-400">{c.phone}</p>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-xs text-slate-500">{c.city}, {c.state}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <ShoppingCart size={12} className="text-slate-400" />
                      <span className="font-medium text-slate-700 dark:text-slate-300">{c.orders}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell font-semibold text-slate-700 dark:text-slate-300 text-xs">{formatCurrency(c.totalSpent)}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-xs text-slate-400">{formatDate(c.joinDate)}</td>
                  <td className="px-4 py-3"><Badge status={c.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setSelectedCustomer(c)} className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-slate-400 hover:text-blue-600 transition"><Eye size={14} /></button>
                      <button onClick={() => toast.success(`Email sent to ${c.email}`)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-slate-600 transition"><Mail size={14} /></button>
                      <button onClick={() => toast.error('Customer blocked')} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-400 hover:text-red-500 transition"><Ban size={14} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} total={filtered.length} perPage={PER_PAGE} onPageChange={setPage} />
      </Card>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedCustomer(null)} />
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl z-10">
            <div className="p-5 text-center border-b border-slate-100 dark:border-slate-700">
              <img src={selectedCustomer.avatar} alt="" className="w-16 h-16 rounded-full mx-auto mb-3 object-cover border-4 border-white dark:border-slate-700 shadow" />
              <h2 className="font-bold text-slate-800 dark:text-white text-lg">{selectedCustomer.name}</h2>
              <p className="text-sm text-slate-400">{selectedCustomer.email}</p>
              <div className="flex justify-center gap-2 mt-3">
                <Badge status={selectedCustomer.status} />
                {selectedCustomer.verified && <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">Verified</span>}
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  ['Total Orders', selectedCustomer.orders],
                  ['Total Spent', formatCurrency(selectedCustomer.totalSpent)],
                  ['Wallet Balance', formatCurrency(selectedCustomer.walletBalance)],
                  ['Reward Points', selectedCustomer.rewardPoints + ' pts'],
                  ['Repair History', selectedCustomer.repairHistory + ' repairs'],
                  ['Member Since', formatDate(selectedCustomer.joinDate)],
                ].map(([label, val]) => (
                  <div key={label} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mt-0.5">{val}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <p className="text-xs text-slate-400 mb-1">Address</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{selectedCustomer.address}</p>
              </div>
              {selectedCustomer.notes && (
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-100 dark:border-yellow-800">
                  <p className="text-xs text-yellow-600 font-medium mb-1">Notes</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{selectedCustomer.notes}</p>
                </div>
              )}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => { toast.success('Email sent'); setSelectedCustomer(null); }} icon={<Mail size={14} />}>Email</Button>
                <Button className="flex-1" onClick={() => setSelectedCustomer(null)}>View Profile</Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
