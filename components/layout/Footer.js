// components/layout/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 text-sm border-t-4 border-[var(--color-karina-naranjo)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Información del Taller */}
        <div>
          <p className="font-semibold text-white text-base">Confecciones Karina</p>
          <p className="text-xs mt-1">Sistemas de Gestión Textil e Infraestructura Digital</p>
        </div>

        {/* Créditos del Proyecto Académico */}
        <div className="text-center md:text-right text-xs">
          <p>© {new Date().getFullYear()} - Proyecto de Taller de Software</p>
          <p className="mt-1">Página Web en Construcción Progresiva</p>
        </div>

      </div>
    </footer>
  );
}