import "./globals.css";

export const metadata = {
  title: "SaveBill",
  description: "An AI for energy saving",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
