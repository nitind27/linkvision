import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Save, Store, Palette, CreditCard, Globe, Lock, Bell } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useStore } from '../../store/useStore';

const tabs = [
  { id: 'store', label: 'Store Info', icon: Store },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'seo', label: 'SEO', icon: Globe },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Lock },
];

const inputClass = "w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 dark:text-slate-200 placeholder:text-slate-400 transition";

export default function Settings() {
  const [activeTab, setActiveTab] = useState('store');
  const { darkMode, toggleDarkMode } = useStore();
  const { register, handleSubmit } = useForm();

  const onSave = () => { toast.success('Settings saved successfully!'); };

  return (
    <div className="space-y-5">
      <PageHeader title="Settings" subtitle="Manage your store settings" breadcrumbs={[{ label: 'Settings' }]} />

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Sidebar Tabs */}
        <div className="lg:w-52 shrink-0">
          <Card className="p-2">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'}`}>
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </Card>
        </div>

        {/* Content */}
        <div className="flex-1">
          <motion.div key={activeTab} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
            {activeTab === 'store' && (
              <Card className="p-5">
                <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-5">Store Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    ['Store Name', 'storeName', 'Link Vision'],
                    ['Tagline', 'tagline', 'Your Tech Destination'],
                    ['Email', 'email', 'info@linkvision.in'],
                    ['Phone', 'phone', '+91 98765 43210'],
                    ['GST Number', 'gst', '27ABCDE1234F1Z5'],
                    ['Currency', 'currency', 'INR (₹)'],
                    ['Timezone', 'timezone', 'Asia/Kolkata'],
                    ['Language', 'language', 'English'],
                  ].map(([label, name, placeholder]) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
                      <input {...register(name)} defaultValue={placeholder} className={inputClass} />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Address</label>
                    <textarea {...register('address')} defaultValue="123 Tech Street, Mumbai, Maharashtra 400001" rows={3} className={inputClass} />
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-3">Social Media</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[['Facebook', 'fb'], ['Instagram', 'ig'], ['Twitter', 'tw'], ['YouTube', 'yt']].map(([label, name]) => (
                      <div key={name}>
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{label}</label>
                        <input {...register(`social.${name}`)} className={inputClass} placeholder={`https://${name}.com/linkvision`} />
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="mt-5" icon={<Save size={14} />} onClick={onSave}>Save Changes</Button>
              </Card>
            )}

            {activeTab === 'appearance' && (
              <Card className="p-5">
                <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-5">Appearance Settings</h3>
                <div className="space-y-5">
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-700 dark:text-slate-200">Dark Mode</p>
                      <p className="text-sm text-slate-500">Toggle between light and dark theme</p>
                    </div>
                    <button onClick={toggleDarkMode} className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-blue-600' : 'bg-slate-300'}`}>
                      <div className={`absolute w-5 h-5 rounded-full bg-white shadow top-0.5 transition-all ${darkMode ? 'left-6.5 translate-x-0.5' : 'left-0.5'}`} />
                    </button>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700 dark:text-slate-200 mb-3">Primary Color</p>
                    <div className="flex gap-3 flex-wrap">
                      {['#2563eb', '#7c3aed', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6'].map(color => (
                        <button key={color} className="w-8 h-8 rounded-xl border-2 border-white shadow-sm hover:scale-110 transition-transform" style={{ background: color }} />
                      ))}
                    </div>
                  </div>
                </div>
                <Button className="mt-5" icon={<Save size={14} />} onClick={onSave}>Save Changes</Button>
              </Card>
            )}

            {activeTab === 'seo' && (
              <Card className="p-5">
                <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-5">SEO Settings</h3>
                <div className="space-y-4">
                  {[
                    ['Meta Title', 'metaTitle', 'Link Vision - Your Tech Destination'],
                    ['Meta Description', 'metaDesc', 'Buy laptops, desktops, accessories & more at Link Vision. Best prices guaranteed.'],
                    ['Keywords', 'keywords', 'laptops, desktops, gaming pc, accessories, repair'],
                    ['Canonical URL', 'canonical', 'https://linkvision.in'],
                    ['OG Image URL', 'ogImage', 'https://linkvision.in/og-image.jpg'],
                  ].map(([label, name, placeholder]) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
                      {name === 'metaDesc' || name === 'keywords' ? (
                        <textarea {...register(name)} defaultValue={placeholder} rows={2} className={inputClass} />
                      ) : (
                        <input {...register(name)} defaultValue={placeholder} className={inputClass} />
                      )}
                    </div>
                  ))}
                </div>
                <Button className="mt-5" icon={<Save size={14} />} onClick={onSave}>Save Changes</Button>
              </Card>
            )}

            {['payment', 'notifications', 'security'].includes(activeTab) && (
              <Card className="p-5">
                <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-5 capitalize">{activeTab} Settings</h3>
                <div className="space-y-4">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                      <div>
                        <p className="font-medium text-slate-700 dark:text-slate-200">Option {i + 1}</p>
                        <p className="text-sm text-slate-500">Configure this {activeTab} setting</p>
                      </div>
                      <button className="w-12 h-6 rounded-full bg-blue-600 relative">
                        <div className="absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow" />
                      </button>
                    </div>
                  ))}
                </div>
                <Button className="mt-5" icon={<Save size={14} />} onClick={onSave}>Save Changes</Button>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
