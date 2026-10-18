import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Header, Footer } from "@/components/Chrome";
import Palette from "@/components/Palette";
import { getResources } from "@/lib/data";

export const metadata: Metadata = { title: "CPGE PSI Maroc — Cours, DS et CNC", description: "Ressources PSI pour le CNC et les concours français." };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };
export const revalidate = 3600;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const items = await getResources();
  return (
    <html lang="fr" className="light">
      <body className="relative flex flex-col min-h-screen text-slate-800 dark:text-slate-100">
        <div className="zellige-left"></div>
        <div className="zellige-right"></div>
        <div className="math-bg"></div>
        <Header />
        <Palette items={items} />
        <main className="relative z-20 flex-1 mx-auto max-w-6xl w-full px-4 md:px-8 py-8">{children}</main>
        <Footer />
        <div className="print-only">CREATED BY ABDELHAMID HAJI — CID SUPERVISOR</div>
      </body>
    </html>
  );
}
