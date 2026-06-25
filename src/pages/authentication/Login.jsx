import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Monitor, Mail, Lock, ArrowRight, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { useStore } from '../../store/useStore';

const floatingOrbs = [
  { size: 320, x: '10%', y: '15%', color: 'from-blue-600/20 to-indigo-600/10', delay: 0 },
  { size: 240, x: '70%', y: '60%', color: 'from-violet-600/20 to-purple-600/10', delay: 1.5 },
  { size: 180, x: '80%', y: '10%', color: 'from-cyan-500/15 to-blue-500/10', delay: 0.8 },
  { size: 200, x: '5%', y: '70%', color: 'from-indigo-500/15 to-blue-500/10', delay: 2 },
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useStore();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1100));
    login({ id: 'ADM-600', name: 'Super Admin', email: data.email, role: 'Super Admin', avatar: 'https://i.pravatar.cc/150?img=52' });
    toast.success('Welcome back, Super Admin!');
    navigate('/');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ background: 'linear-gradient(135deg, #060b18 0%, #0d1a35 50%, #10112b 100%)' }}>

      {/* Floating orbs */}
      {floatingOrbs.map((orb, i) => (
        <motion.div key={i}
          className={`absolute rounded-full bg-gradient-to-br ${orb.color} blur-3xl pointer-events-none`}
          style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6 + i, repeat: Infinity, delay: orb.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-14 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Monitor size={18} className="text-white" />
          </div>
          <span className="font-bold text-white text-lg">Link Vision</span>
        </div>

        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-white leading-tight mb-4"
          >
            Manage your store<br />
            <span style={{ background: 'linear-gradient(90deg,#60a5fa,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              from one place
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="text-slate-400 text-[15px] leading-relaxed mb-8 max-w-sm"
          >
            Complete admin panel for products, orders, repairs, customers, analytics and much more.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            {['Real-time order tracking', 'Advanced repair management', 'Inventory & stock control', 'Rich analytics & reports'].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <Check size={11} className="text-blue-400" />
                </div>
                <span className="text-slate-300 text-[13.5px]">{f}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <p className="text-slate-600 text-xs">© 2024 Link Vision. All rights reserved.</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10 lg:max-w-md xl:max-w-lg">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Monitor size={18} className="text-white" />
            </div>
            <span className="font-bold text-white text-lg">Link Vision</span>
          </div>

          <div className="mb-7">
            <h1 className="text-2xl font-bold text-white mb-1.5">Welcome back</h1>
            <p className="text-slate-400 text-[13.5px]">Sign in to your admin account to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[12.5px] font-semibold text-slate-300 mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })}
                  type="email"
                  defaultValue="admin@linkvision.in"
                  placeholder="admin@linkvision.in"
                  className="w-full pl-11 pr-4 py-3 text-[13.5px] rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-white/[0.08] transition-all outline-none"
                />
              </div>
              {errors.email && <p className="text-red-400 text-[11.5px] mt-1.5">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[12.5px] font-semibold text-slate-300">Password</label>
                <button type="button" className="text-[12px] text-blue-400 hover:text-blue-300 transition">Forgot password?</button>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  {...register('password', { required: 'Password required', minLength: { value: 4, message: 'Min 4 chars' } })}
                  type={showPass ? 'text' : 'password'}
                  defaultValue="admin123"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 text-[13.5px] rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-white/[0.08] transition-all outline-none"
                />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-[11.5px] mt-1.5">{errors.password.message}</p>}
            </div>

            {/* Remember */}
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-600 bg-white/10 accent-blue-500 cursor-pointer" />
              <span className="text-[13px] text-slate-400">Keep me signed in</span>
            </label>

            {/* Submit */}
            <motion.button
              type="submit" disabled={loading} whileTap={{ scale: 0.98 }}
              className="w-full py-3 flex items-center justify-center gap-2 rounded-xl font-semibold text-[14px] text-white transition-all disabled:opacity-60"
              style={{ background: loading ? 'rgba(37,99,235,0.7)' : 'linear-gradient(135deg, #2563eb, #1d4ed8)', boxShadow: '0 4px 24px rgba(37,99,235,0.35)' }}
            >
              {loading ? (
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>Sign In <ArrowRight size={15} /></>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[11.5px] text-slate-600">or continue with</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { label: 'Google', bg: '#fff', color: '#333', icon: '🔵' },
              { label: 'Apple', bg: '#fff', color: '#333', icon: '🍎' },
              { label: 'Microsoft', bg: '#fff', color: '#333', icon: '🪟' },
            ].map(p => (
              <button key={p.label} onClick={() => toast(`${p.label} login coming soon`)}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] text-white text-[12.5px] font-medium transition">
                <span className="text-base leading-none">{p.icon}</span>
                <span className="hidden sm:block">{p.label}</span>
              </button>
            ))}
          </div>

          <p className="text-center text-[11.5px] text-slate-600 mt-6 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            Demo credentials: <span className="text-blue-400 font-mono">admin@linkvision.in</span> / <span className="text-blue-400 font-mono">admin123</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
