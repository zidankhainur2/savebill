'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import { formatRupiah, formatKwh, useUserPowerVa } from '@/lib/utils';
import { Zap, ShieldCheck, ArrowRight, AlertTriangle, Building2, CheckCircle2, Layers } from 'lucide-react';

const PLN_TARIFF_TIERS = [
  {
    code: 'R-1/TR-450',
    name: 'Rumah Tangga Sub-450 VA',
    powerVa: 450,
    label: '450 VA',
    tariffPerKwh: 415.0,
    subsidized: true,
    description: 'Golongan daya bersubsidi pemerintah untuk keluarga penerima bantuan.',
  },
  {
    code: 'R-1/TR-900',
    name: 'Rumah Tangga 900 VA (R-1M)',
    powerVa: 900,
    label: '900 VA',
    tariffPerKwh: 1352.0,
    subsidized: false,
    description: 'Golongan daya rumah tangga kecil nonsubsidi.',
  },
  {
    code: 'R-1/TR-1300',
    name: 'Rumah Tangga 1.300 VA',
    powerVa: 1300,
    label: '1300 VA',
    tariffPerKwh: 1444.70,
    subsidized: false,
    description: 'Golongan standar terbanyak untuk rumah tangga perkotaan.',
  },
  {
    code: 'R-1/TR-2200',
    name: 'Rumah Tangga 2.200 VA',
    powerVa: 2200,
    label: '2200 VA',
    tariffPerKwh: 1444.70,
    subsidized: false,
    description: 'Golongan daya menengah untuk rumah tangga dengan 2+ AC & peralatan elektronik.',
  },
  {
    code: 'R-2/TR-3500-5500',
    name: 'Rumah Tangga 3.500 VA – 5.500 VA',
    powerVa: 3500,
    label: '3500-5500 VA',
    tariffPerKwh: 1699.53,
    subsidized: false,
    description: 'Golongan daya besar menengah atas.',
  },
  {
    code: 'B-1/TR-450-5500',
    name: 'Bisnis Kecil (B-1 / 450 VA - 5.500 VA)',
    powerVa: 5500,
    label: 'B-1 (Bisnis)',
    tariffPerKwh: 1444.70,
    subsidized: false,
    description: 'Tarif khusus ruko, warung, kantor, dan tempat usaha kecil.',
  },
];

