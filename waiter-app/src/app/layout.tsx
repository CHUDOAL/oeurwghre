import type { Metadata } from "next";
import { Orbitron, Noto_Sans_JP, Rajdhani } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tanuki Waiter 2077",
  description: "Cyberpunk Waiter Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${notoSansJP.variable} ${rajdhani.variable} antialiased bg-[#050510] text-white min-h-screen overflow-x-hidden`}
      >
        <div className="fixed inset-0 z-[-1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="fixed inset-0 z-[-2] bg-gradient-to-br from-[#1a0b2e] via-[#0f0518] to-[#000000]"></div>
        
        {/* Cyberpunk Grid Background */}
        <div className="fixed inset-0 z-[-1] perspective-grid pointer-events-none opacity-30"></div>

        {children}
      </body>
    </html>
  );
}
