'use client';

import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import { FileText, CheckCircle2, AlertCircle } from 'lucide-react';

const NoiseOverlay = () => (
  <div 
    className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

export default function TermsPage() {
  return (
    <div className="min-h-[100dvh] bg-[#FDFBF7] text-[#0A0A0A] font-sans selection:bg-[#1A3D2F] selection:text-[#FDFBF7] relative">
      <NoiseOverlay />
      <Navbar />

      <section className="pt-36 pb-12 px-6 max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A3D2F]/5 border border-[#1A3D2F]/10 text-xs font-semibold text-[#1A3D2F]">
          <FileText className="w-3.5 h-3.5" />
          <span>Aturan &amp; Ketentuan Layanan</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tighter text-[#0A0A0A] leading-tight">
          Syarat &amp; Ketentuan <span className="text-[#1A3D2F]">SaveBill.</span>
        </h1>
        <p className="text-xs sm:text-sm text-black/60 font-light max-w-xl mx-auto">
          Terakhir diperbarui: 25 Juli 2026. Harap membaca ketentuan layanan ini sebelum menggunakan aplikasi SaveBill.
        </p>
      </section>

      {/* Main Content */}
      <section className="py-8 pb-20 px-6 max-w-3xl mx-auto space-y-8">
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-black/[0.05] shadow-sm space-y-8 text-xs sm:text-sm text-black/70 font-light leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-[#0A0A0A] tracking-tight flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1A3D2F]" />
              <span>1. Penerimaan Ketentuan</span>
            </h2>
            <p>
              Dengan mendaftar atau menggunakan platform SaveBill, Anda menyatakan telah membaca, memahami, dan menyetujui seluruh Syarat &amp; Ketentuan ini. Jika Anda tidak menyetujui bagian mana pun, harap menghentikan penggunaan layanan.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-[#0A0A0A] tracking-tight flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#1A3D2F]" />
              <span>2. Sifat Estimasi Perhitungan</span>
            </h2>
            <p>
              SaveBill menyediakan kalkulasi berdasarkan rumus Tarif Dasar Listrik (TDL) resmi PLN per kWh. Hasil audit yang ditampilkan bersifat **estimasi presisi berbasis input daya dan durasi yang dimasukkan oleh pengguna**. 
            </p>
            <p className="text-xs text-black/60 italic">
              Tagihan akhir resmi PLN tetap mengacu pada pencatatan fisik meteran listrik (kWh meter) oleh petugas PLN resmi.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-[#0A0A0A] tracking-tight flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1A3D2F]" />
              <span>3. Akun dan Tanggung Jawab Pengguna</span>
            </h2>
            <p>
              Anda bertanggung jawab penuh untuk menjaga kerahasiaan kata sandi akun Anda. SaveBill tidak bertanggung jawab atas kerugian akibat akses tidak sah yang disebabkan oleh kelalaian pengguna dalam menjaga kredensial login.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-[#0A0A0A] tracking-tight flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1A3D2F]" />
              <span>4. Hak Kekayaan Intelektual</span>
            </h2>
            <p>
              Seluruh antarmuka, logo, desain visual, algoritma kalkulasi, dan konten pada platform SaveBill adalah hak cipta milik SaveBill Indonesia. Dilarang menggandakan, menyalin, atau mendistribusikan ulang tanpa izin tertulis.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-black/[0.04]">
            <h2 className="text-lg font-semibold text-[#0A0A0A] tracking-tight">5. Perubahan Ketentuan</h2>
            <p>
              SaveBill berhak memperbarui Syarat &amp; Ketentuan ini sewaktu-waktu. Perubahan signifikan akan diinformasikan melalui situs web atau pemberitahuan email.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