export default function TariffsPage() {
  const userPowerVa = useUserPowerVa();
  const [selectedTierCode, setSelectedTierCode] = useState('R-1/TR-1300');

  const { data: summary } = useQuery({
    queryKey: ['summary', userPowerVa],
    queryFn: () => api.post('/calculate/summary', { power_va: userPowerVa }),
  });

  const { data: appliances = [] } = useQuery({
    queryKey: queryKeys.appliances(),
    queryFn: () => api.get('/appliances'),
  });

  const totalWattPeak = appliances.reduce((sum, a) => sum + a.watt * a.qty, 0);

  const activeTier = PLN_TARIFF_TIERS.find((t) => t.code === selectedTierCode) || PLN_TARIFF_TIERS[2];

  const totalKwhMonthly = summary?.total_kwh_monthly || 0;
  const simulatedCostUnderTier = totalKwhMonthly * activeTier.tariffPerKwh;
  const currentCost = summary?.total_cost_monthly || 0;
  const delta = simulatedCostUnderTier - currentCost;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-medium text-emerald-900/60 uppercase tracking-wider">Kalkulator Tarif Listrik</span>
          <h1 className="text-2xl font-bold text-emerald-950 tracking-tight">Matriks Tarif PLN 2026</h1>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/10 text-xs font-medium text-emerald-950 shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>ESDM Regulation Standard</span>
        </div>
      </div>

      {/* Simulator Tier Comparison Box */}
      <div className="bg-white rounded-3xl p-6 border border-black/5 space-y-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-black/5">
          <div>
            <h2 className="text-base font-bold text-emerald-950">Simulasi Migrasi Golongan Daya PLN</h2>
            <p className="text-xs text-emerald-900/60 mt-0.5">
              Bandingkan estimasi tagihan Anda jika pindah golongan daya VA.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-900/60">Daya Puncak Perangkat Anda:</span>
            <span className="text-xs font-bold text-emerald-950 bg-[#F6F7F2] px-3 py-1 rounded-full border border-black/5">
              {totalWattPeak} Watt
            </span>
          </div>
        </div>

        {/* Tier Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {PLN_TARIFF_TIERS.map((tier) => {
            const isSelected = selectedTierCode === tier.code;
            const isOverloaded = totalWattPeak > tier.powerVa;
            return (
              <button
                key={tier.code}
                onClick={() => setSelectedTierCode(tier.code)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#1A3D2F] text-white border-[#1A3D2F] shadow-xs'
                    : 'bg-[#F6F7F2] text-emerald-950 border-black/5 hover:border-black/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{tier.label}</span>
                  {isOverloaded && (
                    <AlertTriangle className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-amber-600'}`} />
                  )}
                </div>
                <span className={`text-[10px] block mt-1 ${isSelected ? 'text-emerald-200' : 'text-emerald-900/60'}`}>
                  Rp {tier.tariffPerKwh.toLocaleString('id-ID')}/kWh
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Tier Result Banner */}
        <div className="bg-[#F6F7F2] rounded-2xl p-5 border border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#1A3D2F] bg-white px-2.5 py-0.5 rounded-full border border-black/5">
                {activeTier.code}
              </span>
              <span className="text-sm font-bold text-emerald-950">{activeTier.name}</span>
            </div>
            <p className="text-xs text-emerald-900/70">{activeTier.description}</p>
          </div>

          <div className="flex items-center gap-6 self-start md:self-auto pt-2 md:pt-0">
            <div>
              <span className="text-[11px] font-medium text-emerald-900/60 uppercase block">Estimasi Tagihan</span>
              <span className="text-xl font-bold text-emerald-950">{formatRupiah(simulatedCostUnderTier)}</span>
            </div>

            <div>
              <span className="text-[11px] font-medium text-emerald-900/60 uppercase block">Selisih Bulanan</span>
              <span className={`text-sm font-bold ${delta > 0 ? 'text-red-600' : delta < 0 ? 'text-emerald-700' : 'text-emerald-900'}`}>
                {delta > 0 ? `+${formatRupiah(delta)}` : delta < 0 ? `-${formatRupiah(Math.abs(delta))}` : 'Sama'}
              </span>
            </div>
          </div>
        </div>

        {/* Overload Warning if totalWattPeak > selectedTierVa */}
        {totalWattPeak > activeTier.powerVa && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-900 text-xs flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <span className="font-bold block">Peringatan Kapasitas Daya Overload!</span>
              <span>
                Total daya puncak elektronik terdaftar ({totalWattPeak} W) melebihi kapasitas golongan {activeTier.powerVa} VA. Sakelar MCB PLN berpotensi anjlok jika dinyalakan serentak.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Complete PLN Tariff Schedule Table */}
      <div className="bg-white rounded-3xl p-6 border border-black/5 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-800" />
          Tabel Lengkap Tarif Dasar Listrik PLN
        </h3>

        <div className="overflow-x-auto border border-black/5 rounded-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F6F7F2] text-emerald-950 font-bold border-b border-black/5 uppercase">
                <th className="py-3 px-4">Golongan</th>
                <th className="py-3 px-4">Batas Daya</th>
                <th className="py-3 px-4">Tarif (Rp/kWh)</th>
                <th className="py-3 px-4">Subsidi</th>
                <th className="py-3 px-4">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {PLN_TARIFF_TIERS.map((tier) => (
                <tr key={tier.code} className="hover:bg-black/2 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-950">{tier.code}</td>
                  <td className="py-3 px-4 text-emerald-900/80">{tier.powerVa} VA</td>
                  <td className="py-3 px-4 font-bold text-emerald-950">Rp {tier.tariffPerKwh.toLocaleString('id-ID')}</td>
                  <td className="py-3 px-4">
                    {tier.subsidized ? (
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">Subsidi</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full font-medium text-[10px]">Non-Subsidi</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-emerald-900/70">{tier.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
