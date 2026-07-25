'use client';

import Link from 'next/link';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import { Zap, ArrowRight, Sliders, Calculator, AlertTriangle, FileText, CheckCircle } from 'lucide-react';

const NoiseOverlay = () => (
  <div 
    className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Masukkan Perangkat Listrik Rumah',
      desc: 'Pilih perangkat elektronik dari katalog preset populer (AC, Kulkas, TV, Pompa Air, Mesin Cuci) atau masukkan daya Watt kustom beserta estimasi jam pemakaian harian Anda.',
      badge: 'Preset Catalog & Custom Watt',
      icon: Zap,
    },
    {
      num: '02',
      title: 'Kalkulasi Otomatis dengan Tarif TDL PLN',
      desc: 'SaveBill menghitung total konsumsi kWh bulanan menggunakan rumus resmi: (Watt × Jumlah × Jam Pakai / 1000) × 30 Hari, kemudian mengalikannya dengan Tarif Dasar Listrik sesuai golongan VA Anda.',
      badge: 'Rumus Resmi TDL ESDM',
      icon: Calculator,
    },
    {
      num: '03',
      title: 'Deteksi Otomatis "Energy Hog"',
      desc: 'Algoritma cerdas SaveBill memetakan proporsi beban listrik. Jika ada 1 peralatan yang mengonsumsi lebih dari 40% total tagihan bulanan, sistem akan langsung memberikan notifikasi peringatan.',
      badge: 'Deteksi Beban >40%',
      icon: AlertTriangle,
    },
    {
      num: '04',
      title: 'Simulasikan Skenario "What-If"',
      desc: 'Gunakan fitur simulator interaktif untuk mencoba berbagai penyesuaian. Geser slider jam pemakaian AC dari 10 jam ke 7 jam dan lihat langsung berapa rupiah potensi penghematan bulanan Anda.',
      badge: 'Interactive Slider Simulation',
      icon: Sliders,
    },
    {
      num: '05',
      title: 'Unduh Laporan Audit PDF Resmi',
      desc: 'Cetak atau simpan laporan hasil audit energi rumah tangga Anda ke dalam format PDF yang rapi untuk dievaluasi bersama keluarga atau penyewa properti Anda.',
      badge: 'PDF Ready to Export',
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-[100dvh] bg-[#FDFBF7] text-[#0A0A0A] font-sans selection:bg-[#1A3D2F] selection:text-[#FDFBF7] relative">
      <NoiseOverlay />
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-16 px-6 max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A3D2F]/5 border border-[#1A3D2F]/10 text-xs font-semibold text-[#1A3D2F]">
          <Zap className="w-3.5 h-3.5" />
          <span>Workflow Sederhana &amp; Transparan</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tighter text-[#0A0A0A] leading-tight">
          Bagaimana Cara Kerja <span className="text-[#1A3D2F]">SaveBill?</span>
        </h1>
        <p className="text-sm sm:text-base text-black/60 font-light max-w-xl mx-auto leading-relaxed">
          5 langkah praktis untuk memetakan konsumsi energi rumah tangga dan menekan tagihan listrik bulanan Anda.
        </p>
      </section>

      {/* Steps List */}
      <section className="py-12 px-6 max-w-4xl mx-auto space-y-8">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="bg-black/[0.02] p-2 rounded-[2.5rem] ring-1 ring-black/[0.04]"
            >
              <div className="bg-white rounded-[calc(2.5rem-0.5rem)] p-8 sm:p-10 border border-black/[0.03] shadow-sm flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-14 h-14 rounded-2xl bg-[#1A3D2F] text-white flex items-center justify-center font-semibold text-lg shrink-0 shadow-sm">
                  {step.num}
                </div>
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl font-semibold text-[#0A0A0A] tracking-tight">{step.title}</h3>
                    <span className="px-3 py-1 rounded-full bg-black/5 text-[10px] font-semibold text-black/60 uppercase tracking-wider">
                      {step.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-black/60 font-normal leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Formula Transparency Card */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="bg-[#1A3D2F] text-white rounded-[3rem] p-8 sm:p-12 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-emerald-300">
            <CheckCircle className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider">Transparansi Rumus Perhitungan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Rumus Resmi Tarif Dasar Listrik (TDL) PLN
          </h2>
          <div className="bg-white/10 rounded-2xl p-6 border border-white/10 space-y-3 text-xs font-mono">
            <p className="text-emerald-200 font-bold">1. Konsumsi Harian (kWh) = (Watt × Jumlah Unit × Jam Pakai) / 1000</p>
            <p className="text-emerald-200 font-bold">2. Konsumsi Bulanan (kWh) = Konsumsi Harian × 30 Hari</p>
            <p className="text-emerald-200 font-bold">3. Estimasi Biaya (Rp) = Total kWh Bulanan × Tarif PLN Per Golongan VA</p>
          </div>
          <p className="text-xs text-white/70 font-light leading-relaxed">
            Metode ini memastikan kalkulasi SaveBill 100% konsisten dengan lembar tagihan resmi yang diterbitkan PLN setiap bulan.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-semibold text-[#0A0A0A] tracking-tight">
          Mulai Audit Pertama Anda Sekarang
        </h2>
        <p className="text-xs sm:text-sm text-black/60">
          Prosesnya cepat, gratis, dan dapat diselesaikan dalam waktu kurang dari 5 menit.
        </p>
        <div>
          <Link
            href="/register"
            className="inline-flex items-center gap-3 bg-[#1A3D2F] text-white font-medium text-sm py-3.5 px-8 rounded-full shadow-sm hover:bg-[#0F261D] transition-colors active:scale-[0.98]"
          >
            <span>Daftar &amp; Mulai Audit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
