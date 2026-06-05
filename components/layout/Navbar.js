// components/layout/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-[var(--color-karina-verde)] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Marca Institucional Textil */}
        <div className="flex-shrink-0 font-bold text-xl tracking-wider">
          CONFECCIONES KARINA
        </div>

        {/* Enlaces de Navegación Estructural */}
        <nav className="hidden md:flex space-x-8 font-medium">
          <Link href="/" className="hover:text-[var(--color-karina-naranjo)] transition-colors">
            Inicio
          </Link>
          {/* Deshabilitados temporalmente hasta el desarrollo del catálogo el Día 3 */}
          <span className="text-gray-400 cursor-not-allowed">Catálogo</span>
          <span className="text-gray-400 cursor-not-allowed">Mis Pedidos</span>
        </nav>

        {/* Botón de Entrada (Día 4) */}
        <div>
          <button className="bg-[var(--color-karina-naranjo)] text-white px-4 py-2 rounded-md font-semibold hover:bg-amber-700 transition-colors shadow">
            Iniciar Sesión
          </button>
        </div>

      </div>
    </header>
  );
}