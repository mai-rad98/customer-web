import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "MoveRight — Your Move. Our Priority.",
  description:
    "Professional residential and office moving services in Gaborone and surrounding areas. Safe, reliable, stress-free relocations.",
  keywords: "moving company Gaborone, house movers Botswana, office relocation, furniture delivery Gaborone",
  openGraph: {
    title: "MoveRight Moving & Relocation Services",
    description: "Safe, reliable, stress-free moves in Gaborone & Beyond.",
    images: ["/banner.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
