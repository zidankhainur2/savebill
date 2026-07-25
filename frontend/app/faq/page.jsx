'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import { Zap, ChevronDown, ArrowRight, HelpCircle, Search } from 'lucide-react';

const EASE_OUT = [0.23, 1, 0.32, 1];

const NoiseOverlay = () => (
  <div 
    className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');

  const faqData = [
    {
      cat: 'Umum',
      q: 'Apakah SaveBill sepenuhnya gratis?',
      a: 'Ya, fitur inti SaveBill seperti audit energi rumah tangga, kalkulasi tagihan bulanan, deteksi Energy Hog, simulasi what-if, dan ekspor laporan PDF dapat digunakan 100% secara gratis tanpa biaya tersembunyi.',
    },
    {
      cat: 'Umum',
      q: 'Apakah saya perlu menginstal alat fisik di meteran listrik?',
      a: 'Tidak perlu sama sekali. SaveBill didesain secara digital tanpa perlu alat IoT atau pembongkaran meteran. Anda cukup memasukkan daftar peralatan listrik di rumah beserta estimasi jam pemakaian.',
    },
    {
      cat: 'Tarif PLN',
      q: 'Apakah kalkulasi SaveBill menggunakan tarif resmi PLN?',
      a: 'Ya, kalkulasi SaveBill mengacu pada Tarif Dasar Listrik (TDL) resmi dari Kementerian ESDM dan PLN Indonesia per kWh sesuai dengan golongan daya (900 VA, 1300 VA, 2200 VA, 3500 VA, 5500 VA, hingga B-1 Bisnis Kecil).',
    },
    {
      cat: 'Tarif PLN',
      q: 'Bagaimana jika tarif listrik PLN mengalami penyesuaian (tariff adjustment)?',
      a: 'Tim SaveBill secara rutin memperbarui matriks tarif di sistem agar kalkulasi yang Anda terima selalu akurat sesuai aturan pemerintah terbaru.',
    },
    {
      cat: 'Perangkat & Daya',
      q: 'Bagaimana jika saya tidak tahu Watt dari peralatan di rumah saya?',
      a: 'SaveBill menyediakan katalog preset berisi rata-rata daya Watt standar peralatan rumah tangga di Indonesia (seperti AC 1/2 PK = 400W, Kulkas 1 Pintu = 120W, TV LED 43" = 75W, dll). Anda tinggal memilihnya dari daftar.',
    },
    {
      cat: 'Perangkat & Daya',
      q: 'Apa yang dimaksud dengan status "Energy Hog"?',
      a: 'Energy Hog adalah label peringatan otomatis dari sistem untuk peralatan elektronik yang mengonsumsi lebih dari 40% dari total tagihan bulanan rumah Anda. Ini membantu Anda fokus menghemat pada alat yang paling berdampak.',
    },
    {
      cat: 'Keamanan',
      q: 'Apakah data peralatan rumah saya aman?',
      a: 'Sangat aman. SaveBill menerapkan enkripsi standar industri dan prinsip minimasi data. Data Anda tidak pernah diperjualbelikan kepada pihak ketiga atau penyedia iklan.',
    },
    {
      cat: 'Keamanan',
      q: 'Apakah laporan audit bisa diunduh ke format PDF?',
      a: 'Tentu saja. Setelah menambahkan peralatan rumah di dashboard, Anda dapat mengunduh atau mencetak laporan audit berformat PDF resmi dengan 1 klik.',
    },
  ];

  const categories = ['Semua', 'Umum', 'Tarif PLN', 'Perangkat & Daya', 'Keamanan'];

  const filteredFaqs = faqData.filter((item) => {
    const matchesCat = activeCategory === 'Semua' || item.cat === activeCategory;
    const matchesSearch =
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-[100dvh] bg-[#FDFBF7] text-[#0A0A0A] font-sans selection:bg-[#1A3D2F] selection:text-[#FDFBF7] relative">
      <NoiseOverlay />
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-12 px-6 max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A3D2F]/5 border border-[#1A3D2F]/10 text-xs font-semibold text-[#1A3D2F]">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Pusat Bantuan SaveBill</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tighter text-[#0A0A0A] leading-tight">
          Pertanyaan yang Sering <span className="text-[#1A3D2F]">Diajukan (FAQ).</span>
        </h1>
        <p className="text-sm sm:text-base text-black/60 font-light max-w-xl mx-auto leading-relaxed">
          Temukan jawaban cepat seputar cara perhitungan tarif PLN, keamanan data, dan tips efisiensi energi.
        </p>

        {/* Search Input */}
        <div className="pt-4 max-w-md mx-auto relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-black/40 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pertanyaan (misal: PLN, Watt, PDF)..."
              className="w-full pl-11 pr-4 py-3 rounded-full border border-black/10 bg-white text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#1A3D2F] shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="pt-4 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
                activeCategory === cat
                  ? 'bg-[#1A3D2F] text-white shadow-sm'
                  : 'bg-white text-black/60 border border-black/5 hover:bg-black/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ Accordion List */}
      <section className="py-8 pb-20 px-6 max-w-3xl mx-auto">
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-black/5 p-8 text-black/40 text-xs font-medium">
              Tidak ada pertanyaan yang cocok dengan pencarian Anda.
            </div>
          ) : (
            filteredFaqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-black/[0.02] p-1.5 rounded-2xl ring-1 ring-black/[0.04]"
                >
                  <div className="bg-white rounded-[calc(1rem-0.25rem)] border border-black/[0.03] shadow-sm overflow-hidden transition-all">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-[#0A0A0A] hover:bg-black/[0.01] transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A3D2F] bg-[#1A3D2F]/5 px-2 py-0.5 rounded">
                          {item.cat}
                        </span>
                        <span>{item.q}</span>
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2, ease: EASE_OUT }}
                      >
                        <ChevronDown className="w-4 h-4 text-[#1A3D2F] shrink-0" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: EASE_OUT }}
                          className="px-5 pb-5 pt-1 text-xs sm:text-sm text-black/60 leading-relaxed font-light border-t border-black/[0.04]"
                        >
                          {item.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center space-y-6">
        <div className="bg-[#1A3D2F] text-white rounded-[3rem] p-8 sm:p-12 shadow-sm space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Punya Pertanyaan Lain yang Belum Terjawab?
          </h2>
          <p className="text-xs sm:text-sm text-white/70 font-light max-w-md mx-auto">
            Tim SaveBill siap membantu Anda mengoptimalkan pemakaian listrik rumah tangga Anda.
          </p>
          <div className="pt-2">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-[#1A3D2F] font-semibold text-xs py-3 px-6 rounded-full shadow-sm hover:bg-emerald-50 transition-colors active:scale-95"
            >
              <span>Mulai Audit Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
