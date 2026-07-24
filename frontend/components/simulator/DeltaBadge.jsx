'use client';

import { formatRupiah } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';

export default function DeltaBadge({ delta }) {
  if (delta === 0) {
    return <span className="text-xs font-medium text-white/60">Tidak ada perubahan</span>;
  }

  const isSavings = delta < 0;
  const absDelta = Math.abs(delta);

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs ${
        isSavings ? 'bg-emerald-300/20 text-emerald-300 border border-emerald-300/30' : 'bg-red-400/20 text-red-300 border border-red-400/30'
      }`}
    >
      {isSavings ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
      <span>
        {isSavings ? 'Hemat' : 'Tambah'} {formatRupiah(absDelta)}/bulan
      </span>
    </div>
  );
}
