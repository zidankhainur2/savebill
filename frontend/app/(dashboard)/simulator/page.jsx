'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import { formatRupiah, formatKwh } from '@/lib/utils';
import SliderControl from '@/components/simulator/SliderControl';
import DeltaBadge from '@/components/simulator/DeltaBadge';
import { RotateCcw, Sliders, Zap } from 'lucide-react';

const TARIFF_PER_KWH = 1444.7; // 1300 VA baseline

export default function SimulatorPage() {
  const { data: appliances = [], isLoading } = useQuery({
    queryKey: queryKeys.appliances(),
    queryFn: () => api.get('/appliances'),
  });

  const [simulatedHours, setSimulatedHours] = useState({});

  useEffect(() => {
    if (appliances.length > 0) {
      const initial = {};
      appliances.forEach((a) => {
        initial[a.id] = a.daily_hours;
      });
      setSimulatedHours(initial);
    }
  }, [appliances]);

  const handleHourChange = (id, hours) => {
    setSimulatedHours((prev) => ({ ...prev, [id]: hours }));
  };

  const handleReset = () => {
    const resetState = {};
    appliances.forEach((a) => {
      resetState[a.id] = a.daily_hours;
    });
    setSimulatedHours(resetState);
  };

  let baselineKwh = 0;
  let simulatedKwh = 0;

  appliances.forEach((a) => {
    const baseKwh = ((a.watt * a.qty * a.daily_hours) / 1000) * 30;
    const currentHours = simulatedHours[a.id] !== undefined ? simulatedHours[a.id] : a.daily_hours;
    const simKwh = ((a.watt * a.qty * currentHours) / 1000) * 30;

    baselineKwh += baseKwh;
    simulatedKwh += simKwh;
  });

  const baselineCost = baselineKwh * TARIFF_PER_KWH;
  const simulatedCost = simulatedKwh * TARIFF_PER_KWH;
  const deltaCost = simulatedCost - baselineCost;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-7 w-48 bg-black/5 rounded-full animate-pulse" />
        <div className="h-64 glass-card rounded-3xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-medium text-emerald-900/60 uppercase tracking-wider">Simulasi Tagihan</span>
          <h1 className="text-2xl font-bold text-emerald-950 tracking-tight">Simulator Hemat Listrik</h1>
        </div>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/5 text-emerald-900 bg-white hover:bg-white/80 transition-all text-xs font-medium self-start sm:self-auto shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Kondisi Awal</span>
        </button>
      </div>

      {appliances.length === 0 ? (
        <div className="glass-card rounded-[2.5rem] p-12 text-center space-y-3 border border-white/80">
          <Sliders className="w-10 h-10 text-emerald-900/30 mx-auto" />
          <h3 className="text-base font-bold text-emerald-950">Belum Ada Perangkat</h3>
          <p className="text-xs text-emerald-900/60 max-w-sm mx-auto">
            Tambahkan perangkat di menu &quot;Perangkat&quot; terlebih dahulu untuk menggunakan simulator.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sliders List */}
          <div className="lg:col-span-2 space-y-4">
            {appliances.map((app) => (
              <SliderControl
                key={app.id}
                appliance={app}
                hours={simulatedHours[app.id] !== undefined ? simulatedHours[app.id] : app.daily_hours}
                onChange={(hours) => handleHourChange(app.id, hours)}
              />
            ))}
          </div>

          {/* Simulation Summary Box (Ref: Sunrock Dark Glass Card) */}
          <div className="space-y-4">
            <div className="glass-card-dark rounded-[2.5rem] p-6 text-white space-y-6 sticky top-6">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <div className="w-7 h-7 rounded-full bg-emerald-300/20 text-emerald-300 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm text-emerald-300">Hasil Simulasi</h3>
              </div>

              <div>
                <p className="text-xs font-medium text-white/50 uppercase tracking-wide">Tagihan Saat Ini</p>
                <p className="text-lg font-semibold text-white/60 line-through mt-0.5">
                  {formatRupiah(baselineCost)}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-emerald-300 uppercase tracking-wide">Tagihan Setelah Simulasi</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {formatRupiah(simulatedCost)}
                </p>
                <p className="text-xs text-white/50 mt-1">
                  Estimasi energi: {formatKwh(simulatedKwh)}/bulan
                </p>
              </div>

              <div className="pt-3 border-t border-white/10">
                <p className="text-xs font-medium text-white/50 uppercase tracking-wide mb-2">Selisih Penghematan</p>
                <DeltaBadge delta={deltaCost} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
