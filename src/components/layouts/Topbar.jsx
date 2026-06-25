import { useState, useRef, useEffect } from 'react';
import { Bell, Sun, Moon, Menu, Search, ChevronDown, Settings, User, LogOut, PanelLeftClose, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { notifications } from '../../dummy-data/index';
import { timeAgo } from '../../utils/helpers';

const notifTypeColors = {
  order: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
  repair: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400',
  inventory: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400',
  customer: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400',
  payment: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400',
  review: 'bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400',
  offer: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400',
};
const notifIcons = { order:'🛒', repair:'🔧', inventory:'📦', customer:'👤', payment:'💳', review:'⭐', offer:'🏷️' };

const dropVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.15, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, scale: 0.97, transition: { duration: 0.1 } },
};

export default function Topbar({ onMobileMenu }) {
  const { darkMode, toggleDarkMode, user, unreadCount, collapseSidebar, sidebarCollapsed } = useStore();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="topbar-glass h-16 flex items-center gap-3 px-5 sticky top-0 z-30">
      {/* Left */}
      <button onClick={onMobileMenu}
        className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition lg:hidden">
        <Menu size={19} />
      </button>
      <button onClick={collapseSidebar}
        className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition hidden lg:flex">
        <PanelLeftClose size={18} className={`transition-transform duration-200 ${sidebarCollapsed ? 'rotate-180' : ''}`} />
      </button>

      {/* Search */}
      <div className="hidden md:flex flex-1 max-w-sm">
        <label className="relative w-full">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-10 pr-4 py-2 text-[13px] bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-xl text-slate-700 dark:text-slate-200 placeholder:text-slate-400 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-1.5 py-0.5 hidden sm:block">⌘K</kbd>
        </label>
      </div>

      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-1">

        {/* Dark mode */}
        <button onClick={toggleDarkMode}
          className="w-9 h-9 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition flex items-center justify-center">
          {darkMode ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setNotifOpen(o => !o); setProfileOpen(false); }}
            className="w-9 h-9 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition flex items-center justify-center relative"
          >
            <Bell size={17} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 badge-live" />
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                variants={dropVariants} initial="hidden" animate="visible" exit="exit"
                className="absolute right-0 mt-2 w-[340px] bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden z-50"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-800 dark:text-white text-sm">Notifications</h3>
                    <span className="text-[11px] bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-semibold px-2 py-0.5 rounded-full">{unreadCount} new</span>
                  </div>
                  <button className="text-[12px] text-blue-600 font-medium hover:underline">Mark all read</button>
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {notifications.slice(0, 7).map(n => (
                    <div key={n.id} className={`flex gap-3 px-4 py-3 border-b border-slate-50 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition ${!n.read ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''}`}>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 ${notifTypeColors[n.type]}`}>
                        {notifIcons[n.type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-slate-700 dark:text-slate-200 leading-tight">{n.title}</p>
                        <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed line-clamp-1">{n.message}</p>
                        <p className="text-[11px] text-slate-400 mt-1">{timeAgo(n.createdAt)}</p>
                      </div>
                      {!n.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0" />}
                    </div>
                  ))}
                </div>

                <div className="px-4 py-2.5">
                  <Link to="/notifications" onClick={() => setNotifOpen(false)}
                    className="block text-center text-[12.5px] text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                    View all notifications →
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setProfileOpen(o => !o); setNotifOpen(false); }}
            className="flex items-center gap-2.5 pl-1 pr-2.5 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <div className="relative">
              <img src={user?.avatar} alt={user?.name} className="w-7 h-7 rounded-full object-cover ring-2 ring-white dark:ring-slate-700" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-[12.5px] font-semibold text-slate-700 dark:text-slate-200 leading-tight">{user?.name}</p>
              <p className="text-[11px] text-slate-400 leading-tight">{user?.role}</p>
            </div>
            <ChevronDown size={13} className="text-slate-400 hidden sm:block" />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                variants={dropVariants} initial="hidden" animate="visible" exit="exit"
                className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden z-50"
              >
                {/* User info */}
                <div className="px-4 py-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <img src={user?.avatar} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-700" />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-white text-sm">{user?.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{user?.email}</p>
                    </div>
                  </div>
                </div>

                <div className="py-1.5">
                  {[
                    { label: 'My Profile', icon: User, to: '/profile' },
                    { label: 'Settings', icon: Settings, to: '/settings' },
                    { label: 'Upgrade Plan', icon: Zap, to: '/settings', highlight: true },
                  ].map(item => (
                    <Link key={item.label} to={item.to} onClick={() => setProfileOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 text-[13px] transition ${item.highlight ? 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'}`}>
                      <item.icon size={15} />
                      {item.label}
                    </Link>
                  ))}
                  <div className="mx-2 my-1 h-px bg-slate-100 dark:bg-slate-800" />
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                    <LogOut size={15} />
                    Sign out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
