'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const PALETTE = ['#C4F032', '#0D2B1A', '#60A5FA', '#F59E0B', '#EC4899', '#8B5CF6'];

export default function CategoryPieChart({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-sm text-gray-400">
        Belum ada data kategori
      </div>
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="kwh_monthly"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={95}
            paddingAngle={2}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={PALETTE[index % PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => `${v} kWh`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
