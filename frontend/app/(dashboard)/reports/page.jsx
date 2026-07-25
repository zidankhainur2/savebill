'use client';

import { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import { formatRupiah, formatKwh, useUserPowerVa } from '@/lib/utils';
import { Printer, Zap, FileText, Download, Loader2, ArrowUpRight } from 'lucide-react';

export default function ReportsPage() {
  const reportRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const userPowerVa = useUserPowerVa();

  const { data: summary, isLoading: isLoadingSummary } = useQuery({
    queryKey: ['summary', userPowerVa],
    queryFn: () => api.post('/calculate/summary', { power_va: userPowerVa }),
  });

  const { data: aiData } = useQuery({
    queryKey: queryKeys.aiAdvisor(),
    queryFn: () => api.post('/ai/advisor', {}),
    enabled: false,
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    setIsDownloading(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = reportRef.current;
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `Laporan-Audit-Energi-SaveBill-${new Date().toISOString().slice(0, 10)}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('Failed to download PDF:', err);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (isLoadingSummary) {
    return <div className="p-8 text-center text-emerald-900/50">Memuat laporan audit energi...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header Controls (no-print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <span className="text-xs font-medium text-emerald-900/60 uppercase tracking-wider">Cetak & Ekspor Laporan</span>
          <h1 className="text-2xl font-bold text-emerald-950 tracking-tight">Laporan Audit Energi</h1>
        </div>
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="pill-btn-dark !text-xs !py-1.5 disabled:opacity-50"
          >
            {isDownloading ? (
              <>
                <span>Mengunduh...</span>
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Loader2 className="w-3 h-3 animate-spin text-white" />
                </div>
              </>
            ) : (
              <>
                <span>Unduh PDF</span>
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Download className="w-3 h-3 text-white" />
                </div>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/5 text-emerald-900 bg-white hover:bg-white/80 transition-all text-xs font-medium shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak</span>
          </button>
        </div>
      </div>

      {/* Printable / Exportable Area */}
      <div
        ref={reportRef}
        className="glass-card rounded-[2.5rem] p-8 border border-white/80 space-y-6 print:shadow-none print:border-none print:p-0 print:bg-white"
      >
        {/* Document Header */}
        <div className="flex items-center justify-between pb-6 border-b border-black/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-900 text-emerald-300 flex items-center justify-center font-bold shrink-0 print:border print:border-black/10">
              <Zap className="w-5 h-5 fill-emerald-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-emerald-950">SaveBill Energy Audit Report</h2>
              <p className="text-xs text-emerald-900/60">Laporan Analisis Konsumsi Listrik Rumah Tangga</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-emerald-900/50 uppercase">Tanggal Cetak</p>
            <p className="text-sm font-bold text-emerald-950">{currentDate}</p>
          </div>
        </div>

        {/* Summary Metrics Row */}
        {summary && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white/80 rounded-2xl border border-black/5 print:bg-white print:border-gray-200">
            <div>
              <p className="text-xs text-emerald-900/50 uppercase font-medium">Golongan Daya</p>
              <p className="text-lg font-bold text-emerald-950">{summary.power_va} VA</p>
            </div>
            <div>
              <p className="text-xs text-emerald-900/50 uppercase font-medium">Total Konsumsi</p>
              <p className="text-lg font-bold text-emerald-950">{formatKwh(summary.total_kwh_monthly)}/bln</p>
            </div>
            <div>
              <p className="text-xs text-emerald-900/50 uppercase font-medium">Estimasi Tagihan</p>
              <p className="text-lg font-bold text-emerald-900">{formatRupiah(summary.total_cost_monthly)}</p>
            </div>
            <div>
              <p className="text-xs text-emerald-900/50 uppercase font-medium">Energy Hog</p>
              <p className={`text-lg font-bold ${summary.has_energy_hog ? 'text-red-600' : 'text-emerald-700'}`}>
                {summary.has_energy_hog ? summary.energy_hog_name : 'Tidak Ada'}
              </p>
            </div>
          </div>
        )}

        {/* Appliance Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2 uppercase tracking-wider">
            <FileText className="w-4 h-4 text-emerald-800" />
            Rincian Perangkat Listrik
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-black/5 bg-white/50 print:bg-gray-100 text-xs text-emerald-900/70 uppercase">
                  <th className="py-2.5 px-3">Nama Perangkat</th>
                  <th className="py-2.5 px-3">Daya (W)</th>
                  <th className="py-2.5 px-3">Qty</th>
                  <th className="py-2.5 px-3">Jam/Hari</th>
                  <th className="py-2.5 px-3">kWh/Bulan</th>
                  <th className="py-2.5 px-3 text-right">Estimasi Biaya</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {summary?.appliances?.map((app) => (
                  <tr key={app.id || app.name} className="hover:bg-white/40 print:break-inside-avoid text-xs">
                    <td className="py-2.5 px-3 font-semibold text-emerald-950">{app.name}</td>
                    <td className="py-2.5 px-3 text-emerald-900/70">{app.watt} W</td>
                    <td className="py-2.5 px-3 text-emerald-900/70">{app.qty}</td>
                    <td className="py-2.5 px-3 text-emerald-900/70">{app.daily_hours} jam</td>
                    <td className="py-2.5 px-3 text-emerald-900 font-medium">{formatKwh(app.kwh_monthly)}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-950">{formatRupiah(app.cost_monthly)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Recommendations Section if cached */}
        {aiData?.actionable_recommendations && aiData.actionable_recommendations.length > 0 && (
          <div className="pt-4 border-t border-black/5 space-y-3 print:break-inside-avoid">
            <h3 className="text-sm font-bold text-emerald-950 uppercase tracking-wider">Rekomendasi AI Saver</h3>
            <div className="space-y-2">
              {aiData.actionable_recommendations.map((rec, idx) => (
                <div key={idx} className="p-3.5 bg-white/70 rounded-2xl border border-black/5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-emerald-950">{rec.title}</span>
                    <span className="text-xs font-bold text-emerald-900">Potensi: ~{formatRupiah(rec.estimated_monthly_saving_idr)}/bln</span>
                  </div>
                  <p className="text-xs text-emerald-900/70 mt-1 font-normal">{rec.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-6 border-t border-black/5 text-center text-xs text-emerald-900/40 print:pt-4">
          Laporan ini dibuat otomatis oleh SaveBill — savebill.id
        </div>
      </div>
    </div>
  );
}
