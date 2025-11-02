import type { Metadata } from "next";
import { Bona_Nova, Geist, Geist_Mono, Lexend_Deca } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/home-page/header";
import { Footer } from "@/components/footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lexend_deca = Lexend_Deca({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-lexend_deca",
});
const bona_nova = Bona_Nova({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-bona_nova",
});

export const metadata: Metadata = {
  title: "Frame Finder - Premium Eyewear Collection",
  description:
    "Discover premium eyeglasses, sunglasses, and computer glasses with eco-acetate frames",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${geistSans.variable} ${geistMono.variable} ${lexend_deca.variable} ${bona_nova.variable} `}
      >
        {/* <Header /> */}
        {children}
        <Toaster position="top-center" richColors />
        <Footer />
      </body>
    </html>
  );
}
