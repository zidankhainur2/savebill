import {
  Zap,
  Lightbulb,
  Home,
  ThermometerSnowflake,
  Droplet,
  CreditCard,
} from "lucide-react";
import Navbar from "./Navbar";

export default function EnergyTipsPage() {
  const tips = [
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
      title: "Gunakan Lampu LED Hemat Energi",
      description:
        "Lampu LED lebih efisien dibandingkan lampu pijar konvensional dan dapat mengurangi konsumsi listrik hingga 80%.",
    },
    {
      icon: <Home className="w-8 h-8 text-yellow-500" />,
      title: "Matikan Perangkat Tidak Digunakan",
      description:
        "Cabut perangkat elektronik saat tidak digunakan untuk menghindari konsumsi listrik yang tidak perlu.",
    },
    {
      icon: <ThermometerSnowflake className="w-8 h-8 text-yellow-500" />,
      title: "Atur Suhu AC dengan Bijak",
      description:
        "Setel suhu AC di 24-26°C untuk menjaga keseimbangan antara kenyamanan dan efisiensi energi.",
    },
    {
      icon: <Droplet className="w-8 h-8 text-yellow-500" />,
      title: "Kurangi Penggunaan Air Panas",
      description:
        "Pemanas air listrik memakan banyak energi. Gunakan air dingin jika memungkinkan untuk menghemat listrik.",
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Rutin Periksa Konsumsi Energi",
      description:
        "Gunakan aplikasi atau alat pemantau listrik untuk memahami dan mengontrol pemakaian energi Anda.",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-yellow-500" />,
      title: "Manajemen Biaya Listrik",
      description: "Pantau penggunaan listrik secara berkala",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-black to-gray-900 min-h-screen text-yellow-400">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Tips Menghemat Energi Listrik
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-2xl transition duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                {tip.icon}
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-yellow-500">
                {tip.title}
              </h2>
              <p className="text-gray-300 leading-relaxed">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
