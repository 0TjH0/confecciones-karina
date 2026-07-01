// app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Providers from './Providers'; // 🌟 1. Importamos los proveedores de contexto globales

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Confecciones Karina | Servicios Textiles a Medida',
  description: 'Servicios automatizados de confección industrial, estampado corporativo y reparación textil con cotización al instante. Calidad y transparencia.',
  keywords: 'confección, estampado, reparación de ropa, modista santiago, uniformes corporativos, cotización textil automatizada',
  openGraph: {
    title: 'Confecciones Karina',
    description: 'Cotiza y realiza el seguimiento de tus pedidos textiles de forma digital.',
    url: 'https://confecciones-karina-sooty.vercel.app',
    siteName: 'Confecciones Karina',
    locale: 'es_CL',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`}>
        {/* 🌟 2. Envolvemos toda la estructura para escuchar la sesión unificada de NextAuth conectada con Neon */}
        <Providers>
          <Navbar />
          <main className="flex-grow w-full">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}