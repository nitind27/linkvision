import { motion } from 'framer-motion';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import { analyticsData, products, orders, customers } from '../../dummy-data/index';
import { formatCurrency } from '../../utils/helpers';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, Legend
} from 'recharts';

const COLORS = ['#2563eb', '#7c3aed', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444'];

export default function Analytics() {
  const topProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 5);
  const totalRevenue = analyticsData.monthlySales.reduce((s, m) => s + m.revenue, 0);
  const totalOrders = analyticsData.monthlySales.reduce((s, m) => s + m.orders, 0);

  return (
    <div className="space-y-5">
      <PageHeader title="Analytics" subtitle="Business performance overview" breadcrumbs={[{ label: 'Analytics' }]} />

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Annual Revenue', value: formatCurrency(totalRevenue), change: '+18%', color: 'text-emerald-600' },
          { label: 'Total Orders', value: totalOrders, change: '+12%', color: 'text-emerald-600' },
          { label: 'Avg Order Value', value: formatCurrency(totalRevenue / totalOrders), change: '+5%', color: 'text-emerald-600' },
          { label: 'Active Customers', value: customers.filter(c => c.status === 'Active').length, change: '+22%', color: 'text-emerald-600' },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{kpi.label}</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{kpi.value}</p>
            <p className={`text-xs font-semibold mt-1 ${kpi.color}`}>{kpi.change} vs last year</p>
          </motion.div>
        ))}
      </div>

      {/* Revenue Area Chart */}
      <Card className="p-5">
        <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4">Revenue vs Orders Trend</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={analyticsData.monthlySales}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="ordGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={v => `₹${v / 1000}K`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <Tooltip formatter={(v, name) => name === 'revenue' ? formatCurrency(v) : v} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
            <Legend />
            <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#2563eb" fill="url(#revGrad)" strokeWidth={2.5} dot={false} />
            <Area yAxisId="right" type="monotone" dataKey="orders" stroke="#7c3aed" fill="url(#ordGrad)" strokeWidth={2.5} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Category Revenue Pie */}
        <Card className="p-5">
          <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4">Revenue by Category</h3>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={analyticsData.categoryRevenue} cx="50%" cy="50%" outerRadius={90} paddingAngle={3} dataKey="value">
                  {analyticsData.categoryRevenue.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={v => formatCurrency(v)} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 w-full md:w-auto">
              {analyticsData.categoryRevenue.map((c, i) => (
                <div key={c.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ background: COLORS[i] }} />
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="text-slate-600 dark:text-slate-400">{c.name}</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">{Math.round(c.value / 10000)}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
                      <div className="h-full rounded-full" style={{ width: `${(c.value / analyticsData.categoryRevenue[0].value) * 100}%`, background: COLORS[i] }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Top Products */}
        <Card className="p-5">
          <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4">Top Selling Products</h3>
          <div className="space-y-3">
            {topProducts.map((product, i) => (
              <div key={product.id} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <img src={product.thumbnail} alt="" className="w-8 h-8 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{product.name}</p>
                  <p className="text-xs text-slate-400">{product.sold} units sold</p>
                </div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{formatCurrency(product.sellingPrice * product.sold)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Daily Orders Bar */}
      <Card className="p-5">
        <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4">Daily Revenue — Last 30 Days</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={analyticsData.dailyOrders}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94a3b8' }} />
            <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={v => `₹${v / 1000}K`} />
            <Tooltip formatter={v => formatCurrency(v)} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
            <Bar dataKey="revenue" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
