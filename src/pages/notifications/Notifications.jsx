import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { notifications as allNotifications } from '../../dummy-data/index';
import { timeAgo } from '../../utils/helpers';

const typeIcon = {
  order: '🛒', repair: '🔧', inventory: '📦', customer: '👤', payment: '💳', review: '⭐', offer: '🏷️'
};
const typeColor = {
  order: 'bg-blue-100 dark:bg-blue-900/30', repair: 'bg-orange-100 dark:bg-orange-900/30',
  inventory: 'bg-yellow-100 dark:bg-yellow-900/30', customer: 'bg-purple-100 dark:bg-purple-900/30',
  payment: 'bg-emerald-100 dark:bg-emerald-900/30', review: 'bg-yellow-100 dark:bg-yellow-900/30',
  offer: 'bg-pink-100 dark:bg-pink-900/30',
};

export default function Notifications() {
  const [notifs, setNotifs] = useState(allNotifications);
  const [filter, setFilter] = useState('all');

  const filtered = notifs.filter(n => filter === 'all' || (filter === 'unread' && !n.read));

  const markAllRead = () => { setNotifs(n => n.map(x => ({ ...x, read: true }))); toast.success('All marked as read'); };
  const deleteAll = () => { setNotifs([]); toast.success('All notifications cleared'); };
  const markRead = (id) => setNotifs(n => n.map(x => x.id === id ? { ...x, read: true } : x));
  const remove = (id) => setNotifs(n => n.filter(x => x.id !== id));

  return (
    <div className="space-y-5">
      <PageHeader
        title="Notifications"
        subtitle={`${notifs.filter(n => !n.read).length} unread`}
        breadcrumbs={[{ label: 'Notifications' }]}
        actions={
          <>
            <Button variant="outline" size="sm" icon={<CheckCheck size={14} />} onClick={markAllRead}>Mark All Read</Button>
            <Button variant="danger" size="sm" icon={<Trash2 size={14} />} onClick={deleteAll}>Clear All</Button>
          </>
        }
      />

      <Card>
        <div className="flex gap-2 p-4 border-b border-gray-100 dark:border-slate-800">
          {['all', 'unread'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 text-sm rounded-xl font-medium transition ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700'}`}>
              {f === 'all' ? `All (${notifs.length})` : `Unread (${notifs.filter(n => !n.read).length})`}
            </button>
          ))}
        </div>
        <div className="divide-y divide-gray-50 dark:divide-slate-800">
          {filtered.length === 0 ? (
            <div className="py-12 text-center">
              <Bell size={36} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">No notifications</p>
            </div>
          ) : filtered.map((n, i) => (
            <motion.div key={n.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
              className={`flex items-start gap-3 p-4 hover:bg-gray-50 dark:hover:bg-slate-800/40 transition cursor-pointer ${!n.read ? 'bg-blue-50/30 dark:bg-blue-900/5' : ''}`}
              onClick={() => markRead(n.id)}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${typeColor[n.type]}`}>
                {typeIcon[n.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-700 dark:text-slate-200 text-sm">{n.title}</p>
                  {!n.read && <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0 pulse-dot" />}
                </div>
                <p className="text-[13px] text-gray-500 dark:text-slate-400 mt-0.5">{n.message}</p>
                <p className="text-[12px] text-gray-400 dark:text-slate-500 mt-1">{timeAgo(n.createdAt)}</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); remove(n.id); }} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-gray-400 hover:text-red-500 transition shrink-0">
                <Trash2 size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
