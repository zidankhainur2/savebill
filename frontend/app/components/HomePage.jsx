"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
// Pastikan baris import ini sudah benar
import { ArrowRight, Upload, MessageCircleQuestion, Bot } from "lucide-react";
import VisualData from "./VisualData";
import Tips from "./Tips";

// Varian animasi untuk elemen yang muncul saat di-scroll
const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

export default function HomePage() {
  return (
    <div className="bg-gray-900 text-white overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-grid-gray-700/20 [mask-image:linear-gradient(to_bottom,white_0%,transparent_100%)]"></div>
        <div className="relative z-10">
          <motion.h1
            variants={fadeIn}
            initial="initial"
            animate="animate"
            className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-gray-50 to-gray-400"
          >
            Ubah Data CSV Menjadi
            <br />
            <span className="text-yellow-400">Wawasan Berharga</span>
          </motion.h1>
          <motion.p
            variants={fadeIn}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl mx-auto text-lg text-gray-400"
          >
            Cukup unggah file Anda, ajukan pertanyaan, dan biarkan AI kami
            menganalisisnya untuk Anda. Cepat, intuitif, dan cerdas.
          </motion.p>
          <motion.div
            variants={fadeIn}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Link
              href="/pages/upload"
              className="inline-flex items-center gap-2 bg-yellow-500 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-transform hover:scale-105"
            >
              Mulai Analisis Gratis
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. How It Works Section */}
      <section className="py-20 px-4">
        <motion.div
          viewport={{ once: true }}
          whileInView="animate"
          initial="initial"
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Hanya 3 Langkah Mudah
          </h2>
          <p className="mt-4 text-gray-400">
            Kami merancang alur kerja yang sangat sederhana agar Anda bisa fokus
            pada hal yang paling penting: data Anda.
          </p>
        </motion.div>

        <div className="mt-16 max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <motion.div
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
            variants={fadeIn}
            className="p-8 bg-gray-800/50 rounded-lg border border-gray-700 text-center"
          >
            <div className="inline-block p-4 bg-gray-700 rounded-full">
              <Upload className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="mt-6 text-xl font-semibold">Unggah File</h3>
            <p className="mt-2 text-gray-400">
              Pilih dan unggah file CSV yang ingin Anda analisis dari perangkat
              Anda.
            </p>
          </motion.div>
          {/* Step 2 */}
          <motion.div
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="p-8 bg-gray-800/50 rounded-lg border border-gray-700 text-center"
          >
            <div className="inline-block p-4 bg-gray-700 rounded-full">
              <MessageCircleQuestion className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="mt-6 text-xl font-semibold">Ajukan Pertanyaan</h3>
            <p className="mt-2 text-gray-400">
              Tulis pertanyaan apa pun terkait data Anda dalam bahasa
              sehari-hari.
            </p>
          </motion.div>
          {/* Step 3 */}
          <motion.div
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
            className="p-8 bg-gray-800/50 rounded-lg border border-gray-700 text-center"
          >
            <div className="inline-block p-4 bg-gray-700 rounded-full">
              <Bot className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="mt-6 text-xl font-semibold">Dapatkan Wawasan</h3>
            <p className="mt-2 text-gray-400">
              AI kami akan memberikan ringkasan, analisis, dan jawaban instan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. VisualData Section */}
      <section className="py-20 px-4 bg-gray-900">
        <motion.div
          viewport={{ once: true }}
          whileInView="animate"
          initial="initial"
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Visualisasikan Data Anda
          </h2>
          <p className="mt-4 text-gray-400">
            Jangan hanya membaca angka. Lihat tren dan pola dalam data Anda
            melalui grafik interaktif yang mudah dipahami.
          </p>
        </motion.div>
        <motion.div
          viewport={{ once: true }}
          whileInView="animate"
          initial="initial"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          <VisualData />
        </motion.div>
      </section>

      {/* 4. Tips Section */}
      <section className="py-20 px-4">
        <motion.div
          viewport={{ once: true }}
          whileInView="animate"
          initial="initial"
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Bonus: Dapatkan Tips Bermanfaat
          </h2>
          <p className="mt-4 text-gray-400">
            Selain menganalisis data, kami juga menyediakan tips praktis
            berdasarkan konteks data Anda, seperti penghematan energi.
          </p>
        </motion.div>
        <motion.div
          viewport={{ once: true }}
          whileInView="animate"
          initial="initial"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          <Tips />
        </motion.div>
      </section>

      {/* 5. Final CTA Section */}
      <section className="py-20 px-4 text-center">
        <motion.div
          viewport={{ once: true }}
          whileInView="animate"
          initial="initial"
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Siap Mengubah Data Anda?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400">
            Hentikan analisis manual yang memakan waktu. Biarkan teknologi AI
            kami bekerja untuk Anda.
          </p>
          <div className="mt-8">
            <Link
              href="/pages/upload"
              className="inline-flex items-center gap-2 bg-yellow-500 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-transform hover:scale-105"
            >
              Coba Sekarang, Gratis!
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
