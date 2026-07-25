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
  Layers,
  Settings,
  BookOpen,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Perangkat', href: '/appliances', icon: Plug },
  { label: 'Simulator', href: '/simulator', icon: Sliders },
  { label: 'Tarif Dasar', href: '/tariffs', icon: Layers },
  { label: 'AI Advisor', href: '/ai-advisor', icon: Bot },
  { label: 'Laporan Audit', href: '/reports', icon: FileText },
  { label: 'Panduan', href: '/guide', icon: BookOpen },
  { label: 'Pengaturan', href: '/settings', icon: Settings },
];

const PAGE_TITLES = {
  '/dashboard': 'Dashboard Energi',
  '/appliances': 'Daftar Perangkat',
  '/simulator': 'Simulator Penghematan',
  '/tariffs': 'Matriks Tarif PLN',
  '/ai-advisor': 'AI Energy Advisor',
  '/reports': 'Laporan Audit',
  '/guide': 'Panduan & Benchmark ESDM',
  '/settings': 'Pengaturan Profil & Anggaran',
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

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'User';

  if (loading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-[#FDFBF7]">
        <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-black/5 shadow-sm text-[#1A3D2F]">
          <Zap className="w-5 h-5 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide">Memuat Sesi...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex bg-[#FDFBF7] text-[#0A0A0A] font-sans selection:bg-[#1A3D2F] selection:text-[#FDFBF7]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#FDFBF7]/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Linear / Apple UI Style */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-[#FDFBF7] border-r border-black/[0.06] flex flex-col shrink-0 no-print
        transform transition-transform duration-300 ease-apple-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand */}
        <div className="p-6 flex items-center justify-between border-b border-black/[0.04]">
          <Link href="/" className="flex items-center gap-3 active:scale-95 transition-transform">
            <div className="w-7 h-7 rounded-full bg-[#1A3D2F] flex items-center justify-center shadow-sm">
              <Zap className="w-3.5 h-3.5 text-[#FDFBF7] fill-[#FDFBF7]" />
            </div>
            <div>
              <span className="text-[15px] font-semibold tracking-tight text-[#0A0A0A] block">SaveBill</span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-black/40 hover:text-black rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] transition-all duration-150 active:scale-[0.98] ${
                  isActive
                    ? 'bg-black/[0.04] text-[#0A0A0A] font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]'
                    : 'text-black/60 hover:text-[#0A0A0A] hover:bg-black/[0.02] font-medium'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#1A3D2F]' : 'text-black/40'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-black/[0.04] flex items-center justify-between bg-black/[0.01]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-black/5 text-[#0A0A0A] flex items-center justify-center shrink-0 text-xs font-semibold ring-1 ring-black/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,1)]">
              {firstName.charAt(0).toUpperCase()}
            </div>
            <div className="truncate">
              <p className="text-[13px] font-semibold truncate text-[#0A0A0A]">{user?.user_metadata?.full_name || 'Pengguna'}</p>
              <p className="text-[11px] font-medium text-black/50 truncate">{user?.email || ''}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Keluar"
            className="p-2 text-black/40 hover:text-black hover:bg-black/5 rounded-xl transition-all active:scale-95"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="px-6 md:px-8 py-4 flex items-center justify-between no-print shrink-0 border-b border-black/[0.04] bg-[#FDFBF7]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-black/70 bg-white rounded-full ring-1 ring-black/5 shadow-sm active:scale-95 transition-transform"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A3D2F]" />
              <h2 className="text-[15px] font-semibold tracking-tight text-[#0A0A0A]">
                {PAGE_TITLES[pathname] || 'Dashboard'}
              </h2>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-black/40 bg-black/[0.02] px-3 py-1.5 rounded-full">
              {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </header>

        {/* Child pages usually have space-y-something, we wrap it cleanly */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
