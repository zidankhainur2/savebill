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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/app/components/Navbar";

const energyTips = [
  {
    icon: Lightbulb,
    title: "Pencahayaan Efisien",
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-3">
            <Leaf className="w-10 h-10 text-green-600" />
            <span>Tips Hemat Energi</span>
            <Zap className="w-10 h-10 text-yellow-500" />
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Temukan strategi praktis untuk mengurangi konsumsi listrik,
            menghemat biaya, dan berkontribusi pada lingkungan yang lebih
            berkelanjutan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {energyTips.map((category, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <category.icon className="w-8 h-8 text-green-600" />
                  <CardTitle>{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Lihat Tips</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-gray-700">
                        {category.tips.map((tip, tipIndex) => (
                          <li
                            key={tipIndex}
                            className="flex items-start space-x-2"
                          >
                            <Zap className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                            <span>{tip}</span>
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

        <div className="mt-12 bg-white/80 backdrop-blur-md rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Mengapa Hemat Energi Penting?
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
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
