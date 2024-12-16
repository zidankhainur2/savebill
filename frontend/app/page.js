"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, Zap, BarChart, PiggyBank } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import EnergyTipsPage from "./components/Tips";
import EnergyVisualizationPage from "./components/VisualData";

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-black to-gray-900 min-h-screen text-yellow-400 overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 min-h-screen flex items-center justify-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content Section */}
          <div className="flex flex-col space-y-8 text-center lg:text-left pt-16">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                Analisis Cerdas <br />
                Tagihan Listrik Anda
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
                Unggah data pemakaian listrik bulanan, dapatkan analisis
                mendalam dan saran hemat energi berbasis AI.
              </p>
            </div>

            <div className="flex flex-col items-center lg:items-start space-y-6">
              <Link href="/pages/upload" className="w-full max-w-xs">
                <Button
                  size="lg"
                  className="w-full group px-8 py-3 text-lg font-semibold space-x-2 bg-yellow-500 text-black hover:bg-yellow-600 transition-colors duration-300"
                >
                  <span>Mulai Sekarang</span>
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4">
                <h1 className="text-gray-400">upcoming features {"--"}</h1>
                <div className="flex items-center space-x-2 hover:text-yellow-300 transition-colors">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm">Analisis Real-time</span>
                </div>
                <div className="flex items-center space-x-2 hover:text-yellow-300 transition-colors">
                  <BarChart className="w-5 h-5 text-yellow-500" />
                  <Link href="#visualData">
                    <span className="text-sm">Visualisasi Data</span>
                  </Link>
                </div>
                <div className="flex items-center space-x-2 hover:text-yellow-300 transition-colors">
                  <PiggyBank className="w-5 h-5 text-yellow-500" />
                  <Link href="#tips" className="hover:underline">
                    <span className="text-sm">Tips Hemat Energi</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="flex items-center justify-center relative">
            <div className="relative w-full max-w-[500px] group">
              <Image
                src="/ucup.png"
                alt="Ilustrasi Analisis Listrik"
                width={600}
                height={600}
                priority
                className="w-full h-auto object-contain transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2 drop-shadow-xl"
              />
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-yellow-500/20 rounded-full blur-2xl animate-pulse-slow"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl animate-pulse-slow"></div>
            </div>
          </div>
        </div>
      </main>

      <div id="visualData">
        <EnergyVisualizationPage />
      </div>

      {/* <div id="visualData">
        <EnergyVisualizationPage data={sampleData}/>
      </div>

      

      <div id="tips" className="scroll-smooth">
        <EnergyTipsPage />
      </div> */}

      {/* Visualisasi Data Section
       <EnergyVisualizationPage data={sampleData} /> */}
      <div id="tips" className="scroll-smooth">
        <EnergyTipsPage />
      </div>
    </div>
  );
}
