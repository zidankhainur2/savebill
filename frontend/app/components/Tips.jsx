"use client";

import { Lightbulb, Power, BatteryCharging } from "lucide-react";

const tipsData = [
  {
    icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
    title: "Gunakan Lampu LED",
    description:
      "Lampu LED mengonsumsi energi hingga 85% lebih sedikit dan bertahan lebih lama dibandingkan lampu pijar tradisional.",
  },
  {
    icon: <Power className="w-8 h-8 text-yellow-400" />,
    title: "Cabut Peralatan Elektronik",
    description:
      "Peralatan yang masih terhubung saat tidak digunakan (vampire power) dapat menyumbang hingga 10% dari tagihan listrik Anda.",
  },
  {
    icon: <BatteryCharging className="w-8 h-8 text-yellow-400" />,
    title: "Optimalkan Penggunaan AC",
    description:
      "Atur suhu AC pada 25°C dan bersihkan filternya secara teratur untuk menjaga efisiensi dan mengurangi konsumsi energi.",
  },
];

export default function Tips() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-12 grid md:grid-cols-3 gap-8">
      {tipsData.map((tip, index) => (
        <div
          key={index}
          className="p-8 bg-gray-800/50 rounded-lg border border-gray-700 flex flex-col items-center text-center"
        >
          <div className="mb-4">{tip.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
          <p className="text-gray-400">{tip.description}</p>
        </div>
      ))}
    </div>
  );
}
