import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#a7bfd7]">
      
      {/* 1. HERO SECTION (Verde Claro Vibrante) */}
      <section className="relative w-full bg-[#10b981] text-white py-24 px-6 md:px-12 flex flex-col items-center text-center overflow-hidden">
        {/* Decoración de fondo sutil */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight drop-shadow-md">
            Transformamos tus ideas en prendas únicas
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-emerald-50 font-light">
            En Confecciones Karina combinamos tradición y tecnología. Ofrecemos servicios de confección industrial, estampado corporativo y reparación textil con un sistema totalmente transparente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/cotizar" 
              className="bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
              aria-label="Ir a solicitar una cotización"
            >
              Solicitar Cotización
            </Link>
            <Link 
              href="/servicios" 
              className="bg-white text-[#10b981] hover:bg-gray-50 font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
              aria-label="Ver el catálogo de servicios"
            >
              Ver Servicios
            </Link>
          </div>
        </div>
      </section>

      {/* 2. VENTAJAS COMPETITIVAS */}
      <section className="w-full py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 tracking-tight">¿Por qué elegir Confecciones Karina?</h2>
            {/* Divisor Naranjo Claro */}
            <div className="w-24 h-1.5 bg-[#f97316] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Ventaja 1 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="bg-emerald-50 text-[#10b981] w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">A Medida</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Trabajamos bajo tus especificaciones técnicas y medidas exactas para lograr un calce perfecto en cada entrega.</p>
            </div>

            {/* Ventaja 2 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="bg-orange-50 text-[#f97316] w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Cotización Rápida</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Olvídate de los días de espera. Nuestro sistema digital automatizado calcula el valor de tu pedido al instante.</p>
            </div>

            {/* Ventaja 3 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="bg-blue-50 text-blue-500 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Despacho Claro</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Evitamos los cobros sorpresa. El costo logístico de envío se calcula de forma automática según tu comuna.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICIOS DESTACADOS */}
      <section className="w-full bg-gray-50 py-24 px-6 md:px-12 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">Nuestros Servicios</h2>
              <p className="text-gray-600 text-sm">Descubre las soluciones textiles modulares que ofrecemos.</p>
            </div>
            <Link href="/servicios" className="hidden md:inline-flex items-center text-[#10b981] font-bold hover:text-[#f97316] transition-colors group">
              Ver todo el catálogo <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tarjeta Servicio 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col">
              <div className="relative h-56 w-full bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm font-medium">
                  [Imagen: public/img/confeccion.jpg]
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Confección Textil</h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow">Producción de prendas corporativas, uniformes y diseños a pedido desde cero con insumos de alta resistencia.</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs font-medium bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full">Por mayor y menor</span>
                  <span className="text-[#f97316] font-bold text-lg">Desde $5.000</span>
                </div>
              </div>
            </div>

            {/* Tarjeta Servicio 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col">
              <div className="relative h-56 w-full bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm font-medium">
                  [Imagen: public/img/estampado.jpg]
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Estampados Personalizados</h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow">Línea de personalización para poleras, polerones y dotación de trabajo con técnicas textiles de alta durabilidad.</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs font-medium bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full">Tintas Premium</span>
                  <span className="text-[#f97316] font-bold text-lg">Desde $2.500</span>
                </div>
              </div>
            </div>

            {/* Tarjeta Servicio 3 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col">
              <div className="relative h-56 w-full bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm font-medium">
                  [Imagen: public/img/reparacion.jpg]
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Reparación y Ajustes</h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow">Servicios express de bastas, optimización de tallajes y cambios de cierres para prolongar la vida útil de tu vestuario.</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full">Trabajo Express</span>
                  <span className="text-[#f97316] font-bold text-lg">Desde $1.500</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center md:hidden">
             <Link href="/servicios" className="text-[#10b981] font-bold hover:underline inline-flex items-center">
              Ver todo el catálogo <span className="ml-1">→</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
