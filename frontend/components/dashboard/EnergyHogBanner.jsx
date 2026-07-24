'use client';

import { AlertTriangle } from 'lucide-react';

export default function EnergyHogBanner({ applianceName }) {
  if (!applianceName) return null;

  return (
    <div className="glass-card rounded-3xl p-5 border border-red-200/80 bg-red-50/50 flex items-center gap-4 shadow-sm">
      <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
        <AlertTriangle className="w-5 h-5" />
      </div>
      <div>
        <p className="font-semibold text-red-950 text-sm">
          Perangkat Pemboros Utama: <span className="font-bold text-red-700">{applianceName}</span>
        </p>
        <p className="text-xs text-red-600/80 mt-0.5 font-normal">
          Perangkat ini mengonsumsi lebih dari 40% total penggunaan listrik bulanan rumah Anda.
        </p>
      </div>
    </div>
  );
}
