"use client";

import {
  Lightbulb,
  Zap,
  ThermometerSun,
  Wind,
  Leaf,
  CreditCard,
  RefrigeratorIcon,
  WashingMachineIcon,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const energyTips = [
  {
    icon: Lightbulb,
    title: "Pencahayaan Efisien",
    color: "text-yellow-500",
    tips: [
      "Gunakan lampu LED yang lebih hemat energi",
      "Matikan lampu saat tidak digunakan",
      "Manfaatkan pencahayaan alami dari siang hari",
      "Gunakan sensor gerak untuk lampu di area yang jarang dipakai",
    ],
  },
  {
    icon: ThermometerSun,
    title: "Pengaturan Suhu",
    color: "text-orange-500",
    tips: [
      "Atur AC pada suhu 24-25°C untuk efisiensi energi",
      "Gunakan kipas angin sebagai alternatif AC",
      "Gunakan tirai atau gorden untuk menghalangi panas matahari",
      "Pastikan pintu dan jendela tertutup saat AC menyala",
    ],
  },
  {
    icon: RefrigeratorIcon,
    title: "Penggunaan Kulkas",
    color: "text-blue-500",
    tips: [
      "Jaga pintu kulkas tertutup rapat",
      "Bersihkan kondensor kulkas secara berkala",
      "Hindari meletakkan makanan panas langsung di kulkas",
      "Atur suhu kulkas pada level yang tepat, tidak terlalu dingin",
    ],
  },
  {
    icon: WashingMachineIcon,
    title: "Peralatan Elektronik",
    color: "text-purple-500",
    tips: [
      "Cabut charger saat tidak digunakan",
      "Gunakan peralatan elektronik dengan label hemat energi",
      "Matikan peralatan elektronik sepenuhnya, jangan mode standby",
      "Lakukan perawatan berkala pada peralatan elektronik",
    ],
  },
  {
    icon: Wind,
    title: "Ventilasi dan Isolasi",
    color: "text-green-500",
    tips: [
      "Gunakan ventilasi silang untuk sirkulasi udara alami",
      "Pasang isolasi pada dinding dan atap",
      "Gunakan cat atau bahan dengan sifat pemantul panas",
      "Tanam pohon atau tanaman di sekitar rumah untuk mengurangi panas",
    ],
  },
  {
    icon: CreditCard,
    title: "Manajemen Biaya Listrik",
    color: "text-indigo-500",
    tips: [
      "Pantau penggunaan listrik secara berkala",
      "Gunakan meteran listrik pintar",
      "Pilih paket listrik yang sesuai dengan kebutuhan",
      "Pertimbangkan penggunaan panel surya untuk rumah",
    ],
  },
];

export default function EnergyTipsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-green-50 to-green-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 flex items-center justify-center space-x-4">
            <Leaf className="w-12 h-12 text-green-600 animate-pulse" />
            <span>Tips Hemat Energi</span>
            <Zap className="w-12 h-12 text-yellow-500 animate-pulse" />
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Temukan strategi praktis untuk mengurangi konsumsi listrik,
            menghemat biaya, dan berkontribusi pada lingkungan yang lebih
            berkelanjutan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {energyTips.map((category, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-green-500/50 border-2 border-transparent"
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <category.icon className={`w-10 h-10 ${category.color}`} />
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="hover:no-underline group-hover:text-green-600 transition-colors">
                      <span className="flex items-center space-x-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span>Lihat Tips</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3 text-sm text-gray-700">
                        {category.tips.map((tip, tipIndex) => (
                          <li
                            key={tipIndex}
                            className="flex items-start space-x-3"
                          >
                            <Zap className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                            <span className="leading-relaxed">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center justify-center space-x-4">
            <Leaf className="w-10 h-10 text-green-600 animate-bounce" />
            <span>Mengapa Hemat Energi Penting?</span>
            <Leaf className="w-10 h-10 text-green-600 animate-bounce" />
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Dengan menerapkan tips hemat energi, Anda tidak hanya mengurangi
            biaya listrik, tetapi juga berkontribusi pada upaya global
            mengurangi emisi karbon dan melestarikan lingkungan untuk generasi
            mendatang.
          </p>
        </div>
      </div>
    </div>
  );
}
