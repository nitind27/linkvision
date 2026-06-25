import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Upload, X, Plus, Image as ImageIcon, Save, Eye } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { categories } from '../../dummy-data/index';
import { brands } from '../../dummy-data/index';

const InputField = ({ label, error, children, required }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

export default function AddProduct() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [saving, setSaving] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const onDrop = useCallback(files => {
    const newImages = files.map(f => ({ file: f, preview: URL.createObjectURL(f) }));
    setImages(prev => [...prev, ...newImages]);
    if (!thumbnail && newImages.length > 0) setThumbnail(newImages[0].preview);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] }, multiple: true });

  const onSubmit = async (data) => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1200));
    toast.success('Product created successfully!');
    navigate('/products');
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags(prev => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  };

  const inputClass = "w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 dark:text-slate-200 placeholder:text-slate-400 transition";
  const selectClass = `${inputClass}`;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Add New Product"
        subtitle="Fill in the details to add a new product"
        breadcrumbs={[{ label: 'Products', to: '/products' }, { label: 'Add Product' }]}
        actions={
          <>
            <Button variant="outline" size="sm" icon={<Eye size={14} />}>Preview</Button>
            <Button variant="secondary" size="sm" onClick={() => toast('Saved as draft')} icon={<Save size={14} />}>Save Draft</Button>
            <Button size="sm" onClick={handleSubmit(onSubmit)} loading={saving} icon={<Plus size={14} />}>Publish</Button>
          </>
        }
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* Left - Main Form */}
          <div className="xl:col-span-2 space-y-5">
            {/* Basic Info */}
            <Card className="p-5">
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <InputField label="Product Name" required error={errors.name?.message}>
                    <input {...register('name', { required: 'Product name is required' })} className={inputClass} placeholder="e.g. Dell XPS 15 Laptop" />
                  </InputField>
                </div>
                <InputField label="SKU" required>
                  <input {...register('sku', { required: true })} className={inputClass} placeholder="LV-LAP-1001" />
                </InputField>
                <InputField label="Barcode">
                  <input {...register('barcode')} className={inputClass} placeholder="890123456789" />
                </InputField>
                <InputField label="Category" required>
                  <select {...register('category', { required: true })} className={selectClass}>
                    <option value="">Select Category</option>
                    {categories.filter(c => !c.parent).map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </InputField>
                <InputField label="Brand" required>
                  <select {...register('brand', { required: true })} className={selectClass}>
                    <option value="">Select Brand</option>
                    {brands.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                  </select>
                </InputField>
              </div>
            </Card>

            {/* Pricing */}
            <Card className="p-5">
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4">Pricing & Tax</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <InputField label="MRP (₹)" required>
                  <input {...register('mrp', { required: true })} type="number" className={inputClass} placeholder="50000" />
                </InputField>
                <InputField label="Selling Price (₹)" required>
                  <input {...register('sellingPrice', { required: true })} type="number" className={inputClass} placeholder="45000" />
                </InputField>
                <InputField label="Discount (%)">
                  <input {...register('discount')} type="number" className={inputClass} placeholder="10" />
                </InputField>
                <InputField label="GST (%)">
                  <select {...register('gst')} className={selectClass}>
                    {[0, 5, 12, 18, 28].map(g => <option key={g} value={g}>{g}%</option>)}
                  </select>
                </InputField>
              </div>
            </Card>

            {/* Inventory */}
            <Card className="p-5">
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4">Inventory</h3>
              <div className="grid grid-cols-3 gap-4">
                <InputField label="Current Stock">
                  <input {...register('stock')} type="number" className={inputClass} placeholder="100" />
                </InputField>
                <InputField label="Min Stock">
                  <input {...register('minStock')} type="number" className={inputClass} placeholder="5" />
                </InputField>
                <InputField label="Max Stock">
                  <input {...register('maxStock')} type="number" className={inputClass} placeholder="500" />
                </InputField>
              </div>
            </Card>

            {/* Description */}
            <Card className="p-5">
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4">Description</h3>
              <InputField label="Product Description">
                <textarea {...register('description')} rows={4} className={inputClass} placeholder="Detailed product description..." />
              </InputField>
              <div className="mt-4">
                <InputField label="Highlights (one per line)">
                  <textarea {...register('highlights')} rows={3} className={inputClass} placeholder="Fast performance&#10;1 year warranty&#10;Free delivery" />
                </InputField>
              </div>
            </Card>

            {/* SEO */}
            <Card className="p-5">
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4">SEO Settings</h3>
              <div className="space-y-4">
                <InputField label="Meta Title">
                  <input {...register('metaTitle')} className={inputClass} placeholder="Product - Link Vision" />
                </InputField>
                <InputField label="Meta Description">
                  <textarea {...register('metaDescription')} rows={2} className={inputClass} placeholder="Brief product description for search engines..." />
                </InputField>
              </div>
            </Card>
          </div>

          {/* Right - Images & Status */}
          <div className="space-y-5">
            {/* Images */}
            <Card className="p-5">
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4">Product Images</h3>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-600 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
              >
                <input {...getInputProps()} />
                <Upload size={28} className="mx-auto text-slate-400 mb-2" />
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Drop images here or click to upload</p>
                <p className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP up to 10MB each</p>
              </div>
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {images.map((img, i) => (
                    <div key={i} className="relative group">
                      <img src={img.preview} alt="" className={`w-full aspect-square object-cover rounded-xl border-2 cursor-pointer ${thumbnail === img.preview ? 'border-blue-500' : 'border-transparent'}`} onClick={() => setThumbnail(img.preview)} />
                      {thumbnail === img.preview && (
                        <span className="absolute bottom-1 left-1 text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded-md">Main</span>
                      )}
                      <button onClick={() => setImages(prev => prev.filter((_, j) => j !== i))} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Status */}
            <Card className="p-5">
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4">Product Status</h3>
              <div className="space-y-3">
                <InputField label="Status">
                  <select {...register('status')} className={selectClass}>
                    {['Published', 'Draft', 'Archived'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </InputField>
                <div className="space-y-2">
                  {['featured', 'trending', 'bestSeller', 'newArrival', 'todaysDeal'].map(flag => (
                    <label key={flag} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" {...register(flag)} className="rounded accent-blue-600" />
                      <span className="text-sm text-slate-600 dark:text-slate-400 capitalize">{flag.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </label>
                  ))}
                </div>
              </div>
            </Card>

            {/* Tags */}
            <Card className="p-5">
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4">Tags</h3>
              <div className="flex gap-2 mb-3">
                <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} className={`${inputClass} flex-1`} placeholder="Add tag..." />
                <Button size="sm" onClick={addTag} type="button">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 px-2 py-1 rounded-lg">
                    {tag}
                    <button onClick={() => setTags(t => t.filter(x => x !== tag))}><X size={10} /></button>
                  </span>
                ))}
              </div>
            </Card>

            {/* Warranty */}
            <Card className="p-5">
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4">Warranty</h3>
              <InputField label="Warranty Period">
                <select {...register('warranty')} className={selectClass}>
                  {['No Warranty', '6 Months', '1 Year', '2 Years', '3 Years'].map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </InputField>
            </Card>

            <Button type="submit" className="w-full justify-center" loading={saving} icon={<Plus size={16} />}>
              Create Product
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
