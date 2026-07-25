'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import {
  Zap,
  ArrowRight,
  Calculator,
  AlertTriangle,
  Sliders,
  Home,
  Thermometer,
  Utensils
} from 'lucide-react';

const EASE_OUT = [0.23, 1, 0.32, 1];

// Noise overlay for Editorial Luxury vibe
const NoiseOverlay = () => (
  <div 
    className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

export default function LandingPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeRoom, setActiveRoom] = useState('kamar');

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
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="flex items-center gap-3 bg-white px-8 py-4 rounded-full border border-black/5 shadow-sm text-sm font-medium text-[#1A3D2F]"
        >
          <Zap className="w-5 h-5 animate-pulse" />
          <span>Memuat SaveBill...</span>
        </motion.div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1, ease: EASE_OUT }
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#FDFBF7] text-[#0A0A0A] font-sans selection:bg-[#1A3D2F] selection:text-[#FDFBF7] overflow-x-hidden relative">
      <NoiseOverlay />
      <Navbar />

      {/* 2. Hero Section: Editorial Split / Double-Bezel */}
      <section className="min-h-[100dvh] pt-32 pb-24 px-4 flex items-center justify-center">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          <motion.div 
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="flex flex-col justify-center max-w-2xl"
          >
            <motion.div variants={itemVariants} className="mb-8 inline-flex">
              <div className="rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium bg-[#1A3D2F]/5 text-[#1A3D2F] ring-1 ring-[#1A3D2F]/10">
                Audit Energi Rumah Tangga
              </div>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-[3rem] leading-[1.05] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] font-medium tracking-tighter text-[#0A0A0A]">
              Kendalikan <br/>
              <span className="text-[#1A3D2F]">Listrik Anda.</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="mt-8 text-lg md:text-xl text-black/60 font-light leading-relaxed max-w-lg">
              Identifikasi perangkat penyedot energi, simulasikan penghematan, dan tekan tagihan bulanan dengan akurasi tarif PLN resmi.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-12 flex flex-col sm:flex-row items-center gap-4">
              <Link href="/register" className="w-full sm:w-auto group active:scale-[0.98] transition-transform duration-300">
                <div className="bg-[#1A3D2F] rounded-full p-2 pl-8 flex items-center justify-between gap-8 shadow-[0_10px_40px_rgba(26,61,47,0.2)]">
                  <span className="text-white font-medium">Mulai Audit Gratis</span>
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 group-hover:-translate-y-[1px] transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Interactive Editorial Blueprint Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.4 }}
            className="w-full relative"
          >
            {/* Double Bezel Outer Shell */}
            <div className="bg-black/[0.02] p-2 sm:p-3 rounded-[2.5rem] ring-1 ring-black/[0.04]">
              {/* Inner Core */}
              <div className="bg-white rounded-[calc(2.5rem-0.5rem)] sm:rounded-[calc(2.5rem-0.75rem)] shadow-sm p-6 sm:p-10 border border-black/[0.04] relative overflow-hidden">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-black/[0.04]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1A3D2F]/5 flex items-center justify-center">
                      <Home className="w-4 h-4 text-[#1A3D2F]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#0A0A0A]">Floorplan Load</h3>
                      <p className="text-[10px] uppercase tracking-widest text-black/40">Real-time mapping</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                    Hog Detected
                  </div>
                </div>

                {/* Rooms Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Room 1: AC Hog */}
                  <motion.div 
                    onClick={() => setActiveRoom('kamar')}
                    className={`cursor-pointer rounded-[1.5rem] p-5 transition-all duration-500 ${activeRoom === 'kamar' ? 'bg-[#FDFBF7] ring-1 ring-red-200' : 'bg-transparent hover:bg-black/[0.02]'}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Thermometer className={`w-5 h-5 ${activeRoom === 'kamar' ? 'text-red-500' : 'text-black/40'}`} />
                      <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-md">44%</span>
                    </div>
                    <h4 className="text-sm font-medium text-[#0A0A0A] mb-1">Kamar Utama</h4>
                    <p className="text-[11px] text-black/40 mb-3">AC 1/2 PK (400W) · 10 Jam</p>
                    <div className="h-1 w-full bg-black/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '80%' }}
                        transition={{ duration: 1, delay: 0.5, ease: EASE_OUT }}
                        className="h-full bg-red-500 rounded-full"
                      />
                    </div>
                  </motion.div>

                  {/* Room 2 */}
                  <motion.div 
                    onClick={() => setActiveRoom('dapur')}
                    className={`cursor-pointer rounded-[1.5rem] p-5 transition-all duration-500 ${activeRoom === 'dapur' ? 'bg-[#FDFBF7] ring-1 ring-[#1A3D2F]/20' : 'bg-transparent hover:bg-black/[0.02]'}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Utensils className={`w-5 h-5 ${activeRoom === 'dapur' ? 'text-[#1A3D2F]' : 'text-black/40'}`} />
                      <span className="text-xs font-semibold text-[#1A3D2F] bg-[#1A3D2F]/5 px-2 py-1 rounded-md">22%</span>
                    </div>
                    <h4 className="text-sm font-medium text-[#0A0A0A] mb-1">Dapur & Makan</h4>
                    <p className="text-[11px] text-black/40 mb-3">Kulkas (120W) · 24 Jam</p>
                    <div className="h-1 w-full bg-black/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '40%' }}
                        transition={{ duration: 1, delay: 0.6, ease: EASE_OUT }}
                        className="h-full bg-[#1A3D2F] rounded-full"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Total Meter Card */}
                <div className="mt-8 bg-[#1A3D2F] rounded-[1.5rem] p-6 text-white overflow-hidden relative">
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                  <div className="relative z-10 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/60 mb-2">Estimasi Tagihan</p>
                      <h2 className="text-3xl font-medium tracking-tighter">Rp 354.498</h2>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-white/10 px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase text-white/90">
                        1300 VA
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. The Asymmetrical Bento Grid: Features */}
      <section id="fitur" className="py-32 px-4 bg-white relative rounded-[3rem] sm:rounded-[5rem] -mt-10 ring-1 ring-black/[0.02] shadow-sm z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="mb-20 max-w-2xl"
          >
            <div className="rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium bg-black/5 text-black inline-block mb-6">
              Arsitektur Fitur
            </div>
            <h2 className="text-[2.5rem] md:text-[3.5rem] font-medium tracking-tighter leading-[1.1] text-[#0A0A0A]">
              Didesain untuk kejelasan absolute.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            
            {/* Massive Card (col-8) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              className="md:col-span-8 bg-[#FDFBF7] p-2 rounded-[2.5rem] ring-1 ring-black/[0.04]"
            >
              <div className="bg-white rounded-[calc(2.5rem-0.5rem)] h-full p-8 md:p-12 border border-black/[0.02] flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#1A3D2F]/5 flex items-center justify-center mb-8">
                    <Calculator className="w-5 h-5 text-[#1A3D2F]" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">Akurasi Tarif Resmi PLN</h3>
                  <p className="text-black/50 leading-relaxed max-w-md font-light text-lg">
                    Algoritma menghitung berdasarkan struktur tarif dasar listrik kementerian ESDM untuk golongan 900 VA hingga 5500+ VA secara presisi.
                  </p>
                </div>
                <div className="mt-12 flex gap-4 text-xs font-semibold uppercase tracking-widest text-black/30">
                  <span>R-1 (Subsidi)</span>
                  <span>R-1 (Reguler)</span>
                  <span>B-1 (Bisnis)</span>
                </div>
              </div>
            </motion.div>

            {/* Stacked Cards (col-4) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
              className="md:col-span-4 flex flex-col gap-4 md:gap-6"
            >
              <div className="flex-1 bg-black/[0.02] p-2 rounded-[2.5rem] ring-1 ring-black/[0.04]">
                <div className="bg-white rounded-[calc(2.5rem-0.5rem)] h-full p-8 border border-black/[0.02]">
                  <AlertTriangle className="w-5 h-5 text-red-500 mb-6" />
                  <h3 className="text-xl font-medium tracking-tight mb-3">Deteksi Energy Hog</h3>
                  <p className="text-black/50 font-light text-sm leading-relaxed">
                    Sistem mengidentifikasi alat elektronik yang memakan porsi dominan dari total biaya secara otomatis.
                  </p>
                </div>
              </div>
              <div className="flex-1 bg-[#1A3D2F] p-2 rounded-[2.5rem]">
                <div className="bg-[#153025] rounded-[calc(2.5rem-0.5rem)] h-full p-8 flex flex-col justify-between">
                  <Sliders className="w-5 h-5 text-white/50 mb-6" />
                  <div>
                    <h3 className="text-xl font-medium text-white tracking-tight mb-3">Simulasi Interaktif</h3>
                    <p className="text-white/60 font-light text-sm leading-relaxed">
                      Ubah jam operasional perangkat dan lihat dampak finansialnya secara real-time.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Large CTA / Manifesto */}
      <section className="py-40 px-4 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE_OUT }}
          >
            <h2 className="text-[3rem] md:text-[4.5rem] font-medium tracking-tighter leading-[1.05] text-[#0A0A0A] mb-12">
              Berhenti menebak-nebak. <br/>
              Mulai kendalikan <span className="text-[#1A3D2F]">anggaran Anda.</span>
            </h2>
            
            <Link href="/register" className="inline-block group active:scale-[0.98] transition-transform duration-300">
              <div className="bg-[#0A0A0A] rounded-full p-2 pl-10 flex items-center justify-between gap-10 hover:bg-[#1A3D2F] transition-colors duration-500">
                <span className="text-white font-medium text-lg">Buat Akun Gratis</span>
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 group-hover:-translate-y-[1px] transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 5. Rich Footer */}
      <Footer />
    </div>
  );
}
