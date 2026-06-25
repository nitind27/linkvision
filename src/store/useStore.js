import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      // Default: DARK MODE
      darkMode: true,

      toggleDarkMode: () => {
        const next = !get().darkMode;
        set({ darkMode: next });
        if (next) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      initTheme: () => {
        const dark = get().darkMode;
        if (dark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      // Sidebar
      sidebarCollapsed: false,
      collapseSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

      // Auth
      user: {
        id: 'ADM-600',
        name: 'Super Admin',
        email: 'admin@linkvision.in',
        role: 'Super Admin',
        avatar: 'https://i.pravatar.cc/150?img=52',
      },
      isAuthenticated: true,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),

      // Notifications
      unreadCount: 5,
      setUnreadCount: (n) => set({ unreadCount: n }),
    }),
    {
      name: 'link-vision-store',
      version: 2, // bump version — forces old cached light-mode state to reset
      partialize: (s) => ({
        darkMode: s.darkMode,
        user: s.user,
        isAuthenticated: s.isAuthenticated,
        sidebarCollapsed: s.sidebarCollapsed,
      }),
    }
  )
);
