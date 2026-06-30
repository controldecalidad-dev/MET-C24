import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MET C24 — Evaluación de Alternativas Tecnológicas",
  description: "Herramienta interna de Control24 para evaluar y comparar soluciones tecnológicas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geist.className} bg-gray-50 min-h-screen`}>
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
