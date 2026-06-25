import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, Trash2, Eye, Grid, List } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { gallery as allGallery } from '../../dummy-data/index';

export default function Gallery() {
  const [images, setImages] = useState(allGallery);
  const [view, setView] = useState('grid');
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(files => {
    const newImages = files.map((f, i) => ({
      id: `GAL-NEW-${Date.now() + i}`,
      title: f.name,
      url: URL.createObjectURL(f),
      thumbnail: URL.createObjectURL(f),
      type: 'Upload',
      createdAt: new Date().toISOString(),
    }));
    setImages(prev => [...newImages, ...prev]);
    toast.success(`${files.length} image(s) uploaded`);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] }, multiple: true });

  return (
    <div className="space-y-5">
      <PageHeader title="Gallery" subtitle={`${images.length} images`} breadcrumbs={[{ label: 'Gallery' }]}
        actions={
          <div className="flex items-center gap-2">
            <div className="flex bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <button onClick={() => setView('grid')} className={`p-2 transition ${view === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}><Grid size={16} /></button>
              <button onClick={() => setView('list')} className={`p-2 transition ${view === 'list' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}><List size={16} /></button>
            </div>
          </div>
        }
      />

      {/* Dropzone */}
      <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-600 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}>
        <input {...getInputProps()} />
        <Upload size={32} className="mx-auto text-slate-400 mb-3" />
        <p className="font-medium text-slate-600 dark:text-slate-300">Drop images here or click to upload</p>
        <p className="text-sm text-slate-400 mt-1">PNG, JPG, WEBP, GIF supported</p>
      </div>

      {/* Gallery Grid */}
      {view === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
          {images.map((img, i) => (
            <motion.div key={img.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.02 }}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-700">
              <img src={img.thumbnail} alt={img.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => setPreview(img)} className="p-2 bg-white/20 backdrop-blur rounded-xl hover:bg-white/30 transition"><Eye size={16} className="text-white" /></button>
                <button onClick={() => { setImages(imgs => imgs.filter(x => x.id !== img.id)); toast.success('Image deleted'); }} className="p-2 bg-white/20 backdrop-blur rounded-xl hover:bg-red-500/80 transition"><Trash2 size={16} className="text-white" /></button>
              </div>
              <div className="absolute bottom-1 left-1 right-1">
                <span className="text-xs bg-black/40 text-white px-1.5 py-0.5 rounded-md backdrop-blur truncate block">{img.type}</span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card>
          <div className="divide-y divide-slate-50 dark:divide-slate-700">
            {images.map((img, i) => (
              <motion.div key={img.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                className="flex items-center gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                <img src={img.thumbnail} alt={img.title} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-700 dark:text-slate-200 text-sm truncate">{img.title}</p>
                  <p className="text-xs text-slate-400">{img.type}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setPreview(img)} className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-slate-400 hover:text-blue-600 transition"><Eye size={14} /></button>
                  <button onClick={() => { setImages(imgs => imgs.filter(x => x.id !== img.id)); toast.success('Image deleted'); }} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-400 hover:text-red-500 transition"><Trash2 size={14} /></button>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      )}

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setPreview(null)}>
          <motion.img initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} src={preview.url} alt={preview.title} className="max-w-full max-h-full rounded-2xl shadow-2xl" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
