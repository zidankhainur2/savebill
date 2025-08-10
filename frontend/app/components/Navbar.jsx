"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Sesuaikan link navigasi dengan halaman yang ada di proyek Anda
  const navLinks = [
    { title: "Home", href: "/" },
    // Anda bisa menambahkan link lain di sini jika ada, misal:
    // { title: "Tips", href: "/#tips" },
  ];

  // Varian animasi untuk menu overlay (diadaptasi dari referensi Anda)
  const menuVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeIn",
        staggerChildren: 0.1,
      },
    },
  };

  // Varian animasi untuk setiap item link
  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Container untuk Navbar di Desktop */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="hidden md:flex items-center gap-6 px-4 py-2 bg-gray-800/80 backdrop-blur-md rounded-full shadow-lg border border-gray-700/80"
        >
          <Link href="/" className="flex-shrink-0">
            <Image src="/logofix.png" alt="Logo" width={90} height={25} />
          </Link>
          <div className="w-px h-6 bg-gray-600"></div> {/* Separator */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-yellow-400 transition-colors"
            >
              {link.title}
            </Link>
          ))}
          <Link
            href="/pages/upload"
            className="bg-yellow-500 text-black px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-yellow-400 transition-colors"
          >
            Mulai Sekarang
          </Link>
        </motion.nav>
      </div>

      {/* Tombol Hamburger untuk Mobile */}
      <motion.button
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-3 bg-gray-800/80 backdrop-blur-md rounded-full shadow-lg"
        aria-label="Toggle menu"
      >
        <div className="space-y-1.5">
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="block h-0.5 w-6 bg-gray-200"
          ></motion.span>
          <motion.span
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="block h-0.5 w-6 bg-gray-200"
          ></motion.span>
          <motion.span
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="block h-0.5 w-6 bg-gray-200"
          ></motion.span>
        </div>
      </motion.button>

      {/* Menu Overlay untuk Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center"
          >
            <motion.ul
              variants={menuVariants}
              className="flex flex-col items-center gap-8"
            >
              {navLinks.map((link) => (
                <motion.li key={link.href} variants={linkVariants}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-semibold text-gray-100 hover:text-yellow-400 transition-colors"
                  >
                    {link.title}
                  </Link>
                </motion.li>
              ))}
              <motion.li variants={linkVariants} className="pt-4">
                <Link
                  href="/pages/upload"
                  onClick={() => setIsOpen(false)}
                  className="bg-yellow-500 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-colors"
                >
                  Mulai Sekarang
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
