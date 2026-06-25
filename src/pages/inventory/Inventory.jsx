import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, Plus, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/ui/PageHeader';
import SearchInput from '../../components/ui/SearchInput';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Pagination from '../../components/ui/Pagination';
import StatCard from '../../components/ui/StatCard';
import { products } from '../../dummy-data/index';
import { formatCurrency, paginate } from '../../utils/helpers';

const PER_PAGE = 12;

export default function Inventory({ lowStockOnly = false }) {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [page, setPage] = useState(1);

  const categories = [...new Set(products.map(p => p.category))];

  const filtered = useMemo(() => {
    let list = lowStockOnly ? products.filter(p => p.stock <= p.minStock) : products;
    return list.filter(p => {
      const match = !search || p.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = !filterCat || p.category === filterCat;
      return match && matchCat;
    });
  }, [search, filterCat, lowStockOnly]);

  const paginated = paginate(filtered, page, PER_PAGE);

  const outOfStock = products.filter(p => p.stock === 0).length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= p.minStock).length;
  const healthyStock = products.filter(p => p.stock > p.minStock).length;
  const totalValue = products.reduce((s, p) => s + p.sellingPrice * p.stock, 0);

  const stats = [
    { title: 'Total Products', value: products.length, icon: '📦', gradient: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white', change: 3 },
    { title: 'Out of Stock', value: outOfStock, icon: '❌', gradient: 'bg-gradient-to-br from-red-500 to-red-600 text-white', change: -5 },
    { title: 'Low Stock', value: lowStock, icon: '⚠️', gradient: 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white', change: 2 },
    { title: 'Inventory Value', value: Math.floor(totalValue / 100000), prefix: '₹', suffix: 'L', icon: '💰', gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white', change: 7 },
  ];

  const getStockStatus = (product) => {
    if (product.stock === 0) return { label: 'Out of Stock', color: 'bg-red-100 dark:bg-red-900/30 text-red-600' };
    if (product.stock <= product.minStock) return { label: 'Low Stock', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600' };
    return { label: 'In Stock', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' };
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title={lowStockOnly ? 'Low Stock Alerts' : 'Inventory Management'}
        subtitle={`${filtered.length} products`}
        breadcrumbs={[{ label: 'Inventory', to: '/inventory' }, ...(lowStockOnly ? [{ label: 'Low Stock' }] : [])]}
        actions={
          <>
            <Button variant="outline" size="sm" icon={<Download size={14} />}>Export</Button>
            <Button size="sm" icon={<Plus size={14} />} onClick={() => toast.success('Stock adjustment form')}>Adjust Stock</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => <StatCard key={s.title} {...s} index={i} />)}
      </div>

      <Card>
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100 dark:border-slate-700">
          <SearchInput value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search products..." className="w-full sm:w-64" />
          <select value={filterCat} onChange={e => { setFilterCat(e.target.value); setPage(1); }} className="text-sm border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr className="text-xs text-slate-500 dark:text-slate-400 uppercase">
                <th className="text-left px-4 py-3 font-semibold">Product</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">SKU</th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Category</th>
                <th className="text-left px-4 py-3 font-semibold">Stock</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Min/Max</th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Value</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="text-left px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
              {paginated.map((product, i) => {
                const stockStatus = getStockStatus(product);
                const stockPercent = Math.min((product.stock / product.maxStock) * 100, 100);
                return (
                  <motion.tr key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={product.thumbnail} alt="" className="w-9 h-9 rounded-xl object-cover" />
                        <div>
                          <p className="font-medium text-slate-700 dark:text-slate-200 text-xs truncate max-w-[160px]">{product.name}</p>
                          <p className="text-xs text-slate-400">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-xs font-mono text-slate-500">{product.sku}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-xs text-slate-500">{product.category}</td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">{product.stock}</p>
                        <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full mt-1">
                          <div className={`h-full rounded-full ${stockPercent > 50 ? 'bg-emerald-500' : stockPercent > 20 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${stockPercent}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-xs text-slate-400">{product.minStock} / {product.maxStock}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-xs font-semibold text-slate-600 dark:text-slate-300">{formatCurrency(product.sellingPrice * product.stock)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stockStatus.color}`}>{stockStatus.label}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => toast.success('Stock adjustment opened')} className="text-xs text-blue-600 hover:underline font-medium">Adjust</button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination page={page} total={filtered.length} perPage={PER_PAGE} onPageChange={setPage} />
      </Card>
    </div>
  );
}
