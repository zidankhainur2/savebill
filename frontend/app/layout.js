import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  metadataBase: new URL('https://savebill-iota.vercel.app'), // Base URL untuk resolving absolute URLs
  title: {
    default: "SaveBill — Hemat Listrik & Audit Energi Rumah Anda",
    template: "%s | SaveBill"
  },
  description: "Platform audit energi dan kalkulator penghematan listrik rumah tangga Indonesia. Hitung tagihan PLN akurat dan temukan perangkat boros energi dengan mudah.",
  keywords: ["kalkulator listrik", "tagihan pln", "hemat energi", "audit energi", "cek tagihan listrik", "hemat listrik", "esdm", "tarif dasar listrik", "hemat tagihan"],
  authors: [{ name: "SaveBill Team" }],
  creator: "SaveBill Indonesia",
  publisher: "SaveBill Indonesia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "SaveBill — Hemat Listrik & Audit Energi Rumah Anda",
    description: "Hitung estimasi tagihan PLN, temukan perangkat paling boros (Energy Hog), dan simulasikan penghematan listrik secara presisi.",
    url: "https://savebill-iota.vercel.app",
    siteName: "SaveBill",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SaveBill - Kendalikan Tagihan Listrik Anda",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaveBill — Hemat Listrik & Audit Energi Rumah Anda",
    description: "Kendalikan anggaran listrik rumah tangga Anda dengan presisi. Coba audit gratis sekarang.",
    images: ["/og-image.png"],
    creator: "@savebill_id",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  themeColor: "#1A3D2F",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={inter.variable} data-scroll-behavior="smooth">
      <body className={`${inter.className} antialiased bg-[#FDFBF7] text-[#0A0A0A]`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
