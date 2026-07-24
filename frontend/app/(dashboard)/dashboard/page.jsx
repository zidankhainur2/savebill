'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import { formatRupiah, formatKwh } from '@/lib/utils';
import MetricCard from '@/components/dashboard/MetricCard';
import EnergyHogBanner from '@/components/dashboard/EnergyHogBanner';
import CategoryPieChart from '@/components/charts/CategoryPieChart';
import CostBarChart from '@/components/charts/CostBarChart';
import { Zap, DollarSign, Plug, AlertTriangle } from 'lucide-react';

export default function DashboardPage() {
  const { data: summary, isLoading, isError } = useQuery({
    queryKey: queryKeys.summary(),
    queryFn: () => api.post('/calculate/summary', { power_va: 1300 }),
  });

  const currentMonth = new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-7 w-48 bg-black/5 rounded-full animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-36 glass-card rounded-3xl animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 glass-card rounded-3xl animate-pulse" />
          <div className="h-80 glass-card rounded-3xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (isError || !summary) {
    return (
      <div className="glass-card rounded-3xl p-6 bg-red-50/80 border border-red-200 text-red-700 text-center text-sm">
        Gagal memuat rangkuman energi. Pastikan server backend berjalan.
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-medium text-emerald-900/60 uppercase tracking-wider">Audit Energi Rumah</span>
          <h1 className="text-2xl font-bold text-emerald-950 tracking-tight">Rangkuman Bulan {currentMonth}</h1>
        </div>
        <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/5 text-xs font-medium text-emerald-900 shadow-xs">
          <Zap className="w-3.5 h-3.5 text-emerald-700" />
          <span>Daya {summary.power_va} VA</span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
          label="Jumlah Perangkat"
          value={`${summary.appliance_count} Unit`}
          subtitle="Perangkat terdaftar"
          icon={Plug}
        />
        <MetricCard
          label="Energy Hog"
          value={summary.has_energy_hog ? summary.energy_hog_name : 'Tidak Ada'}
          subtitle={summary.has_energy_hog ? '>40% konsumsi' : 'Penggunaan seimbang'}
          icon={AlertTriangle}
          valueColor={summary.has_energy_hog ? 'text-red-600' : 'text-emerald-700'}
        />
      </div>

      {/* Energy Hog Banner */}
      {summary.has_energy_hog && (
        <EnergyHogBanner applianceName={summary.energy_hog_name} />
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-3xl p-6 border border-white/80 space-y-4">
          <h3 className="font-semibold text-emerald-950 text-sm">Distribusi Energi per Kategori</h3>
          <CategoryPieChart data={summary.category_breakdown} />
        </div>

        <div className="glass-card rounded-3xl p-6 border border-white/80 space-y-4">
          <h3 className="font-semibold text-emerald-950 text-sm">Biaya Bulanan per Perangkat</h3>
          <CostBarChart appliances={summary.appliances} />
        </div>
      </div>
    </div>
  );
}
