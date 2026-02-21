import type { Metadata } from "next";
import { Inter, Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://panaicapital.com"),
  title: "Panai Capital | Proprietary Trading",
  description:
    "AI-driven systems. Millisecond execution. Relentless edge. Panai Capital operates high-frequency and AI-driven trading systems across global markets.",
  keywords: [
    "proprietary trading",
    "high-frequency trading",
    "quantitative trading",
    "AI trading systems",
    "Panai Capital",
  ],
  openGraph: {
    title: "Panai Capital | Proprietary Trading",
    description:
      "AI-driven systems. Millisecond execution. Relentless edge.",
    type: "website",
    siteName: "Panai Capital",
  },
  twitter: {
    card: "summary_large_image",
    title: "Panai Capital | Proprietary Trading",
    description:
      "AI-driven systems. Millisecond execution. Relentless edge.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
