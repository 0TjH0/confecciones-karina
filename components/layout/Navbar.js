"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react'; // 1. Importamos la sesión

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { data: session } = useSession(); // 2. Obtenemos la sesión actual

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Identidad Visual */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-[var(--color-karina-verde)] rounded-lg flex items-center justify-center text-white font-black shadow-sm group-hover:scale-105 transition-transform">
                K
              </div>
              <span className="font-extrabold text-lg tracking-tight text-gray-800 group-hover:text-[var(--color-karina-verde)] transition-colors">
                Confecciones Karina
              </span>
            </Link>
          </div>
          
          {/* Menú de Navegación de Escritorio */}
          <div className="hidden md:flex md:items-center md:space-x-8 text-sm">
            <Link href="/" className="text-gray-600 hover:text-[var(--color-karina-verde)] font-semibold transition-colors">Inicio</Link>
            <Link href="/servicios" className="text-gray-600 hover:text-[var(--color-karina-verde)] font-semibold transition-colors">Catálogo</Link>
            <Link href="/seguimiento" className="text-gray-600 hover:text-[var(--color-karina-verde)] font-semibold transition-colors">Seguimiento</Link>
            
            {/* 3. Lógica para ocultar el Admin: Solo se muestra si el usuario es Admin */}
            {session?.user?.rol === 'admin' && (
              <Link href="/admin" className="text-[var(--color-karina-naranjo)] font-bold transition-colors border-b-2 border-[var(--color-karina-naranjo)]">
                Admin
              </Link>
            )}

            {session ? (
               <button onClick={() => signOut()} className="text-gray-600 font-bold hover:text-red-600">Cerrar Sesión</button>
            ) : (
               <Link href="/login" className="text-[var(--color-karina-verde)] font-bold hover:underline">Iniciar Sesión</Link>
            )}

            <Link
              href="/cotizar"
              className="bg-[var(--color-karina-naranjo)] hover:bg-orange-600 text-white px-5 py-2 rounded-xl font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Cotizar Express
            </Link>
          </div>

          {/* Accionador del Menú Móvil */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setMenuAbierto(!menuAbierto)} className="text-gray-500 hover:text-gray-800 p-2 rounded-lg transition-colors">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuAbierto ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil */}
      {menuAbierto && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-3 pt-2 pb-4 space-y-1 flex flex-col text-sm font-semibold">
            <Link href="/" onClick={() => setMenuAbierto(false)} className="px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-xl">Inicio</Link>
            <Link href="/servicios" onClick={() => setMenuAbierto(false)} className="px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-xl">Catálogo</Link>
            {session?.user?.rol === 'admin' && (
              <Link href="/admin" onClick={() => setMenuAbierto(false)} className="px-3 py-2.5 text-[var(--color-karina-naranjo)] font-bold hover:bg-gray-50 rounded-xl">Panel Admin</Link>
            )}
            <Link href="/login" onClick={() => setMenuAbierto(false)} className="px-3 py-2.5 text-[var(--color-karina-verde)] font-bold hover:bg-gray-50 rounded-xl">Iniciar Sesión</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
