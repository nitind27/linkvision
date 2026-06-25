import { useState, useRef, useEffect } from 'react';
import { Bell, Sun, Moon, Menu, Search, ChevronDown, Settings, User, LogOut, PanelLeftClose } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { notifications } from '../../dummy-data/index';
import { timeAgo } from '../../utils/helpers';

const notifColors = {
  order: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  repair: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  inventory: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  customer: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  payment: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  review: 'bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
  offer: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
};
const notifIcons = { order:'🛒', repair:'🔧', inventory:'📦', customer:'👤', payment:'💳', review:'⭐', offer:'🏷️' };

const drop = {
  hidden:  { opacity: 0, y: -6, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.14, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.1 } },
};

export default function Topbar({ onMobileMenu }) {
  const { darkMode, toggleDarkMode, user, unreadCount, collapseSidebar, sidebarCollapsed } = useStore();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const fn = e => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const iconBtn = `w-9 h-9 flex items-center justify-center rounded-xl
    text-gray-500 dark:text-slate-400
    hover:bg-gray-100 dark:hover:bg-slate-800
    hover:text-gray-700 dark:hover:text-slate-200
    transition-all`;

  return (
    <header className="topbar h-16 flex items-center gap-2 px-5 sticky top-0 z-30">
      {/* Mobile hamburger */}
      <button onClick={onMobileMenu} className={`${iconBtn} lg:hidden`}>
        <Menu size={19} />
      </button>

      {/* Collapse sidebar */}
      <button onClick={collapseSidebar} className={`${iconBtn} hidden lg:flex`} title="Toggle sidebar">
        <PanelLeftClose size={18} className={`transition-transform duration-200 ${sidebarCollapsed ? 'rotate-180' : ''}`} />
      </button>

      {/* Search */}
      <div className="hidden md:flex flex-1 max-w-xs ml-1">
        <div className="relative w-full">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 text-[13px] bg-gray-50 dark:bg-slate-800
              border border-gray-200 dark:border-slate-700 rounded-xl
              text-gray-700 dark:text-slate-200 placeholder:text-gray-400
              outline-none focus:border-blue-400 focus:bg-white dark:focus:bg-slate-700
              transition-all"
          />
        </div>
      </div>

      <div className="flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-1">

        {/* Dark mode toggle */}
        <button onClick={toggleDarkMode} className={iconBtn} title={darkMode ? 'Light mode' : 'Dark mode'}>
          {darkMode ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button onClick={() => { setNotifOpen(o => !o); setProfileOpen(false); }} className={`${iconBtn} relative`}>
            <Bell size={17} />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 dot-pulse" />
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div variants={drop} initial="hidden" animate="visible" exit="exit"
                className="absolute right-0 mt-2 w-[340px] bg-white dark:bg-slate-900
                  rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden z-50">

                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold text-gray-800 dark:text-white">Notifications</span>
                    <span className="text-[11px] bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  </div>
                  <button className="text-[12px] text-blue-600 font-semibold hover:underline">Mark all read</button>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-gray-50 dark:divide-slate-800">
                  {notifications.slice(0, 6).map(n => (
                    <div key={n.id}
                      className={`flex gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-800/60 cursor-pointer transition
                        ${!n.read ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''}`}>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 ${notifColors[n.type]}`}>
                        {notifIcons[n.type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-gray-700 dark:text-slate-200">{n.title}</p>
                        <p className="text-[12px] text-gray-500 dark:text-slate-400 mt-0.5 line-clamp-1">{n.message}</p>
                        <p className="text-[11px] text-gray-400 mt-1">{timeAgo(n.createdAt)}</p>
                      </div>
                      {!n.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0" />}
                    </div>
                  ))}
                </div>

                <div className="px-4 py-2.5 border-t border-gray-100 dark:border-slate-800">
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
        <div className="w-px h-5 bg-gray-200 dark:bg-slate-700 mx-1" />

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setProfileOpen(o => !o); setNotifOpen(false); }}
            className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl
              hover:bg-gray-100 dark:hover:bg-slate-800 transition-all"
          >
            <div className="relative">
              <img src={user?.avatar} alt="" className="w-7 h-7 rounded-full object-cover ring-2 ring-white dark:ring-slate-700" />
              <span className="absolute -bottom-px -right-px w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-[12.5px] font-semibold text-gray-700 dark:text-slate-200 leading-none">{user?.name}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{user?.role}</p>
            </div>
            <ChevronDown size={13} className="text-gray-400 hidden sm:block" />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div variants={drop} initial="hidden" animate="visible" exit="exit"
                className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900
                  rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden z-50">

                {/* Header */}
                <div className="px-4 py-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-b border-gray-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <img src={user?.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <p className="text-[13px] font-bold text-gray-800 dark:text-white leading-tight">{user?.name}</p>
                      <p className="text-[11px] text-gray-500 dark:text-slate-400">{user?.email}</p>
                    </div>
                  </div>
                </div>

                <div className="py-1">
                  {[
                    { label: 'My Profile', icon: User, to: '/profile' },
                    { label: 'Settings', icon: Settings, to: '/settings' },
                  ].map(item => (
                    <Link key={item.label} to={item.to} onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-[13px]
                        text-gray-600 dark:text-slate-400
                        hover:bg-gray-50 dark:hover:bg-slate-800 transition">
                      <item.icon size={15} className="text-gray-400" />
                      {item.label}
                    </Link>
                  ))}
                  <div className="mx-3 my-1 h-px bg-gray-100 dark:bg-slate-800" />
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
