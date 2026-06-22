"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PerfilCliente() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [historialPedidos, setHistorialPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const res = await fetch('/api/perfil');
        
        if (res.status === 401) {
          // Si no ha iniciado sesión, lo expulsamos al login
          router.push('/login');
          return;
        }

        if (res.ok) {
          const data = await res.json();
          setUsuario(data.usuario);
          setHistorialPedidos(data.pedidos);
        }
      } catch (error) {
        console.error("Error conectando con la base de datos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarPerfil();
  }, [router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-gray-500">Cargando tu perfil privado...</div>;
  }

  if (!usuario) return null;

  return (
    <div className="min-h-screen bg-[#f9fafb] py-10 px-6 md:px-12">
      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
       
        {/* Encabezado del Perfil */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-[#2b6cb0] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-inner uppercase">
              {usuario.nombre.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">¡Hola, {usuario.nombre}!</h1>
              <p className="text-gray-500">Miembro de Confecciones Karina</p>
            </div>
          </div>
          <Link
            href="/cotizar"
            className="px-6 py-2 bg-[#c05621] hover:bg-[#9c4221] text-white font-bold rounded-lg transition-colors shadow-md"
          >
            + Nuevo Pedido
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         
          {/* Columna Izquierda: Datos del Usuario */}
          <div className="md:col-span-1 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Tus Datos Personales</h2>
           
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Nombre Registrado</label>
                <p className="mt-1 font-medium text-gray-900">{usuario.nombre}</p>
              </div>
             
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">RUT</label>
                <p className="mt-1 font-medium text-gray-900">{usuario.rut}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Correo Electrónico</label>
                <p className="mt-1 font-medium text-gray-900">{usuario.email}</p>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Historial de Pedidos */}
          <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-6 border-b pb-2">
              <h2 className="text-xl font-bold text-gray-800">Historial de Pedidos</h2>
            </div>

            {historialPedidos.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center text-gray-500 py-10">
                <span className="text-5xl mb-4">📦</span>
                <p className="font-medium">Aún no tienes pedidos registrados.</p>
                <Link href="/cotizar" className="text-[#2b6cb0] font-bold mt-2 hover:underline">Ir al catálogo para empezar</Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Código</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Fecha</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Servicio</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Estado</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {historialPedidos.map((pedido) => (
                      <tr key={pedido.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-[#2b6cb0]">
                          <Link href={`/seguimiento?id=${pedido.id}`} className="hover:underline">{pedido.id}</Link>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {pedido.fecha ? new Date(pedido.fecha).toLocaleDateString('es-CL') : 'Reciente'}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pedido.servicio}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border
                            ${pedido.estado === 'Entregado' ? 'bg-green-50 text-green-700 border-green-200' : 
                              pedido.estado === 'Esperando Pago' ? 'bg-red-50 text-red-700 border-red-200' : 
                              'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                            {pedido.estado}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-extrabold">
                          ${Number(pedido.total).toLocaleString('es-CL')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
