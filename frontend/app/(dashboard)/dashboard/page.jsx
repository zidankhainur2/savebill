'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import { formatRupiah, formatKwh, useUserPowerVa } from '@/lib/utils';
import MetricCard from '@/components/dashboard/MetricCard';
import EnergyHogBanner from '@/components/dashboard/EnergyHogBanner';
import CategoryPieChart from '@/components/charts/CategoryPieChart';
import CostBarChart from '@/components/charts/CostBarChart';
import { Zap, DollarSign, Plug, AlertTriangle } from 'lucide-react';

export default function DashboardPage() {
  const userPowerVa = useUserPowerVa();

  const { data: summary, isLoading, isError } = useQuery({
    queryKey: ['summary', userPowerVa],
    queryFn: () => api.post('/calculate/summary', { power_va: userPowerVa }),
  });

  const currentMonth = new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-6 w-40 bg-black/5 rounded-full animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[120px] bg-black/5 rounded-[1.5rem] animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-[300px] bg-black/5 rounded-[1.5rem] animate-pulse" />
          <div className="h-[300px] bg-black/5 rounded-[1.5rem] animate-pulse" />
        </div>
      </div>
    );
  }

  if (isError || !summary) {
    return (
      <div className="bg-red-50 p-4 rounded-2xl border border-red-100 text-red-600 text-[13px] font-medium text-center shadow-sm">
        Gagal memuat rangkuman energi. Pastikan server backend berjalan.
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-end justify-between mb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A0A0A] tracking-tighter">Rangkuman {currentMonth}</h1>
          <p className="text-[13px] font-medium text-black/50 mt-1">Pantau dan kelola penggunaan energi Anda secara real-time.</p>
        </div>
        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.03] border border-black/[0.06] shadow-sm">
          <Zap className="w-3.5 h-3.5 text-[#1A3D2F]" />
          <span className="text-[11px] font-bold text-black/60 tracking-wider">DAYA {summary.power_va} VA</span>
        </div>
      </div>

      {summary.has_energy_hog && (
        <EnergyHogBanner applianceName={summary.energy_hog_name} />
      )}

      {/* Bento Grid: Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Estimasi Tagihan"
          value={formatRupiah(summary.total_cost_monthly)}
          subtitle={`Tarif Rp ${summary.tariff_per_kwh}/kWh`}
          icon={DollarSign}
          highlight
        />
        <MetricCard
          label="Total Energi"
          value={formatKwh(summary.total_kwh_monthly)}
          subtitle="Konsumsi per bulan"
          icon={Zap}
        />
        <MetricCard
          label="Perangkat"
          value={`${summary.appliance_count} Unit`}
          subtitle="Aktif digunakan"
          icon={Plug}
        />
        <MetricCard
          label="Status Efisiensi"
          value={summary.has_energy_hog ? 'Waspada' : 'Optimal'}
          subtitle={summary.has_energy_hog ? 'Hog terdeteksi' : 'Distribusi sehat'}
          icon={AlertTriangle}
          valueColor={summary.has_energy_hog ? 'text-red-500' : 'text-[#1A3D2F]'}
        />
      </div>

      {/* Bento Grid: Charts (Wrapped in Double-Bezel) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        <div className="bg-black/[0.02] p-1.5 rounded-[1.5rem] ring-1 ring-black/[0.04]">
          <div className="bg-white rounded-[calc(1.5rem-0.375rem)] p-6 border border-black/[0.04] shadow-sm h-full flex flex-col transition-transform duration-300 hover:scale-[1.01]">
            <h3 className="font-semibold text-[#0A0A0A] text-[13px] tracking-tight mb-6">Distribusi per Kategori</h3>
            <div className="flex-1 flex items-center justify-center min-h-[250px]">
              <CategoryPieChart data={summary.category_breakdown} />
            </div>
          </div>
        </div>

        <div className="bg-black/[0.02] p-1.5 rounded-[1.5rem] ring-1 ring-black/[0.04]">
          <div className="bg-white rounded-[calc(1.5rem-0.375rem)] p-6 border border-black/[0.04] shadow-sm h-full flex flex-col transition-transform duration-300 hover:scale-[1.01]">
            <h3 className="font-semibold text-[#0A0A0A] text-[13px] tracking-tight mb-6">Biaya per Perangkat</h3>
            <div className="flex-1 flex items-center justify-center min-h-[250px]">
              <CostBarChart appliances={summary.appliances} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
