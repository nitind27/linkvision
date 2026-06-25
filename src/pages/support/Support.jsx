import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { supportTickets } from '../../dummy-data/index';
import { timeAgo } from '../../utils/helpers';

const priorityColor = { Low: 'bg-slate-100 text-slate-600', Medium: 'bg-blue-100 text-blue-600', High: 'bg-orange-100 text-orange-600', Urgent: 'bg-red-100 text-red-600' };

export default function Support() {
  const [selected, setSelected] = useState(supportTickets[0]);
  const [reply, setReply] = useState('');

  const sendReply = () => {
    if (!reply.trim()) return;
    toast.success('Reply sent!');
    setReply('');
  };

  return (
    <div className="space-y-5">
      <PageHeader title="Support Tickets" subtitle={`${supportTickets.filter(t => t.status === 'Open').length} open tickets`} breadcrumbs={[{ label: 'Support' }]} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 h-[600px]">
        {/* Ticket List */}
        <Card className="overflow-y-auto">
          <div className="p-3 border-b border-slate-100 dark:border-slate-700">
            <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-sm">All Tickets</h3>
          </div>
          <div className="divide-y divide-slate-50 dark:divide-slate-700">
            {supportTickets.map((ticket, i) => (
              <motion.div key={ticket.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(ticket)}
                className={`p-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition ${selected?.id === ticket.id ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}>
                <div className="flex items-center gap-2 mb-1">
                  <img src={ticket.customer.avatar} alt="" className="w-7 h-7 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">{ticket.customer.name}</p>
                  </div>
                  <Badge status={ticket.status} />
                </div>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate mb-1">{ticket.subject}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${priorityColor[ticket.priority]}`}>{ticket.priority}</span>
                  <span className="text-xs text-slate-400">{timeAgo(ticket.createdAt)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Chat Window */}
        {selected && (
          <Card className="lg:col-span-2 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
              <img src={selected.customer.avatar} alt="" className="w-9 h-9 rounded-full" />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-sm">{selected.subject}</h3>
                <p className="text-xs text-slate-400">{selected.customer.name} · {selected.customer.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColor[selected.priority]}`}>{selected.priority}</span>
                <Badge status={selected.status} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {selected.messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'admin' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${msg.from === 'admin' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-bl-sm'}`}>
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.from === 'admin' ? 'text-blue-200' : 'text-slate-400'}`}>{timeAgo(msg.time)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-slate-700">
              <div className="flex gap-3">
                <input value={reply} onChange={e => setReply(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendReply()}
                  placeholder="Type your reply..."
                  className="flex-1 px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-200 placeholder:text-slate-400" />
                <Button onClick={sendReply} icon={<Send size={14} />}>Send</Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
