import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "SaveBill — Hemat Listrik Rumah Anda",
  description: "Kelola perangkat listrik, hitung estimasi tagihan PLN, dan dapatkan rekomendasi hemat energi berbasis AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={inter.variable}>
      <body className={`${inter.className} antialiased bg-gray-50 text-gray-900`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
