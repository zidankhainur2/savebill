'use client';

import { AlertTriangle } from 'lucide-react';

export default function EnergyHogBanner({ applianceName }) {
  if (!applianceName) return null;

  return (
    <div className="bg-red-500/[0.04] p-1.5 rounded-[1.5rem] ring-1 ring-red-500/[0.1] mb-2 mt-4">
      <div className="bg-white rounded-[calc(1.5rem-0.375rem)] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm border border-red-100">
        <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 ring-1 ring-red-100">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <p className="font-semibold text-[#0A0A0A] text-[13px] tracking-tight">
            Peringatan: <span className="font-bold text-red-600">{applianceName}</span> adalah Energy Hog
          </p>
          <p className="text-[11px] text-black/50 mt-0.5 font-medium leading-relaxed">
            Perangkat ini mengonsumsi lebih dari 40% total penggunaan listrik bulanan rumah Anda. Pertimbangkan untuk mengurangi jam pemakaian.
          </p>
        </div>
      </div>
    </div>
  );
}
