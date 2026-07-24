'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  Zap,
  BarChart3,
  AlertTriangle,
  Sliders,
  Bot,
  ArrowUpRight,
  Plug,
  FileText,
  ShieldCheck,
  Sparkles,
  Check,
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/dashboard');
      } else {
        setCheckingAuth(false);
      }
    });
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F7F2]">
        <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-black/5 shadow-sm">
          <Zap className="w-5 h-5 text-emerald-800 animate-pulse" />
          <span className="text-sm font-medium text-emerald-950">Memuat SaveBill...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F7F2] text-[#18281F] flex flex-col font-sans selection:bg-emerald-900 selection:text-white">
      {/* Floating Pill Navigation Bar (Ref: Solar.Ray ref-design1.png) */}
      <div className="fixed top-5 inset-x-0 z-50 flex justify-center px-4">
        <nav className="pill-nav rounded-full px-4 py-2 flex items-center justify-between w-full max-w-4xl shadow-sm">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 pl-2">
            <div className="w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center text-emerald-300">
              <Zap className="w-4 h-4 fill-emerald-300" />
            </div>
            <span className="text-base font-bold tracking-tight text-emerald-950">SaveBill</span>
          </Link>

          {/* Center Links (Pill Style) */}
          <div className="hidden md:flex items-center gap-1 text-xs font-medium text-emerald-900/70">
            <a href="#fitur" className="px-3.5 py-1.5 rounded-full hover:bg-emerald-900/5 hover:text-emerald-950 transition-colors">Fitur</a>
            <a href="#cara-kerja" className="px-3.5 py-1.5 rounded-full hover:bg-emerald-900/5 hover:text-emerald-950 transition-colors">Cara Kerja</a>
            <a href="#simulasi" className="px-3.5 py-1.5 rounded-full hover:bg-emerald-900/5 hover:text-emerald-950 transition-colors">Simulasi PLN</a>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="text-xs font-medium text-emerald-900 hover:text-emerald-950 px-3.5 py-1.5 rounded-full hover:bg-emerald-900/5 transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="bg-emerald-900 text-white text-xs font-medium px-4 py-1.5 rounded-full hover:bg-emerald-950 transition-all shadow-sm"
            >
              Coba Gratis
            </Link>
          </div>
        </nav>
      </div>

      {/* Hero Section (Ref: Solar.Ray ref-design1.png & Sunrock ref-design2.png) */}
      <header className="pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 relative overflow-hidden bg-organic-pattern">
        <div className="max-w-5xl mx-auto text-center space-y-7 relative z-10">
          {/* Top Pill Tag Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/5 text-xs font-medium text-emerald-900 shadow-sm animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Providing energy solutions →</span>
          </div>

          {/* Hero Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-emerald-950 leading-[1.1] max-w-4xl mx-auto animate-fade-in-up stagger-1">
            Kendalikan Tagihan Listrik Rumah Anda Secara Cerdas
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-emerald-900/70 leading-relaxed max-w-2xl mx-auto font-normal animate-fade-in-up stagger-2">
            Solusi audit energi berbasis AI untuk pelanggan PLN Indonesia. Catat perangkat elektronik, deteksi perangkat pemboros, dan simulasikan penghematan sebelum tagihan datang.
          </p>

          {/* Hero Action Buttons with Circular Badge */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 animate-fade-in-up stagger-3">
            <Link href="/register" className="pill-btn-dark">
              <span>Mulai Hemat Sekarang</span>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </Link>

            <Link href="/login" className="pill-btn-light">
              <span>Pelajari Fitur</span>
              <div className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-emerald-900" />
              </div>
            </Link>
          </div>

          {/* Preview Hero Visual (Ref: Sunrock ref-design2.png Glassmorphism Widget Overlay) */}
          <div className="pt-12 relative max-w-3xl mx-auto">
            <div className="glass-card rounded-[2.5rem] p-6 md:p-8 border border-white/80 shadow-glass relative z-10 text-left space-y-6">
              <div className="flex items-center justify-between border-b border-black/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-900 text-emerald-300 flex items-center justify-center font-bold">
                    <Zap className="w-4 h-4 fill-emerald-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-emerald-950 text-sm">Dashboard Energi Rumah</h3>
                    <p className="text-xs text-emerald-900/60">Golongan Daya 1300 VA • Tarif Rp 1.444,7/kWh</p>
                  </div>
                </div>
                <span className="text-xs bg-emerald-900/10 text-emerald-900 font-semibold px-3 py-1 rounded-full">
                  Audit Aktif
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Metric 1 */}
                <div className="bg-white/80 rounded-2xl p-4 border border-black/5 space-y-1">
                  <span className="text-xs font-medium text-emerald-900/60 uppercase tracking-wide">Estimasi Tagihan</span>
                  <p className="text-2xl font-bold text-emerald-950">Rp 354.498</p>
                  <p className="text-[11px] text-emerald-700 font-medium">~245.2 kWh/bulan</p>
                </div>

                {/* Metric 2 */}
                <div className="bg-white/80 rounded-2xl p-4 border border-black/5 space-y-1">
                  <span className="text-xs font-medium text-emerald-900/60 uppercase tracking-wide">Jumlah Perangkat</span>
                  <p className="text-2xl font-bold text-emerald-950">8 Unit</p>
                  <p className="text-[11px] text-emerald-900/60">Terdaftar di sistem</p>
                </div>

                {/* Metric 3 (Energy Hog Warning) */}
                <div className="bg-red-50/80 rounded-2xl p-4 border border-red-100 space-y-1">
                  <div className="flex items-center gap-1.5 text-red-700 text-xs font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Energy Hog</span>
                  </div>
                  <p className="text-base font-bold text-red-900">AC 1/2 PK</p>
                  <p className="text-[11px] text-red-600 font-medium">44% dari total listrik</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Feature Cards Section (Ref: Sunrock & Solar.Ray Glassmorphism Grid) */}
      <section id="fitur" className="py-20 px-6 md:px-12 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900/5 text-emerald-900 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-emerald-800" />
            <span>Fitur Unggulan</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 tracking-tight">
            Fitur Utama SaveBill
          </h2>
          <p className="text-sm text-emerald-900/70 leading-relaxed">
            Didesain presisi sesuai dengan struktur tarif PLN Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Feature 1 */}
          <div className="glass-card rounded-[2rem] p-7 border border-white/80 space-y-4 hover:shadow-glass-hover transition-all">
            <div className="w-11 h-11 rounded-2xl bg-emerald-900 text-white flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-emerald-950">Prediksi Tagihan PLN</h3>
            <p className="text-sm text-emerald-900/70 leading-relaxed">
              Kalkulasi presisi estimasi tagihan bulanan berdasarkan golongan daya VA Anda dan tarif resmi PLN secara otomatis.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-card rounded-[2rem] p-7 border border-white/80 space-y-4 hover:shadow-glass-hover transition-all">
            <div className="w-11 h-11 rounded-2xl bg-red-600 text-white flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-emerald-950">Deteksi Perangkat Pemboros</h3>
            <p className="text-sm text-emerald-900/70 leading-relaxed">
              Otomatis mengidentifikasi elektronik rumah yang mengonsumsi lebih dari 40% dari total konsumsi listrik Anda.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-card rounded-[2rem] p-7 border border-white/80 space-y-4 hover:shadow-glass-hover transition-all">
            <div className="w-11 h-11 rounded-2xl bg-emerald-900 text-white flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-emerald-950">Simulasi What-If</h3>
            <p className="text-sm text-emerald-900/70 leading-relaxed">
              Geser durasi pemakaian perangkat secara interaktif dan lihat perubahan perkiraan biaya dalam hitungan detik.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="glass-card rounded-[2rem] p-7 border border-white/80 space-y-4 hover:shadow-glass-hover transition-all">
            <div className="w-11 h-11 rounded-2xl bg-emerald-900 text-white flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-emerald-950">Saran Hemat Berbasis AI</h3>
            <p className="text-sm text-emerald-900/70 leading-relaxed">
              Dapatkan analisis dan langkah-langkah hemat energi yang dipersonalisasi dari AI Gemini Flash.
            </p>
          </div>
        </div>
      </section>

      {/* Cara Kerja Section */}
      <section id="cara-kerja" className="py-20 px-6 md:px-12 bg-white/60 border-y border-black/5">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-emerald-950 tracking-tight">
              Tiga Langkah Sederhana
            </h2>
            <p className="text-sm text-emerald-900/70">
              Mulai memantau dan menghemat penggunaan listrik rumah Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="glass-card rounded-[2rem] p-6 text-center space-y-4 border border-white/80">
              <div className="w-9 h-9 rounded-full bg-emerald-900 text-white font-bold text-sm flex items-center justify-center mx-auto">
                1
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-900/10 text-emerald-900 flex items-center justify-center mx-auto">
                <Plug className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-emerald-950 text-base">Daftarkan Perangkat</h3>
              <p className="text-xs text-emerald-900/70 leading-relaxed">
                Pilih dari katalog preset atau masukkan nama, Watt, dan jam pemakaian harian.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-card rounded-[2rem] p-6 text-center space-y-4 border border-white/80">
              <div className="w-9 h-9 rounded-full bg-emerald-900 text-white font-bold text-sm flex items-center justify-center mx-auto">
                2
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-900/10 text-emerald-900 flex items-center justify-center mx-auto">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-emerald-950 text-base">Lihat Analisis Audit</h3>
              <p className="text-xs text-emerald-900/70 leading-relaxed">
                Dashboard otomatis menyajikan breakdown biaya bulanan dan menemukan perangkat boros.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-card rounded-[2rem] p-6 text-center space-y-4 border border-white/80">
              <div className="w-9 h-9 rounded-full bg-emerald-900 text-white font-bold text-sm flex items-center justify-center mx-auto">
                3
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-900/10 text-emerald-900 flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-emerald-950 text-base">Unduh Laporan PDF</h3>
              <p className="text-xs text-emerald-900/70 leading-relaxed">
                Simulasikan penyesuaian jam pakai, dapatkan rekomendasi AI, dan cetak PDF laporan.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link href="/register" className="pill-btn-dark">
              <span>Coba Sekarang — Gratis</span>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 bg-[#F6F7F2] border-t border-black/5 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-900 flex items-center justify-center text-emerald-300">
              <Zap className="w-3.5 h-3.5 fill-emerald-300" />
            </div>
            <span className="text-sm font-bold text-emerald-950">SaveBill Indonesia</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-emerald-900/70">
            <Link href="/login" className="hover:text-emerald-950 transition-colors">Masuk</Link>
            <Link href="/register" className="hover:text-emerald-950 transition-colors">Daftar</Link>
            <a href="#fitur" className="hover:text-emerald-950 transition-colors">Fitur</a>
            <a href="#cara-kerja" className="hover:text-emerald-950 transition-colors">Cara Kerja</a>
          </div>

          <p className="text-xs text-emerald-900/40">© 2026 SaveBill. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
