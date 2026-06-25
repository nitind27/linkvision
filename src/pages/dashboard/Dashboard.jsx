import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, ShoppingCart, Users, Package, Wrench, AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { SkeletonCard } from '../../components/ui/Skeleton';
import { orders, repairs, customers, products, analyticsData } from '../../dummy-data/index';
import { formatCurrency, timeAgo } from '../../utils/helpers';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const PIE_COLORS = ['#2563eb', '#7c3aed', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 shadow-xl text-xs">
      <p className="text-slate-500 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} className="font-bold" style={{ color: p.color }}>
          {p.name === 'revenue' ? formatCurrency(p.value) : p.value}
        </p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 700); return () => clearTimeout(t); }, []);

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const todaySales = orders.slice(0, 5).reduce((s, o) => s + o.total, 0);
  const pendingOrders = orders.filter(o => o.deliveryStatus === 'Pending').length;
  const deliveredOrders = orders.filter(o => o.deliveryStatus === 'Delivered').length;
  const cancelledOrders = orders.filter(o => o.deliveryStatus === 'Cancelled').length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= p.minStock).length;
  const outOfStock = products.filter(p => p.stock === 0).length;

  const stats = [
    { title: 'Total Revenue', value: Math.floor(totalRevenue / 1000), prefix: '₹', suffix: 'K', icon: '💰', color: 'blue', change: 12 },
    { title: "Today's Sales", value: Math.floor(todaySales / 1000), prefix: '₹', suffix: 'K', icon: '📈', color: 'emerald', change: 8 },
    { title: 'Total Orders', value: orders.length, icon: '🛒', color: 'purple', change: 5 },
    { title: 'Customers', value: customers.length, icon: '👥', color: 'cyan', change: 15 },
    { title: 'Total Products', value: products.length, icon: '📦', color: 'orange', change: 3 },
    { title: 'Pending Orders', value: pendingOrders, icon: '⏳', color: 'yellow', change: -2 },
    { title: 'Repair Requests', value: repairs.length, icon: '🔧', color: 'pink', change: 10 },
    { title: 'Stock Alerts', value: lowStock + outOfStock, icon: '⚠️', color: 'red', change: -5 },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-slate-800 dark:text-white tracking-tight">Good morning, Admin 👋</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Here's what's happening at Link Vision today.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm">
          <span className="status-dot dot-green badge-live" />
          <span className="text-slate-600 dark:text-slate-300 font-medium text-[13px]">Live · All systems normal</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : stats.map((s, i) => <StatCard key={s.title} {...s} index={i} />)
        }
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Revenue Area Chart */}
        <Card className="xl:col-span-2 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-[15px]">Revenue Overview</h3>
              <p className="text-[12px] text-slate-400 mt-0.5">Monthly revenue for 2024</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-[12px] text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full">
                <TrendingUp size={11} /> +18.4%
              </span>
              <select className="text-[12px] border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 outline-none">
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={analyticsData.monthlySales} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}K`} width={48} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2.5} fill="url(#revGrad)" dot={false} activeDot={{ r: 5, fill: '#2563eb', stroke: '#fff', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Donut */}
        <Card className="p-5">
          <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-[15px] mb-4">Revenue Split</h3>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={analyticsData.categoryRevenue} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={3} dataKey="value" startAngle={90} endAngle={-270}>
                  {analyticsData.categoryRevenue.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} strokeWidth={0} />)}
                </Pie>
                <Tooltip formatter={v => formatCurrency(v)} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {analyticsData.categoryRevenue.slice(0, 5).map((c, i) => (
              <div key={c.name} className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: PIE_COLORS[i] }} />
                <span className="text-[12px] text-slate-500 dark:text-slate-400 flex-1 truncate">{c.name}</span>
                <span className="text-[12px] font-semibold text-slate-700 dark:text-slate-300">
                  {Math.round((c.value / analyticsData.categoryRevenue.reduce((s, x) => s + x.value, 0)) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Daily Orders Bar + Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Orders Bar */}
        <Card className="xl:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-[15px]">Daily Orders</h3>
              <p className="text-[12px] text-slate-400 mt-0.5">Last 30 days</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={analyticsData.dailyOrders} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} interval={4} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={24} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="orders" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Order Status */}
        <Card className="p-5">
          <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-[15px] mb-4">Order Status</h3>
          <div className="space-y-3">
            {[
              { label: 'Delivered', count: deliveredOrders, total: orders.length, color: 'bg-emerald-500', light: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600', icon: <CheckCircle size={13} className="text-emerald-500" /> },
              { label: 'Processing', count: orders.filter(o => o.deliveryStatus === 'Shipped').length, total: orders.length, color: 'bg-blue-500', light: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600', icon: <Clock size={13} className="text-blue-500" /> },
              { label: 'Pending', count: pendingOrders, total: orders.length, color: 'bg-amber-500', light: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600', icon: <Clock size={13} className="text-amber-500" /> },
              { label: 'Cancelled', count: cancelledOrders, total: orders.length, color: 'bg-red-500', light: 'bg-red-100 dark:bg-red-900/30 text-red-600', icon: <XCircle size={13} className="text-red-500" /> },
            ].map(s => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    {s.icon}
                    <span className="text-[13px] text-slate-600 dark:text-slate-400">{s.label}</span>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${s.light}`}>{s.count}</span>
                </div>
                <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(s.count / s.total) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    className={`h-full ${s.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] text-slate-400">Inventory Alert</p>
                <div className="flex items-center gap-2 mt-1">
                  <AlertTriangle size={13} className="text-amber-500" />
                  <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-200">{lowStock + outOfStock} items</span>
                  <span className="text-[11px] text-slate-400">need attention</span>
                </div>
              </div>
              <Link to="/inventory/low-stock" className="text-[12px] text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
                View <ArrowRight size={11} />
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Latest Orders + Repairs */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Latest Orders Table */}
        <Card className="xl:col-span-2">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-[15px]">Latest Orders</h3>
              <p className="text-[12px] text-slate-400 mt-0.5">Most recent transactions</p>
            </div>
            <Link to="/orders" className="text-[12.5px] text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Order', 'Customer', 'Amount', 'Status', 'Time'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 7).map((order, i) => (
                  <motion.tr key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="table-row border-b border-slate-50 dark:border-slate-800/60 last:border-0"
                  >
                    <td className="px-5 py-3">
                      <span className="text-[12px] font-mono font-semibold text-blue-600 dark:text-blue-400">{order.id}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <img src={order.customer.avatar} alt="" className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700" />
                        <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300 truncate max-w-[110px]">{order.customer.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-[13px] font-bold text-slate-700 dark:text-slate-200">{formatCurrency(order.total)}</span>
                    </td>
                    <td className="px-5 py-3">
                      <Badge status={order.deliveryStatus} />
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-[12px] text-slate-400">{timeAgo(order.createdAt)}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Repairs */}
        <Card className="flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-[15px]">Recent Repairs</h3>
              <p className="text-[12px] text-slate-400 mt-0.5">{repairs.filter(r => r.status === 'In Progress').length} in progress</p>
            </div>
            <Link to="/repairs" className="text-[12.5px] text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="flex-1 divide-y divide-slate-50 dark:divide-slate-800/60">
            {repairs.slice(0, 6).map((r, i) => (
              <motion.div key={r.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition cursor-pointer"
              >
                <div className="relative shrink-0">
                  <img src={r.customer.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800
                    ${r.status === 'Completed' ? 'bg-emerald-500' : r.status === 'In Progress' ? 'bg-blue-500' : 'bg-amber-500'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-slate-700 dark:text-slate-200 truncate">{r.customer.name}</p>
                  <p className="text-[11.5px] text-slate-400 truncate">{r.issue}</p>
                </div>
                <div className="text-right shrink-0">
                  <Badge status={r.status} />
                  <p className="text-[11px] text-slate-400 mt-0.5">{formatCurrency(r.estimatedCost)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
