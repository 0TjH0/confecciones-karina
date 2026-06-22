"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CatalogoServicios() {
  const [filtroActivo, setFiltroActivo] = useState('Todos');
  const [serviciosDb, setServiciosDb] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Conexión a la Base de Datos PostgreSQL
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

  // 2. Lógica para filtrar los servicios según la categoría
  const serviciosFiltrados = filtroActivo === 'Todos'
    ? serviciosDb
    : serviciosDb.filter(servicio => servicio.categoria === filtroActivo);

  const categorias = ['Todos', 'Confección', 'Estampado', 'Reparación'];

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500 font-bold">Cargando catálogo en tiempo real...</div>;
  }

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

        {/* GRILLA DE SERVICIOS DINÁMICA */}
        {serviciosFiltrados.length === 0 ? (
           <div className="text-center text-gray-500 py-10 font-medium">No hay servicios registrados en esta categoría aún.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {serviciosFiltrados.map((servicio) => (
              <div
                key={servicio.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col"
              >
                {/* Espacio para la imagen */}
                <div className="relative h-56 w-full bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-medium">
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
                  {/* Nota: Usamos servicio.descripcion porque así se llama en pgAdmin */}
                  <p className="text-gray-600 text-sm mb-6 flex-grow">{servicio.descripcion}</p>
                 
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    {/* Nota: Formateamos el número para que se vea como moneda chilena */}
                    <span className="text-[#c05621] font-extrabold text-xl">
                      Desde ${Number(servicio.precio).toLocaleString('es-CL')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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
