"use client"; // Directiva obligatoria en Next.js para usar interactividad (useState)

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Base de datos temporal (Mock Data). En el futuro, esto vendrá de Supabase.
const serviciosDb = [
  { id: 1, nombre: "Confección de Uniformes", categoria: "Confección", precio: "Desde $15.000", desc: "Uniformes corporativos, delantales y ropa de trabajo a medida.", img: "uniforme" },
  { id: 2, nombre: "Estampado de Poleras", categoria: "Estampado", precio: "Desde $4.500", desc: "Estampado en vinilo textil y serigrafía de alta durabilidad.", img: "polera" },
  { id: 3, nombre: "Reparación de Bastas", categoria: "Reparación", precio: "Desde $2.500", desc: "Ajuste de largo perfecto para pantalones, faldas y vestidos.", img: "basta" },
  { id: 4, nombre: "Cambio de Cierres", categoria: "Reparación", precio: "Desde $3.000", desc: "Reemplazo de cierres dañados en casacas, jeans y mochilas.", img: "cierre" },
  { id: 5, nombre: "Ropa Deportiva", categoria: "Confección", precio: "Desde $12.000", desc: "Conjuntos deportivos y buzos en telas transpirables.", img: "deporte" },
  { id: 6, nombre: "Bordado de Logos", categoria: "Estampado", precio: "Desde $3.500", desc: "Bordado computarizado de alta definición para tu marca.", img: "bordado" },
];

export default function CatalogoServicios() {
  const [filtroActivo, setFiltroActivo] = useState('Todos');

  // Lógica para filtrar los servicios según la categoría seleccionada
  const serviciosFiltrados = filtroActivo === 'Todos' 
    ? serviciosDb 
    : serviciosDb.filter(servicio => servicio.categoria === filtroActivo);

  const categorias = ['Todos', 'Confección', 'Estampado', 'Reparación'];

  return (
    <div className="min-h-screen bg-[#f9fafb] py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* ENCABEZADO DEL CATÁLOGO */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">Catálogo de Servicios</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explora nuestras soluciones textiles. Selecciona la categoría que necesitas y descubre nuestros precios base.
          </p>
          <div className="w-24 h-1.5 bg-[#c05621] mx-auto rounded-full mt-6"></div>
        </div>

        {/* FILTROS DE CATEGORÍA */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setFiltroActivo(categoria)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-sm ${
                filtroActivo === categoria
                  ? 'bg-[#2b6cb0] text-white shadow-md transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
              aria-label={`Filtrar por ${categoria}`}
            >
              {categoria}
            </button>
          ))}
        </div>

        {/* GRILLA DE SERVICIOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {serviciosFiltrados.map((servicio) => (
            <div 
              key={servicio.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col"
            >
              {/* Espacio para la imagen */}
              <div className="relative h-56 w-full bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-medium">
                  {/* Cuando tengas las imágenes, usarás <Image src={`/img/${servicio.img}.jpg`} fill alt={servicio.nombre} /> */}
                  [Imagen de {servicio.nombre}]
                </div>
                {/* Etiqueta de categoría sobre la imagen */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#2b6cb0] shadow-sm">
                  {servicio.categoria}
                </div>
              </div>

              {/* Contenido de la tarjeta */}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{servicio.nombre}</h2>
                <p className="text-gray-600 text-sm mb-6 flex-grow">{servicio.desc}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                  <span className="text-[#c05621] font-extrabold text-xl">{servicio.precio}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LLAMADO A LA ACCIÓN (CTA) */}
        <div className="bg-[#2b6cb0] rounded-2xl p-8 md:p-12 text-center text-white shadow-lg flex flex-col items-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">¿No encuentras lo que buscas o necesitas un pedido mayor?</h3>
          <p className="text-gray-100 mb-8 max-w-2xl">
            Nuestro sistema calculará tu cotización automáticamente, incluso para pedidos con especificaciones especiales.
          </p>
          <Link 
            href="/cotizar" 
            className="bg-[#c05621] hover:bg-[#9c4221] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Ir al Cotizador Automático
          </Link>
        </div>

      </div>
    </div>
  );
}
