'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, Menu, X } from 'lucide-react';

const EASE_OUT = [0.23, 1, 0.32, 1];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Cara Kerja', href: '/how-it-works' },
    { label: 'Fitur', href: '/#fitur' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Tentang Kami', href: '/about' },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] flex justify-center pointer-events-none px-4 pt-6">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
          className={`pointer-events-auto flex items-center justify-between px-2.5 py-2 rounded-full transition-all duration-500 max-w-5xl w-full ${
            scrolled
              ? 'bg-white/85 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5'
              : 'bg-transparent'
          }`}
        >
          <Link href="/" className="flex items-center gap-3 px-4 group">
            <div className="w-9 h-9 rounded-full bg-[#1A3D2F] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-500 ease-apple-out">
              <Zap className="w-4 h-4 text-[#FDFBF7] fill-[#FDFBF7]" />
            </div>
            <span className="text-base font-semibold tracking-tight text-[#1A3D2F]">SaveBill</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-black/60">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors hover:text-[#0A0A0A] ${
                    isActive ? 'text-[#1A3D2F] font-bold' : ''
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2 pr-2">
            <Link
              href="/login"
              className="px-5 py-2.5 text-xs font-semibold text-black/70 hover:text-black transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="group relative bg-[#1A3D2F] text-white px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2.5 active:scale-[0.98] transition-all duration-300 shadow-sm"
            >
              <span>Mulai Audit</span>
              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-300">
                <ArrowRight className="w-3 h-3 text-white" />
              </div>
            </Link>
          </div>

          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-black/5 mr-1 active:scale-95 transition-transform"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="w-5 h-5 text-[#1A3D2F]" />
          </button>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="fixed inset-0 z-[70] bg-[#FDFBF7]/95 backdrop-blur-2xl flex flex-col items-center justify-center px-6"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-8 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-black/5 active:scale-95 transition-transform"
            >
              <X className="w-5 h-5 text-[#1A3D2F]" />
            </button>
            <div className="flex flex-col items-center gap-6 text-xl font-semibold tracking-tight text-[#1A3D2F] w-full max-w-sm text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-2 hover:text-[#0A0A0A] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="w-12 h-px bg-black/10 my-2" />
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center text-sm font-semibold text-black/70 py-2"
              >
                Masuk ke Akun
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="w-full bg-[#1A3D2F] text-white py-3.5 rounded-full text-sm font-semibold flex items-center justify-center gap-3 shadow-md"
              >
                <span>Mulai Audit Gratis</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
