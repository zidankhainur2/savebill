'use client';

import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import { ShieldCheck, Lock, EyeOff, Server, Key } from 'lucide-react';

const NoiseOverlay = () => (
  <div 
    className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

export default function PrivacyPage() {
  return (
    <div className="min-h-[100dvh] bg-[#FDFBF7] text-[#0A0A0A] font-sans selection:bg-[#1A3D2F] selection:text-[#FDFBF7] relative">
      <NoiseOverlay />
      <Navbar />

      <section className="pt-36 pb-12 px-6 max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A3D2F]/5 border border-[#1A3D2F]/10 text-xs font-semibold text-[#1A3D2F]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Privasi &amp; Perlindungan Data</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tighter text-[#0A0A0A] leading-tight">
          Kebijakan Privasi <span className="text-[#1A3D2F]">SaveBill.</span>
        </h1>
        <p className="text-xs sm:text-sm text-black/60 font-light max-w-xl mx-auto">
          Terakhir diperbarui: 25 Juli 2026. Kami berkomitmen penuh melindungi data penggunaan energi rumah tangga Anda.
        </p>
      </section>

      {/* Main Content */}
      <section className="py-8 pb-20 px-6 max-w-3xl mx-auto space-y-8">
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-black/[0.05] shadow-sm space-y-8 text-xs sm:text-sm text-black/70 font-light leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-[#0A0A0A] tracking-tight flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#1A3D2F]" />
              <span>1. Prinsip Pengumpulan Data</span>
            </h2>
            <p>
              SaveBill hanya mengumpulkan informasi minimal yang sangat dibutuhkan untuk melakukan audit listrik rumah tangga, yaitu:
            </p>
            <ul className="list-disc pl-5 space-y-1 font-normal text-black/80">
              <li>Informasi akun (Nama lengkap, alamat email, kata sandi terenkripsi).</li>
              <li>Profil golongan daya listrik PLN (misal: 1300 VA).</li>
              <li>Daftar peralatan elektronik rumah tangga beserta daya Watt dan durasi pemakaian yang Anda masukkan secara sukarela.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-[#0A0A0A] tracking-tight flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-[#1A3D2F]" />
              <span>2. Komitmen Tidak Menjual Data</span>
            </h2>
            <p>
              Kami percaya bahwa inventaris peralatan rumah tangga Anda adalah privasi pribadi. SaveBill **TIDAK AKAN PERNAH** menjual, menyewakan, atau membagikan data konsumsi energi Anda kepada penyedia iklan, jaringan брокер data, atau pihak ketiga mana pun.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-[#0A0A0A] tracking-tight flex items-center gap-2">
              <Server className="w-4 h-4 text-[#1A3D2F]" />
              <span>3. Keamanan Penyimpanan Data</span>
            </h2>
            <p>
              Seluruh data tersimpan secara aman di infrastruktur terenkripsi standar industri (Supabase Cloud dengan Enkripsi SSL/TLS 256-bit). Akses ke basis data dibatasi strictly menggunakan Row Level Security (RLS) sehingga hanya Anda yang dapat mengakses data akun Anda sendiri.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-[#0A0A0A] tracking-tight flex items-center gap-2">
              <Key className="w-4 h-4 text-[#1A3D2F]" />
              <span>4. Hak Pengguna (Kontrol Data)</span>
            </h2>
            <p>
              Sebagai pengguna SaveBill, Anda memiliki hak penuh untuk:
            </p>
            <ul className="list-disc pl-5 space-y-1 font-normal text-black/80">
              <li>Mengubah atau memperbarui data peralatan rumah kapan saja di dashboard.</li>
              <li>Mengunduh riwayat laporan audit dalam format PDF.</li>
              <li>Menghapus seluruh riwayat akun dan peralatan rumah Anda secara permanen dari server kami melalui menu Pengaturan.</li>
            </ul>
          </div>

          <div className="space-y-3 pt-4 border-t border-black/[0.04]">
            <h2 className="text-lg font-semibold text-[#0A0A0A] tracking-tight">5. Kontak Pertanyaan Privasi</h2>
            <p>
              Jika Anda memiliki pertanyaan seputar Kebijakan Privasi ini, Anda dapat menghubungi tim kami melalui email di <span className="font-semibold text-[#1A3D2F]">support@savebill.id</span>.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
