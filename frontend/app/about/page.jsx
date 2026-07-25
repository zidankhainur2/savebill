'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import { ShieldCheck, Zap, Users, Target, ArrowRight, Award, CheckCircle2 } from 'lucide-react';

const EASE_OUT = [0.23, 1, 0.32, 1];

const NoiseOverlay = () => (
  <div 
    className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

export default function AboutPage() {
  return (
    <div className="min-h-[100dvh] bg-[#FDFBF7] text-[#0A0A0A] font-sans selection:bg-[#1A3D2F] selection:text-[#FDFBF7] relative">
      <NoiseOverlay />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 max-w-5xl mx-auto text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A3D2F]/5 border border-[#1A3D2F]/10 text-xs font-semibold text-[#1A3D2F]"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Misi Efisiensi Energi Indonesia</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE_OUT }}
          className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tighter text-[#0A0A0A] leading-[1.08] max-w-3xl mx-auto"
        >
          Membantu Keluarga Indonesia Mengendalikan <span className="text-[#1A3D2F]">Tagihan Listrik.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT }}
          className="text-base sm:text-lg text-black/60 font-light leading-relaxed max-w-2xl mx-auto"
        >
          SaveBill lahir dari realita bahwa sebagian besar keluarga Indonesia mengalami lonjakan tagihan listrik tanpa tahu perangkat mana yang menyedot energi paling besar.
        </motion.p>
      </section>

      {/* Values Bento Grid */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-black/[0.02] p-2 rounded-[2.5rem] ring-1 ring-black/[0.04]">
            <div className="bg-white rounded-[calc(2.5rem-0.5rem)] p-8 border border-black/[0.03] shadow-sm space-y-4 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#1A3D2F]/10 flex items-center justify-center text-[#1A3D2F] mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-[#0A0A0A] tracking-tight">Presisi Data TDL</h3>
                <p className="text-xs text-black/60 font-normal leading-relaxed mt-2">
                  Kalkulasi SaveBill tidak menggunakan angka acak. Semua rumus disesuaikan secara langsung dengan rumus Tarif Dasar Listrik (TDL) resmi dari Kementerian ESDM &amp; PLN Indonesia.
                </p>
              </div>
              <div className="pt-4 border-t border-black/[0.04] text-[11px] font-semibold text-[#1A3D2F] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Golongan 900 VA – 5500+ VA</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-black/[0.02] p-2 rounded-[2.5rem] ring-1 ring-black/[0.04]">
            <div className="bg-white rounded-[calc(2.5rem-0.5rem)] p-8 border border-black/[0.03] shadow-sm space-y-4 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#1A3D2F]/10 flex items-center justify-center text-[#1A3D2F] mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-[#0A0A0A] tracking-tight">Tanpa Alat Tambahan</h3>
                <p className="text-xs text-black/60 font-normal leading-relaxed mt-2">
                  Anda tidak perlu membeli sensor IoT mahal atau membongkar meteran listrik. Cukup input peralatan elektronik rumah Anda dan kami yang menghitung auditnya secara digital.
                </p>
              </div>
              <div className="pt-4 border-t border-black/[0.04] text-[11px] font-semibold text-[#1A3D2F] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Berbasis Web &amp; Browser</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-black/[0.02] p-2 rounded-[2.5rem] ring-1 ring-black/[0.04]">
            <div className="bg-white rounded-[calc(2.5rem-0.5rem)] p-8 border border-black/[0.03] shadow-sm space-y-4 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#1A3D2F]/10 flex items-center justify-center text-[#1A3D2F] mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-[#0A0A0A] tracking-tight">Privasi Utuh</h3>
                <p className="text-xs text-black/60 font-normal leading-relaxed mt-2">
                  Data inventaris rumah tangga Anda adalah privasi milik Anda. Kami menerapkan prinsip minimasi data dan enkripsi ketat agar data Anda tetap aman.
                </p>
              </div>
              <div className="pt-4 border-t border-black/[0.04] text-[11px] font-semibold text-[#1A3D2F] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Tidak Dijual ke Pihak Ketiga</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Story & Vision Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-[3rem] p-8 sm:p-12 border border-black/[0.05] shadow-sm space-y-6">
          <span className="text-xs font-bold text-[#1A3D2F] uppercase tracking-wider">Latar Belakang Proyek</span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A0A0A] tracking-tight leading-snug">
            "Berapa rupiah sebenarnya yang kita bayar untuk AC 1/2 PK atau Kulkas yang menyala 24 jam?"
          </h2>
          <p className="text-sm text-black/70 leading-relaxed font-light">
            Pertanyaan sederhana ini menjadi alasan utama dibentuknya SaveBill. Di Indonesia, meteran PLN hanya mencatat angka akumulasi kWh total tanpa perincian per perangkat. Akibatnya, pemilik rumah sering berasumsi acak saat mencoba menghemat listrik — seperti mematikan lampu kecil yang sebenarnya hanya mengonsumsi 5 Watt, padahal AC tua atau pompa air bocor menyedot energi ratusan kali lipat lebih banyak.
          </p>
          <p className="text-sm text-black/70 leading-relaxed font-light">
            Dengan SaveBill, pengguna dapat melakukan **Audit Energi Mandiri** dalam waktu kurang dari 5 menit, menemukan *Energy Hog* (perangkat penyedot energi utama &gt;40%), dan mensimulasikan dampak penghematan sebelum tagihan resmi PLN diterbitkan di akhir bulan.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#0A0A0A] tracking-tight">
          Siap Mulai Mengaudit Listrik Rumah Anda?
        </h2>
        <p className="text-xs sm:text-sm text-black/60 max-w-lg mx-auto">
          Gratis. Tanpa instalasi alat fisik. Cukup daftarkan peralatan rumah tangga Anda sekarang.
        </p>
        <div>
          <Link
            href="/register"
            className="inline-flex items-center gap-3 bg-[#1A3D2F] text-white font-medium text-sm py-3.5 px-8 rounded-full shadow-sm hover:bg-[#0F261D] transition-colors active:scale-[0.98]"
          >
            <span>Mulai Audit Gratis</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
