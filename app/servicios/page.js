// app/servicios/page.js
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CatalogoServicios() {
  const [filtroActivo, setFiltroActivo] = useState('Todos');
  const [serviciosDb, setServiciosDb] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Conexión a la Base de Datos PostgreSQL (Neon)
  useEffect(() => {
    const cargarCatalogo = async () => {
      try {
        const respuesta = await fetch('/api/servicios');
        if (respuesta.ok) {
          const datos = await respuesta.json();
          setServiciosDb(datos);
        }
      } catch (error) {
        console.error("Error conectando a pgAdmin:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarCatalogo();
  }, []);

  // Lógica para asignar dinámicamente las imágenes reales guardadas en /public
  const obtenerImagenServicio = (categoria) => {
    if (categoria === 'Confección') return '/telas.jpg';
    if (categoria === 'Estampado') return '/totoro.png';
    return '/reparacion.png'; // Por defecto para Reparación u otros
  };

  // 2. Lógica para filtrar los servicios según la categoría seleccionada
  const serviciosFiltrados = filtroActivo === 'Todos'
    ? serviciosDb
    : serviciosDb.filter(servicio => servicio.categoria === filtroActivo);

  const categorias = ['Todos', 'Confección', 'Estampado', 'Reparación'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 font-bold bg-[#f9fafb]">
        Cargando catálogo textil en tiempo real...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
       
        {/* ENCABEZADO DEL CATÁLOGO (Verde y Naranjo Corporativo) */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">Catálogo de Servicios</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explora nuestras soluciones textiles modulares. Selecciona la categoría que necesitas y descubre nuestros precios base.
          </p>
          <div className="w-24 h-1.5 bg-[#f97316] mx-auto rounded-full mt-6"></div>
        </div>

        {/* FILTROS DE CATEGORÍA */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setFiltroActivo(categoria)}
              className={`px-6 py-2.5 rounded-full font-bold transition-all duration-300 shadow-sm ${
                filtroActivo === categoria
                  ? 'bg-[#10b981] text-white shadow-md transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
              aria-label={`Filtrar por ${categoria}`}
            >
              {categoria}
            </button>
          ))}
        </div>

        {/* GRILLA DE SERVICIOS DINÁMICA CON IMÁGENES REALES */}
        {serviciosFiltrados.length === 0 ? (
           <div className="text-center text-gray-500 py-10 font-medium">No hay servicios registrados en esta categoría aún.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {serviciosFiltrados.map((servicio) => (
              <div
                key={servicio.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col transform hover:-translate-y-1"
              >
                {/* Renderizado dinámico de la imagen física de /public */}
                <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
                  <img 
                    src={obtenerImagenServicio(servicio.categoria)} 
                    alt={servicio.nombre}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {/* Etiqueta de categoría corporativa */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#10b981] shadow-sm">
                    {servicio.categoria}
                  </div>
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{servicio.nombre}</h2>
                  <p className="text-gray-600 text-sm mb-6 flex-grow">{servicio.descripcion}</p>
                 
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <span className="text-[#f97316] font-extrabold text-xl">
                      Desde ${Number(servicio.precio).toLocaleString('es-CL')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LLAMADO A LA ACCIÓN (CTA Corporativo Verde) */}
        <div className="bg-[#10b981] rounded-2xl p-8 md:p-12 text-center text-white shadow-lg flex flex-col items-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">¿Necesitas un diseño a medida o un pedido por mayor?</h3>
          <p className="text-emerald-50 mb-8 max-w-2xl font-light">
            Nuestro sistema calculará tu cotización y los costos logísticos por comuna automáticamente de forma exacta.
          </p>
          <Link
            href="/cotizar"
            className="bg-[#f97316] hover:bg-[#ea580c] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Ir al Cotizador Automático
          </Link>
        </div>

      </div>
    </div>
  );
}