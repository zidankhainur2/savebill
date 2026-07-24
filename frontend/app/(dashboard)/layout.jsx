'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  Zap,
  LayoutDashboard,
  Plug,
  Sliders,
  Bot,
  FileText,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Perangkat', href: '/appliances', icon: Plug },
  { label: 'Simulator', href: '/simulator', icon: Sliders },
  { label: 'AI Advisor', href: '/ai-advisor', icon: Bot },
  { label: 'Laporan', href: '/reports', icon: FileText },
];

const PAGE_TITLES = {
  '/dashboard': 'Dashboard Energi',
  '/appliances': 'Daftar Perangkat',
  '/simulator': 'Simulator Penghematan',
  '/ai-advisor': 'AI Energy Advisor',
  '/reports': 'Laporan Audit',
};

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        setLoading(false);
      } else {
        router.push('/login');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setLoading(false);
      } else {
        router.push('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'Pengguna';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F7F2]">
        <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-black/5 shadow-sm">
          <Zap className="w-5 h-5 text-emerald-800 animate-pulse" />
          <span className="text-sm font-medium text-emerald-950">Memuat Sesi...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F6F7F2] text-[#18281F] font-sans selection:bg-emerald-900 selection:text-white">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar (Ref: Solar.Ray / Sunrock Forest Green Sidebar) */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-[#1A3D2F] text-white flex flex-col shrink-0 no-print
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand */}
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-300 flex items-center justify-center text-emerald-950 font-bold">
              <Zap className="w-4 h-4 fill-emerald-950" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight block text-white">SaveBill</span>
              <span className="text-[10px] text-emerald-300/80 uppercase tracking-wider block font-medium">Energy Audit</span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-white/50 hover:text-white rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation (Pill-style item highlights) */}
        <nav className="flex-1 p-4 space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-300 text-emerald-950 font-semibold shadow-sm'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Footer (Organic Pill Card) */}
        <div className="p-4 border-t border-white/10 flex items-center justify-between bg-black/10">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-emerald-300/20 text-emerald-300 border border-emerald-300/30 flex items-center justify-center shrink-0 text-xs font-bold">
              {firstName.charAt(0).toUpperCase()}
            </div>
            <div className="truncate">
              <p className="text-xs font-medium truncate text-white">{user?.user_metadata?.full_name || 'Pengguna'}</p>
              <p className="text-[10px] text-emerald-200/60 truncate">{user?.email || ''}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Keluar"
            className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Floating Topbar (Pill Navigation Header) */}
        <header className="px-6 py-4 flex items-center justify-between no-print shrink-0 border-b border-black/5 bg-[#F6F7F2]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-emerald-900 bg-white rounded-full border border-black/5 shadow-xs"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <h2 className="text-sm font-semibold text-emerald-950">
                {PAGE_TITLES[pathname] || 'Dashboard'}
              </h2>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-xs font-medium text-emerald-900/60 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-black/5 shadow-xs">
              {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-6xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
