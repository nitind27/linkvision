import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Package, Tag, Award, Percent, Image, ShoppingCart,
  Users, Wrench, BarChart3, CreditCard, Bell, Ticket, Shield, Settings,
  ChevronDown, X, Monitor, Star, FileText, HelpCircle, Images, LogOut,
  Boxes, ChevronRight, TrendingUp
} from 'lucide-react';
import { useStore } from '../../store/useStore';

const navGroups = [
  {
    section: '',
    items: [{ label: 'Dashboard', icon: LayoutDashboard, to: '/' }]
  },
  {
    section: 'CATALOG',
    items: [
      {
        label: 'Products', icon: Package, children: [
          { label: 'All Products', to: '/products' },
          { label: 'Add Product', to: '/products/add' },
        ]
      },
      { label: 'Categories', icon: Tag, to: '/categories' },
      { label: 'Brands', icon: Award, to: '/brands' },
      { label: 'Inventory', icon: Boxes, to: '/inventory' },
    ]
  },
  {
    section: 'SALES',
    items: [
      { label: 'Orders', icon: ShoppingCart, to: '/orders' },
      { label: 'Customers', icon: Users, to: '/customers' },
      { label: 'Payments', icon: CreditCard, to: '/payments' },
    ]
  },
  {
    section: 'SERVICE',
    items: [
      { label: 'Repairs', icon: Wrench, to: '/repairs' },
      { label: 'Support', icon: Ticket, to: '/support' },
    ]
  },
  {
    section: 'MARKETING',
    items: [
      { label: 'Offers & Coupons', icon: Percent, to: '/offers' },
      { label: 'Banners', icon: Image, to: '/banners' },
      { label: 'Reviews', icon: Star, to: '/reviews' },
    ]
  },
  {
    section: 'CONTENT',
    items: [
      { label: 'Gallery', icon: Images, to: '/gallery' },
      { label: 'Blog', icon: FileText, to: '/blog' },
      { label: 'FAQs', icon: HelpCircle, to: '/faqs' },
    ]
  },
  {
    section: 'ANALYTICS',
    items: [
      { label: 'Analytics', icon: TrendingUp, to: '/analytics' },
      { label: 'Reports', icon: BarChart3, to: '/reports/sales' },
      { label: 'Notifications', icon: Bell, to: '/notifications' },
    ]
  },
  {
    section: 'ADMIN',
    items: [
      { label: 'Admin Users', icon: Shield, to: '/admins' },
      { label: 'Settings', icon: Settings, to: '/settings' },
    ]
  },
];

function NavItem({ item, collapsed }) {
  const location = useLocation();
  const isChildActive = item.children?.some(c =>
    location.pathname === c.to || location.pathname.startsWith(c.to + '/')
  );
  const [open, setOpen] = useState(isChildActive);

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setOpen(o => !o)}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-all
            ${isChildActive
              ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400'
              : 'text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-800 dark:hover:text-slate-200'
            }`}
        >
          <item.icon size={16} className="shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1 text-left truncate">{item.label}</span>
              <ChevronDown
                size={13}
                className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              />
            </>
          )}
        </button>

        <AnimatePresence initial={false}>
          {open && !collapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="overflow-hidden"
            >
              <div className="mt-0.5 ml-7 pl-3 border-l-2 border-gray-100 dark:border-slate-700 space-y-0.5 py-1">
                {item.children.map(child => (
                  <NavLink
                    key={child.to}
                    to={child.to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[12.5px] font-medium transition-all
                      ${isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                      }`
                    }
                  >
                    <ChevronRight size={11} className="shrink-0" />
                    {child.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        `flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-all
        ${isActive
          ? 'bg-blue-600 text-white shadow-sm shadow-blue-200 dark:shadow-blue-900/40'
          : 'text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-800 dark:hover:text-slate-200'
        }`
      }
    >
      <item.icon size={16} className="shrink-0" />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </NavLink>
  );
}

export default function Sidebar({ mobile = false, onClose }) {
  const { sidebarCollapsed, user, logout } = useStore();
  const collapsed = !mobile && sidebarCollapsed;

  return (
    <aside
      className={`sidebar h-full flex flex-col transition-all duration-300 ${collapsed ? 'w-[62px]' : 'w-[242px]'}`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 h-16 border-b border-gray-100 dark:border-slate-800 shrink-0 px-4 ${collapsed ? 'justify-center px-0' : ''}`}>
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
          <Monitor size={17} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="font-bold text-gray-900 dark:text-white text-[15px] leading-none">Link Vision</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Admin Panel</p>
          </div>
        )}
        {mobile && (
          <button onClick={onClose} className="ml-auto p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-gray-400">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-4">
        {navGroups.map(group => (
          <div key={group.section || 'main'}>
            {group.section && !collapsed && (
              <p className="text-[10px] font-bold text-gray-400 dark:text-slate-600 tracking-widest uppercase px-3 mb-1.5">
                {group.section}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map(item => (
                <NavItem key={item.label} item={item} collapsed={collapsed} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User Footer */}
      <div className="shrink-0 p-2.5 border-t border-gray-100 dark:border-slate-800">
        {!collapsed ? (
          <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-all group cursor-pointer">
            <div className="relative shrink-0">
              <img src={user?.avatar} alt="" className="w-8 h-8 rounded-full object-cover ring-2 ring-white dark:ring-slate-700" />
              <span className="absolute -bottom-px -right-px w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-gray-800 dark:text-slate-200 truncate leading-none">{user?.name}</p>
              <p className="text-[11px] text-gray-400 mt-0.5 truncate">{user?.role}</p>
            </div>
            <button
              onClick={logout}
              className="p-1.5 rounded-lg text-gray-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition opacity-0 group-hover:opacity-100"
              title="Logout"
            >
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="relative">
              <img src={user?.avatar} alt="" className="w-8 h-8 rounded-full object-cover" title={user?.name} />
              <span className="absolute -bottom-px -right-px w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
