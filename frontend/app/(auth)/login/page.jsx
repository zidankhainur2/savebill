'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Zap, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';

const EASE_OUT = [0.23, 1, 0.32, 1];

const NoiseOverlay = () => (
  <div 
    className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

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
    <div className="min-h-[100dvh] bg-[#FDFBF7] text-[#0A0A0A] flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden font-sans selection:bg-[#1A3D2F] selection:text-[#FDFBF7]">
      <NoiseOverlay />

      {/* Top Header */}
      <div className="relative z-10 w-full flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-3 px-4 py-2 rounded-full hover:bg-black/5 transition-colors group">
          <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:-translate-x-1 transition-transform duration-300">
            <ArrowLeft className="w-4 h-4 text-[#0A0A0A]" />
          </div>
          <span className="text-sm font-medium text-black/70">Kembali</span>
        </Link>
        <div className="flex items-center gap-3 pr-4">
          <div className="w-8 h-8 rounded-full bg-[#1A3D2F] flex items-center justify-center shadow-sm">
            <Zap className="w-4 h-4 text-[#FDFBF7] fill-[#FDFBF7]" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-[#1A3D2F]">SaveBill</span>
        </div>
      </div>

      {/* Center Form */}
      <div className="relative z-10 w-full max-w-[28rem] mx-auto my-auto py-12">
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="bg-black/[0.02] p-2 sm:p-3 rounded-[2.5rem] ring-1 ring-black/[0.04]"
        >
          <div className="bg-white rounded-[calc(2.5rem-0.5rem)] sm:rounded-[calc(2.5rem-0.75rem)] shadow-sm p-8 sm:p-12 border border-black/[0.04]">
            
            <div className="mb-8">
              <h1 className="text-3xl font-medium text-[#0A0A0A] tracking-tighter mb-3">Selamat Datang.</h1>
              <p className="text-sm text-black/50 font-light leading-relaxed">
                Masuk ke akun Anda untuk melanjutkan audit dan mengelola penghematan.
              </p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 bg-red-50 text-red-600 text-xs px-4 py-3 rounded-2xl flex items-center gap-3 border border-red-100"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-black/40 uppercase tracking-widest pl-1">Alamat Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@perusahaan.com"
                  className="w-full px-5 py-3.5 rounded-2xl border border-black/5 bg-[#FDFBF7] focus:outline-none focus:ring-1 focus:ring-black/10 focus:border-black/20 text-sm transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-black/40 uppercase tracking-widest pl-1">Kata Sandi</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-5 py-3.5 rounded-2xl border border-black/5 bg-[#FDFBF7] focus:outline-none focus:ring-1 focus:ring-black/10 focus:border-black/20 text-sm transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 group active:scale-[0.98] transition-transform duration-300 disabled:opacity-50 disabled:pointer-events-none"
              >
                <div className="bg-[#1A3D2F] rounded-full p-2 pl-6 flex items-center justify-between gap-6 hover:bg-[#0F261D] transition-colors duration-500">
                  <span className="text-white font-medium text-sm">
                    {loading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-black/[0.04] text-center">
              <p className="text-xs text-black/40">
                Belum memiliki akun?{' '}
                <Link href="/register" className="text-[#1A3D2F] font-semibold hover:text-[#0F261D] transition-colors">
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-4">
        <p className="text-[10px] font-medium tracking-widest uppercase text-black/30">
          © 2026 SaveBill Indonesia. Awwwards Tier Design.
        </p>
      </div>
    </div>
  );
}
