import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useStore } from '../../store/useStore';

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { initTheme } = useStore();
  const location = useLocation();

  useEffect(() => { initTheme(); }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc] dark:bg-[#080d14]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: 'spring', stiffness: 350, damping: 32 }}
              className="fixed left-0 top-0 bottom-0 z-50 lg:hidden shadow-2xl"
            >
              <Sidebar mobile onClose={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar onMobileMenu={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-5 md:p-6 max-w-[1600px] mx-auto">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <Outlet />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
