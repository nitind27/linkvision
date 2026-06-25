import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { blogs } from '../../dummy-data/index';
import { formatDate } from '../../utils/helpers';

export default function Blog() {
  const [posts, setPosts] = useState(blogs);

  return (
    <div className="space-y-5">
      <PageHeader title="Blog" subtitle={`${posts.length} posts`} breadcrumbs={[{ label: 'Blog' }]}
        actions={<Button size="sm" icon={<Plus size={14} />} onClick={() => toast.success('Add post form')}>Add Post</Button>} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {posts.map((post, i) => (
          <motion.div key={post.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="overflow-hidden card-hover">
              <div className="h-40 overflow-hidden">
                <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-2 py-0.5 rounded-full">{post.category}</span>
                  <Badge status={post.status} />
                </div>
                <h3 className="font-semibold text-gray-700 dark:text-slate-200 mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-[12px] text-gray-500 dark:text-slate-400 mb-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-[12px] text-gray-500 dark:text-slate-400 mb-3">
                  <span>By {post.author}</span>
                  <span>{formatDate(post.createdAt)}</span>
                  <span>👁 {post.views}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="xs" className="flex-1" icon={<Edit size={12} />} onClick={() => toast.success('Edit post')}>Edit</Button>
                  <button onClick={() => setPosts(p => p.filter(x => x.id !== post.id))} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-gray-400 hover:text-red-500 transition"><Trash2 size={14} /></button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
