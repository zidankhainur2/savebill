import { Button } from "@/components/ui/button";
import { ChevronRight, Zap, BarChart, PiggyBank } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-green-50 to-green-300 min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 pt-16 flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0 lg:space-x-12">
        <div className="w-full lg:w-1/2 flex flex-col space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Analisis Cerdas <br />
              Tagihan Listrik Anda
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
              Unggah data pemakaian listrik bulanan, dapatkan analisis mendalam
              dan saran hemat energi berbasis AI.
            </p>
          </div>

          <Link href="/pages/upload" className="self-center lg:self-start">
            <Button
              size="lg"
              className="group px-8 py-3 text-lg font-semibold space-x-2"
            >
              <span>Mulai Sekarang</span>
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-gray-700">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-green-600" />
              <span>Analisis Real-time</span>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart className="w-5 h-5 text-blue-600" />
              <span>Visualisasi Data</span>
            </div>
            <div className="flex items-center space-x-2">
              <PiggyBank className="w-5 h-5 text-yellow-600" />
              <Link href="/pages/tips">
                <span>Tips Hemat Energi</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="relative w-full max-w-[500px]">
            <Image
              src="/ucup.png"
              alt="Ilustrasi Analisis Listrik"
              width={600}
              height={600}
              priority
              className="w-full h-auto object-contain transform transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-green-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
