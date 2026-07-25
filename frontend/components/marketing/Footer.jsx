'use client';

import Link from 'next/link';
import { Zap, ShieldCheck, ArrowUpRight, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/[0.06] text-[#0A0A0A] pt-16 pb-12 px-6 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Column (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1A3D2F] flex items-center justify-center shadow-sm">
                <Zap className="w-4 h-4 text-[#FDFBF7] fill-[#FDFBF7]" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-[#1A3D2F]">SaveBill</span>
            </Link>

            <p className="text-xs text-black/60 font-normal leading-relaxed max-w-sm">
              Platform audit energi dan kalkulator penghematan listrik rumah tangga Indonesia. Didesain presisi sesuai rumus Tarif Dasar Listrik (TDL) resmi PLN &amp; Kementerian ESDM.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A3D2F]/5 border border-[#1A3D2F]/10 text-[10px] font-semibold text-[#1A3D2F]">
                <ShieldCheck className="w-3 h-3 text-[#1A3D2F]" />
                <span>Sesuai Regulasi ESDM 2026</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-semibold text-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>Tarif PLN Synchronized</span>
              </div>
            </div>
          </div>

          {/* Nav Column 1: Produk & Solusi (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] font-bold text-black/40 uppercase tracking-widest block">Produk &amp; Solusi</span>
            <ul className="space-y-2 text-xs font-medium text-black/70">
              <li>
                <Link href="/how-it-works" className="hover:text-[#1A3D2F] transition-colors">Cara Kerja Audit</Link>
              </li>
              <li>
                <Link href="/#fitur" className="hover:text-[#1A3D2F] transition-colors">Deteksi Energy Hog</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#1A3D2F] transition-colors">Pusat Bantuan &amp; FAQ</Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-[#1A3D2F] transition-colors flex items-center gap-1">
                  <span>Mulai Audit Gratis</span>
                  <ArrowUpRight className="w-3 h-3 text-black/40" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Column 2: Perusahaan (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[11px] font-bold text-black/40 uppercase tracking-widest block">Perusahaan</span>
            <ul className="space-y-2 text-xs font-medium text-black/70">
              <li>
                <Link href="/about" className="hover:text-[#1A3D2F] transition-colors">Tentang SaveBill</Link>
              </li>
              <li>
                <a 
                  href="https://www.pln.co.id" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#1A3D2F] transition-colors inline-flex items-center gap-1"
                >
                  <span>Portal PLN Resmi</span>
                  <ExternalLink className="w-3 h-3 text-black/40" />
                </a>
              </li>
              <li>
                <a 
                  href="https://ebtke.esdm.go.id" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#1A3D2F] transition-colors inline-flex items-center gap-1"
                >
                  <span>ESDM SKEM Label</span>
                  <ExternalLink className="w-3 h-3 text-black/40" />
                </a>
              </li>
            </ul>
          </div>

          {/* Nav Column 3: Legal & Privasi (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] font-bold text-black/40 uppercase tracking-widest block">Legal &amp; Privasi</span>
            <ul className="space-y-2 text-xs font-medium text-black/70">
              <li>
                <Link href="/privacy" className="hover:text-[#1A3D2F] transition-colors">Kebijakan Privasi Data</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#1A3D2F] transition-colors">Syarat &amp; Ketentuan</Link>
              </li>
              <li>
                <span className="text-[11px] text-black/40 block leading-relaxed mt-2 font-normal">
                  Data peralatan rumah tangga Anda dienkripsi dan tidak pernah diperjualbelikan kepada pihak ketiga.
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-black/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-black/40 font-medium">
          <div className="flex items-center gap-2">
            <span>© 2026 SaveBill Indonesia. Seluruh hak cipta dilindungi undang-undang.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-black transition-colors">Privasi</Link>
            <Link href="/terms" className="hover:text-black transition-colors">Ketentuan</Link>
            <Link href="/sitemap.xml" className="hover:text-black transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
