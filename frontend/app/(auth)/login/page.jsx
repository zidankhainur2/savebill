'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Zap, AlertCircle, ArrowLeft, ArrowUpRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (err) {
      setError(err.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F7F2] text-[#18281F] flex flex-col justify-between p-6 md:p-12 relative overflow-hidden font-sans selection:bg-emerald-900 selection:text-white">
      {/* Background Subtle Radial Pattern */}
      <div className="absolute inset-0 bg-organic-pattern opacity-60 pointer-events-none" />

      {/* Top Header Link */}
      <div className="relative z-10 max-w-md mx-auto w-full flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-medium text-emerald-900/70 hover:text-emerald-950 transition-colors bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-black/5 shadow-sm">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-emerald-900 flex items-center justify-center text-emerald-300">
            <Zap className="w-3.5 h-3.5 fill-emerald-300" />
          </div>
          <span className="text-sm font-bold text-emerald-950">SaveBill</span>
        </div>
      </div>

      {/* Center Auth Glass Card (Ref: Sunrock Glassmorphism) */}
      <div className="relative z-10 max-w-md w-full mx-auto my-auto py-8">
        <div className="glass-card rounded-[2.5rem] p-8 md:p-10 border border-white/90 shadow-glass space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-emerald-950 tracking-tight">Masuk ke Akun</h1>
            <p className="text-xs text-emerald-900/60 leading-relaxed">
              Masukkan email dan kata sandi Anda untuk mengakses dashboard.
            </p>
          </div>

          {error && (
            <div className="bg-red-50/90 border border-red-100 text-red-700 text-xs p-3.5 rounded-2xl flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-emerald-900/80 pl-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full px-4 py-3 rounded-2xl border border-black/5 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-900/20 focus:border-emerald-900 text-sm transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-emerald-900/80 pl-1">Kata Sandi</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-2xl border border-black/5 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-900/20 focus:border-emerald-900 text-sm transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-900 text-white font-medium py-3 px-6 rounded-full hover:bg-emerald-950 transition-all text-sm shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Memproses...' : 'Masuk ke Dashboard'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-xs text-center text-emerald-900/60 pt-2">
            Belum punya akun?{' '}
            <Link href="/register" className="text-emerald-950 font-semibold hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="relative z-10 text-center">
        <p className="text-[11px] text-emerald-900/40">© 2026 SaveBill Indonesia. All rights reserved.</p>
      </div>
    </div>
  );
}
