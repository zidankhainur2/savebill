'use client';

import { BookOpen, Star, Zap, ShieldCheck, CheckCircle2, ArrowUpRight, HelpCircle, Thermometer, Tv, Shirt, Utensils } from 'lucide-react';
import Link from 'next/link';

const APPLIANCE_BENCHMARKS = [
  {
    category: 'Pendingin Ruangan (AC)',
    icon: Thermometer,
    standardWatt: '350 - 800 W',
    skemRating: '5 Bintang (Inverter)',
    tip: 'Atur suhu pada 24°C - 25°C. Setiap penurunan 1°C meningkatkan konsumsi listrik hingga 6-10%. Bersihkan filter setiap 2 minggu.',
  },
  {
    category: 'Lemari Es (Kulkas)',
    icon: Utensils,
    standardWatt: '80 - 150 W',
    skemRating: '4-5 Bintang',
    tip: 'Jangan memasukkan makanan panas langsung. Jaga jarak kulkas minimal 10 cm dari dinding agar sirkulasi kondensor optimal.',
  },
  {
    category: 'TV & Hiburan',
    icon: Tv,
    standardWatt: '40 - 120 W',
    skemRating: '4 Bintang (LED)',
    tip: 'Matikan stop kontak utama (bukan hanya tombol standby remote) saat tidak digunakan untuk menghentikan phantom load.',
  },
  {
    category: 'Mesin Cuci',
    icon: Shirt,
    standardWatt: '300 - 500 W',
    skemRating: '4 Bintang',
    tip: 'Gunakan mode air dingin dan cuci sesuai kapasitas maksimal drum daripada sering mencuci beban kecil.',
  },
];

export default function GuidePage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-medium text-emerald-900/60 uppercase tracking-wider">Panduan & Benchmark ESDM</span>
          <h1 className="text-2xl font-bold text-emerald-950 tracking-tight">Panduan Hemat Energi Rumah</h1>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/10 text-xs font-medium text-emerald-950 shadow-xs">
          <BookOpen className="w-3.5 h-3.5 text-emerald-800" />
          <span>Edisi Indonesia 2026</span>
        </div>
      </div>

      {/* ESDM 1-5 Star Label Explanation */}
      <div className="bg-[#1A3D2F] rounded-3xl p-6 text-white space-y-4 border border-white/10 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-300">
          <ShieldCheck className="w-5 h-5" />
          <h2 className="text-base font-bold">Mengenal Label Hemat Energi SKEM (ESDM Indonesia)</h2>
        </div>

        <p className="text-xs text-white/80 leading-relaxed font-normal">
          Pemerintah Indonesia melalui Kementerian ESDM menerapkan Standar Kinerja Energi Minimum (SKEM) dan Label Tanda Hemat Energi berbentuk 1 hingga 5 bintang pada peralatan elektronik rumah tangga.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
          {[1, 2, 3, 4, 5].map((stars) => (
            <div
              key={stars}
              className={`p-3 rounded-2xl border text-center space-y-1 ${
                stars === 5
                  ? 'bg-emerald-300 text-emerald-950 border-emerald-300 font-bold'
                  : 'bg-white/10 text-white border-white/10'
              }`}
            >
              <div className="flex justify-center gap-0.5">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${stars === 5 ? 'fill-emerald-950 text-emerald-950' : 'fill-amber-400 text-amber-400'}`} />
                ))}
              </div>
              <span className="text-[11px] block font-bold mt-1">{stars} Bintang</span>
              <span className="text-[10px] block opacity-80">
                {stars === 5 ? 'Paling Hemat' : stars >= 3 ? 'Efisiensi Sedang' : 'Standar Minimum'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Appliance Benchmarks & Tips Grid */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
          Benchmark Watt & Tips Optimal per Perangkat
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {APPLIANCE_BENCHMARKS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white rounded-3xl p-5 border border-black/5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#1A3D2F]/10 text-[#1A3D2F] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-emerald-950">{item.category}</h3>
                  </div>
                  <span className="text-[10px] font-bold bg-[#F6F7F2] text-[#1A3D2F] px-2.5 py-1 rounded-full border border-black/5">
                    SKEM: {item.skemRating}
                  </span>
                </div>

                <div className="text-xs space-y-1 bg-[#F6F7F2] p-3 rounded-2xl border border-black/5">
                  <div className="flex justify-between">
                    <span className="text-emerald-900/60 font-medium">Konsumsi Watt Wajar:</span>
                    <span className="font-bold text-emerald-950">{item.standardWatt}</span>
                  </div>
                </div>

                <p className="text-xs text-emerald-900/70 leading-relaxed pt-1">
                  <strong className="text-emerald-950">Tips Hemat: </strong>
                  {item.tip}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Standby Power Awareness Section */}
      <div className="bg-white rounded-3xl p-6 border border-black/5 space-y-4 shadow-xs">
        <h2 className="text-base font-bold text-emerald-950 flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-800" />
          Bahaya Standby Power (Vampire Draw / Phantom Load)
        </h2>

        <p className="text-xs text-emerald-900/70 leading-relaxed">
          Banyak elektronik rumah yang menyedot daya secara terus menerus walaupun dalam posisi diam atau matikan tombol power standar (remote mode).
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-[#F6F7F2] rounded-2xl border border-black/5">
            <span className="text-emerald-900/60 block font-medium">TV Standby</span>
            <span className="text-sm font-bold text-emerald-950 mt-0.5 block">2 - 10 Watt/jam</span>
          </div>
          <div className="p-3 bg-[#F6F7F2] rounded-2xl border border-black/5">
            <span className="text-emerald-900/60 block font-medium">Microwave Plugged</span>
            <span className="text-sm font-bold text-emerald-950 mt-0.5 block">3 - 5 Watt/jam</span>
          </div>
          <div className="p-3 bg-[#F6F7F2] rounded-2xl border border-black/5">
            <span className="text-emerald-900/60 block font-medium">Charger HP Tancap</span>
            <span className="text-sm font-bold text-emerald-950 mt-0.5 block">1 - 3 Watt/jam</span>
          </div>
          <div className="p-3 bg-[#F6F7F2] rounded-2xl border border-black/5">
            <span className="text-emerald-900/60 block font-medium">Decoder/Set Top Box</span>
            <span className="text-sm font-bold text-emerald-950 mt-0.5 block">10 - 20 Watt/jam</span>
          </div>
        </div>
      </div>
    </div>
  );
}
