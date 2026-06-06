"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Consultar sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Escuchar cambios de sesión (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMenuAbierto(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-[var(--color-karina-verde)] rounded-lg flex items-center justify-center text-white font-black shadow-sm">K</div>
              <span className="font-extrabold text-lg text-gray-800">Confecciones Karina</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-8 text-sm">
            <Link href="/" className="text-gray-600 hover:text-[var(--color-karina-verde)] font-semibold">Inicio</Link>
            <Link href="/servicios" className="text-gray-600 hover:text-[var(--color-karina-verde)] font-semibold">Catálogo</Link>
            {session && (
              <>
                <Link href="/seguimiento" className="text-gray-600 hover:text-[var(--color-karina-verde)] font-semibold">Seguimiento</Link>
                <Link href="/admin" className="text-gray-500 hover:text-[var(--color-karina-verde)] font-medium">Admin</Link>
                <button onClick={handleLogout} className="text-red-500 font-bold hover:underline">Cerrar Sesión</button>
              </>
            )}
            {!session && <Link href="/login" className="text-[var(--color-karina-verde)] font-bold hover:underline">Iniciar Sesión</Link>}
            
            <Link href="/cotizar" className="bg-[var(--color-karina-naranjo)] hover:bg-orange-600 text-white px-5 py-2 rounded-xl font-bold transition-all shadow-md">
              Cotizar Express
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
