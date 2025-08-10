"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Data placeholder yang lebih realistis
const data = [
  { name: "Lampu Tidur", energy: 65, efficiency: 90 },
  { name: "TV", energy: 150, efficiency: 75 },
  { name: "Kulkas", energy: 200, efficiency: 85 },
  { name: "AC", energy: 350, efficiency: 65 },
  { name: "Charger", energy: 45, efficiency: 95 },
  { name: "Komputer", energy: 250, efficiency: 80 },
];

// Komponen Tooltip Kustom
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
        <p className="label font-semibold text-yellow-400">{`${label}`}</p>
        <p className="text-gray-300">{`Konsumsi Energi : ${payload[0].value} kWh`}</p>
      </div>
    );
  }
  return null;
};

export default function VisualData() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-12 p-4 md:p-8 bg-gray-800/50 rounded-2xl border border-gray-700">
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
            <XAxis
              dataKey="name"
              stroke="#9ca3af" // Warna teks sumbu X (gray-400)
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#9ca3af" // Warna teks sumbu Y (gray-400)
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(107, 114, 128, 0.2)" }}
            />
            <Bar
              dataKey="energy"
              fill="#facc15" // Warna batang utama (yellow-400)
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
