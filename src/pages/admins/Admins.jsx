import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { admins } from '../../dummy-data/index';
import { formatDate, timeAgo } from '../../utils/helpers';

const roleColor = {
  'Super Admin': 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
  Manager: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
  Editor: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600',
  Support: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600',
  Analyst: 'bg-slate-100 dark:bg-slate-700 text-slate-600',
};

export default function Admins() {
  return (
    <div className="space-y-5">
      <PageHeader title="Admin Users" subtitle={`${admins.length} admin users`} breadcrumbs={[{ label: 'Admins' }]}
        actions={<Button size="sm" icon={<Plus size={14} />} onClick={() => toast.success('Invite admin form')}>Invite Admin</Button>} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {admins.map((admin, i) => (
          <motion.div key={admin.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Card className="p-5 card-hover">
              <div className="flex items-start gap-3 mb-4">
                <img src={admin.avatar} alt={admin.name} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-700 dark:text-slate-200 truncate">{admin.name}</h3>
                  <p className="text-xs text-slate-400 truncate">{admin.email}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${roleColor[admin.role]}`}>{admin.role}</span>
                </div>
                <Badge status={admin.status} />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                {[
                  ['Products', admin.permissions.products],
                  ['Orders', admin.permissions.orders],
                  ['Customers', admin.permissions.customers],
                  ['Settings', admin.permissions.settings],
                ].map(([label, has]) => (
                  <div key={label} className={`flex items-center gap-1.5 p-2 rounded-lg ${has ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : 'bg-slate-50 dark:bg-slate-700/50 text-slate-400'}`}>
                    <Shield size={10} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mb-3">Last login: {timeAgo(admin.lastLogin)}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="xs" className="flex-1" icon={<Edit size={12} />} onClick={() => toast.success('Edit admin')}>Edit</Button>
                <Button variant="danger" size="xs" icon={<Trash2 size={12} />} onClick={() => toast.error('Admin removed')}>Remove</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
