'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatRupiah } from '@/lib/utils';

export default function CostBarChart({ appliances = [] }) {
  if (!appliances || appliances.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-sm text-gray-400">
        Belum ada data perangkat
      </div>
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={appliances} layout="vertical" margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
          <XAxis type="number" tickFormatter={(v) => `Rp${(v / 1000).toFixed(0)}k`} />
          <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 12 }} />
          <Bar dataKey="cost_monthly" fill="#C4F032" radius={[0, 4, 4, 0]} />
          <Tooltip formatter={(v) => formatRupiah(v)} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
