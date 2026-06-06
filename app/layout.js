// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Confecciones Karina - Sistema de Gestión Textil",
  description: "Optimización y seguimiento automatizado de pedidos textiles y estampados",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 font-sans">
        {/* Barra de navegación institucional (Verde) */}
        <Navbar />
        
        {/* Contenedor central liberado para permitir fondos de pantalla completa */}
        <main className="flex-grow w-full">
          {children}
        </main>
        
        {/* Pie de página (Gris oscuro con borde Naranjo) */}
        <Footer />
      </body>
    </html>
  );
}