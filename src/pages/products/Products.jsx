import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Copy, Download, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import PageHeader from '../../components/ui/PageHeader';
import SearchInput from '../../components/ui/SearchInput';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Pagination from '../../components/ui/Pagination';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { products as allProducts } from '../../dummy-data/index';
import { formatCurrency, paginate } from '../../utils/helpers';

const PER_PAGE = 10;
const selectClass = "text-[12.5px] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 cursor-pointer transition";

export default function Products() {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [products, setProducts] = useState(allProducts);

  const categories = [...new Set(allProducts.map(p => p.category))];

  const filtered = useMemo(() => products.filter(p => {
    const s = search.toLowerCase();
    return (!search || p.name.toLowerCase().includes(s) || p.sku.toLowerCase().includes(s))
      && (!filterCat || p.category === filterCat)
      && (!filterStatus || p.status === filterStatus);
  }), [products, search, filterCat, filterStatus]);

  const paginated = paginate(filtered, page, PER_PAGE);
  const allSelected = paginated.length > 0 && paginated.every(p => selected.includes(p.id));

  const toggleSelect = id => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const toggleAll = () => setSelected(allSelected ? s => s.filter(id => !paginated.find(p => p.id === id)) : [...new Set([...selected, ...paginated.map(p => p.id)])]);

  const handleDelete = id => { setProducts(p => p.filter(x => x.id !== id)); toast.success('Product deleted'); setDeleteId(null); };
  const handleBulkDelete = () => { setProducts(p => p.filter(x => !selected.includes(x.id))); toast.success(`${selected.length} products deleted`); setSelected([]); };

  return (
    <div>
      <PageHeader
        title="Products"
        subtitle={`${filtered.length} products`}
        breadcrumbs={[{ label: 'Products' }]}
        actions={
          <div className="flex items-center gap-2">
            {selected.length > 0 && (
              <Button variant="danger" size="sm" icon={<Trash2 size={13} />} onClick={handleBulkDelete}>
                Delete {selected.length}
              </Button>
            )}
            <Button variant="outline" size="sm" icon={<Download size={13} />}>Export</Button>
            <Link to="/products/add">
              <Button size="sm" icon={<Plus size={13} />}>Add Product</Button>
            </Link>
          </div>
        }
      />

      <Card>
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100 dark:border-slate-800">
          <SearchInput value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search name or SKU…" className="w-full sm:w-60" />
          <select value={filterCat} onChange={e => { setFilterCat(e.target.value); setPage(1); }} className={selectClass}>
            <option value="">All Categories</option>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1); }} className={selectClass}>
            <option value="">All Status</option>
            {['Published', 'Draft', 'Archived'].map(s => <option key={s}>{s}</option>)}
          </select>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-[12px] text-slate-400">{filtered.length} results</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30">
                <th className="w-10 pl-5 py-3">
                  <input type="checkbox" checked={allSelected} onChange={toggleAll}
                    className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 accent-blue-600 cursor-pointer" />
                </th>
                {['Product', 'SKU', 'Category', 'Price', 'Stock', 'Status', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60">
              {paginated.map((product, i) => (
                <motion.tr key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="table-row group"
                >
                  <td className="pl-5 py-3">
                    <input type="checkbox" checked={selected.includes(product.id)} onChange={() => toggleSelect(product.id)}
                      className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 accent-blue-600 cursor-pointer" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 shrink-0 bg-slate-50 dark:bg-slate-800">
                        <img src={product.thumbnail} alt="" className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-slate-700 dark:text-slate-200 truncate max-w-[180px] leading-tight">{product.name}</p>
                        <p className="text-[11.5px] text-slate-400">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-[12px] font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded">{product.sku}</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-[12px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-lg">{product.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-[13px] font-bold text-slate-700 dark:text-slate-200">{formatCurrency(product.sellingPrice)}</p>
                    <p className="text-[11px] text-slate-400 line-through">{formatCurrency(product.mrp)}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${product.stock === 0 ? 'bg-red-500' : product.stock <= product.minStock ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                      <span className={`text-[12.5px] font-medium ${product.stock === 0 ? 'text-red-500' : product.stock <= product.minStock ? 'text-amber-500' : 'text-emerald-600 dark:text-emerald-400'}`}>
                        {product.stock === 0 ? 'Out of stock' : `${product.stock}`}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge status={product.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-400 hover:text-blue-600 transition" title="View">
                        <Eye size={14} />
                      </button>
                      <Link to={`/products/edit/${product.id}`} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition" title="Edit">
                        <Edit size={14} />
                      </Link>
                      <button onClick={() => toast.success('Duplicated')} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 transition" title="Duplicate">
                        <Copy size={14} />
                      </button>
                      <button onClick={() => setDeleteId(product.id)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition" title="Delete">
                        <Trash2 size={14} />
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

      <ConfirmDialog
        open={!!deleteId}
        title="Delete this product?"
        message="This will permanently remove the product and all associated data. This action cannot be undone."
        onConfirm={() => handleDelete(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
