import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Eye, Wrench, Phone, MessageCircle, Plus, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/ui/PageHeader';
import SearchInput from '../../components/ui/SearchInput';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Pagination from '../../components/ui/Pagination';
import StatCard from '../../components/ui/StatCard';
import { repairs as allRepairs } from '../../dummy-data/index';
import { formatCurrency, formatDate, timeAgo, paginate } from '../../utils/helpers';

const PER_PAGE = 8;

export default function Repairs() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [page, setPage] = useState(1);
  const [selectedRepair, setSelectedRepair] = useState(null);

  const filtered = useMemo(() =>
    allRepairs.filter(r => {
      const s = search.toLowerCase();
      const match = !search || r.id.toLowerCase().includes(s) || r.customer.name.toLowerCase().includes(s) || r.issue.toLowerCase().includes(s);
      const matchStatus = !filterStatus || r.status === filterStatus;
      const matchPriority = !filterPriority || r.priority === filterPriority;
      return match && matchStatus && matchPriority;
    }), [search, filterStatus, filterPriority]);

  const paginated = paginate(filtered, page, PER_PAGE);

  const priorityColor = { Low: 'bg-gray-100 text-gray-600', Medium: 'bg-blue-100 text-blue-600', High: 'bg-orange-100 text-orange-600', Urgent: 'bg-red-100 text-red-600' };

  const stats = [
    { title: 'Total Requests', value: allRepairs.length, icon: '🔧', gradient: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white', change: 10 },
    { title: 'In Progress', value: allRepairs.filter(r => r.status === 'In Progress').length, icon: '⚙️', gradient: 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white', change: 5 },
    { title: 'Completed', value: allRepairs.filter(r => r.status === 'Completed').length, icon: '✅', gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white', change: 8 },
    { title: 'Pending', value: allRepairs.filter(r => r.status === 'Pending').length, icon: '⏳', gradient: 'bg-gradient-to-br from-red-500 to-red-600 text-white', change: -3 },
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Repair Management"
        subtitle="Track and manage all repair requests"
        breadcrumbs={[{ label: 'Repairs' }]}
        actions={<Button size="sm" icon={<Plus size={14} />} onClick={() => toast.success('New repair form opened')}>New Repair</Button>}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => <StatCard key={s.title} {...s} index={i} />)}
      </div>

      <Card>
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-gray-100 dark:border-slate-800">
          <SearchInput value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search repairs..." className="w-full sm:w-64" />
          <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
            className="text-[12.5px] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 text-gray-600 dark:text-slate-300 outline-none focus:border-blue-400 cursor-pointer transition-all">
            <option value="">All Status</option>
            {['Pending', 'In Progress', 'Completed', 'Cancelled', 'Rejected', 'Waiting for Parts', 'Approval Required'].map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={filterPriority} onChange={e => { setFilterPriority(e.target.value); setPage(1); }}
            className="text-[12.5px] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 text-gray-600 dark:text-slate-300 outline-none focus:border-blue-400 cursor-pointer transition-all">
            <option value="">All Priority</option>
            {['Low', 'Medium', 'High', 'Urgent'].map(p => <option key={p}>{p}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-slate-800/50">
              <tr className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                <th className="text-left px-4 py-3">Repair ID</th>
                <th className="text-left px-4 py-3">Customer</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Device</th>
                <th className="text-left px-4 py-3">Issue</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Engineer</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Cost</th>
                <th className="text-left px-4 py-3">Priority</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800/60">
              {paginated.map((repair, i) => (
                <motion.tr key={repair.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="hover:bg-gray-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-blue-600 font-semibold">{repair.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <img src={repair.customer.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <p className="text-[13px] font-medium text-gray-700 dark:text-slate-200">{repair.customer.name}</p>
                        <p className="text-[12px] text-gray-500 dark:text-slate-400">{timeAgo(repair.createdAt)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="text-[13px] font-medium text-gray-700 dark:text-slate-200">{repair.deviceBrand} {repair.deviceType}</p>
                    <p className="text-[12px] text-gray-500 dark:text-slate-400">{repair.deviceModel}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-[12px] text-gray-500 dark:text-slate-400 max-w-[140px] truncate">{repair.issue}</p>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-[12px] text-gray-500 dark:text-slate-400">{repair.engineer}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="text-[13px] font-semibold text-gray-700 dark:text-slate-200">{formatCurrency(repair.estimatedCost)}</p>
                    <p className="text-[12px] text-gray-500 dark:text-slate-400">{repair.paymentStatus}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityColor[repair.priority]}`}>{repair.priority}</span>
                  </td>
                  <td className="px-4 py-3"><Badge status={repair.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setSelectedRepair(repair)} className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-gray-400 hover:text-blue-600 transition" title="View Details">
                        <Eye size={14} />
                      </button>
                      <button onClick={() => toast.success(`Calling ${repair.customer.phone}`)} className="p-1.5 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg text-gray-400 hover:text-emerald-600 transition" title="Call Customer">
                        <Phone size={14} />
                      </button>
                      <button onClick={() => toast.success('Opening chat...')} className="p-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg text-gray-400 hover:text-indigo-600 transition" title="Message">
                        <MessageCircle size={14} />
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

      {/* Repair Detail Modal */}
      {selectedRepair && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedRepair(null)} />
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[88vh] overflow-y-auto shadow-2xl z-10">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-slate-800">
              <div>
                <h2 className="font-bold text-gray-800 dark:text-white">Repair {selectedRepair.id}</h2>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Created {timeAgo(selectedRepair.createdAt)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge status={selectedRepair.status} />
                <button onClick={() => setSelectedRepair(null)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-gray-500 text-lg">✕</button>
              </div>
            </div>
            <div className="p-5 space-y-5">
              {/* Customer */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
                <img src={selectedRepair.customer.avatar} alt="" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-700 dark:text-slate-200">{selectedRepair.customer.name}</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400">{selectedRepair.customer.email}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toast.success('Calling...')} className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl hover:bg-emerald-200 transition"><Phone size={16} /></button>
                  <button onClick={() => toast.success('Opening chat...')} className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl hover:bg-blue-200 transition"><MessageCircle size={16} /></button>
                </div>
              </div>

              {/* Device Info */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  ['Device Type', selectedRepair.deviceType],
                  ['Brand', selectedRepair.deviceBrand],
                  ['Model', selectedRepair.deviceModel],
                  ['Serial No.', selectedRepair.serialNumber],
                  ['Assigned Engineer', selectedRepair.engineer],
                  ['Pickup Type', selectedRepair.pickupType],
                  ['Estimated Cost', formatCurrency(selectedRepair.estimatedCost)],
                  ['Payment', selectedRepair.paymentStatus],
                ].map(([label, val]) => (
                  <div key={label} className="p-3 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
                    <p className="text-xs text-gray-500 dark:text-slate-400 mb-0.5">{label}</p>
                    <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">{val}</p>
                  </div>
                ))}
              </div>

              {/* Issue */}
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800">
                <p className="text-xs text-orange-600 font-medium mb-1">Issue Reported</p>
                <p className="text-sm text-gray-700 dark:text-slate-300">{selectedRepair.issue}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{selectedRepair.description}</p>
              </div>

              {/* Before Images */}
              {selectedRepair.beforeImages.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-slate-200 mb-2">Before Repair Images</p>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedRepair.beforeImages.map((img, i) => (
                      <img key={i} src={img} alt="" className="w-full aspect-square object-cover rounded-xl" />
                    ))}
                  </div>
                </div>
              )}

              {/* Pending Parts */}
              {selectedRepair.pendingParts.length > 0 && (
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-100 dark:border-yellow-800">
                  <p className="text-xs text-yellow-600 font-medium mb-2 flex items-center gap-1"><AlertCircle size={12} /> Pending Parts</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedRepair.pendingParts.map(part => (
                      <span key={part} className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 px-2 py-1 rounded-lg">{part}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-slate-200 mb-3">Repair Timeline</p>
                <div className="relative pl-6 space-y-4 border-l-2 border-gray-200 dark:border-slate-700">
                  {selectedRepair.timeline.map((t, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-blue-600 border-2 border-white dark:border-slate-900" />
                      <p className="text-sm font-medium text-gray-700 dark:text-slate-200">{t.event}</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">{formatDate(t.time)} · by {t.by}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <select className="text-[12.5px] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 text-gray-600 dark:text-slate-300 outline-none col-span-2">
                  <option>Update Status</option>
                  {['Pending', 'In Progress', 'Completed', 'Cancelled', 'Waiting for Parts'].map(s => <option key={s}>{s}</option>)}
                </select>
                <Button variant="outline" className="w-full" onClick={() => { toast.success('Invoice generated'); setSelectedRepair(null); }}>Generate Invoice</Button>
                <Button className="w-full" onClick={() => { toast.success('Status updated'); setSelectedRepair(null); }}>Update Status</Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
