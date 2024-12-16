"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, Zap, BarChart, PiggyBank } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import EnergyTipsPage from "./components/Tips";
import EnergyVisualizationPage from "./components/VisualData";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-green-100 to-green-300 min-h-screen overflow-x-hidden">
      <Navbar className="sticky top-0 bg-white/70 backdrop-blur-md shadow-md z-10" />
      <main className="container mx-auto px-4 py-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="grid lg:grid-cols-2 gap-12 items-center w-full"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col space-y-8 text-center lg:text-left"
          >
            <div className="space-y-6">
              <motion.h1
                whileHover={{ scale: 1.05 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-500 leading-tight tracking-tight"
              >
                Analisis Cerdas <br />
                Tagihan Listrik Anda
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed"
              >
                Unggah data pemakaian listrik bulanan, dapatkan analisis
                mendalam dan saran hemat energi berbasis AI.
              </motion.p>
            </div>
            <div className="flex flex-col items-center lg:items-start space-y-6">
              <Link href="/pages/upload" className="w-full max-w-xs">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button
                    size="lg"
                    className="w-full px-8 py-3 text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-2xl transition-transform transform duration-300"
                  >
                    <span>Mulai Sekarang</span>
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              </Link>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-gray-700 mt-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center space-x-2"
                >
                  <Zap className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Analisis Real-time</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center space-x-2"
                >
                  <BarChart className="w-5 h-5 text-blue-600" />
                  <Link href="#visualData">
                    <span className="text-sm">Visualisasi Data</span>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center space-x-2"
                >
                  <PiggyBank className="w-5 h-5 text-yellow-600" />
                  <Link href="#tips">
                    <span className="text-sm">Tips Hemat Energi</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-full max-w-[500px] group"
            >
              <Image
                src="/ucup.png"
                alt="Ilustrasi Analisis Listrik"
                layout="responsive"
                width={600}
                height={600}
                priority
                className="transform transition-transform group-hover:scale-105 group-hover:rotate-2 drop-shadow-xl"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      <motion.div
        id="visualData"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <EnergyVisualizationPage />
      </motion.div>
      <motion.div
        id="tips"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <EnergyTipsPage />
      </motion.div>
    </div>
  );
}
