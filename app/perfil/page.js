"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function PerfilCliente() {
  // Estado simulado del usuario (En el Día 11 esto vendrá de Supabase)
  const [usuario, setUsuario] = useState({
    nombre: 'Juan Pérez',
    rut: '12345678-9',
    email: 'juan.perez@correo.com',
    telefono: '+56 9 1234 5678',
    direccion: 'Av. Providencia 1234, Depto 502',
    comuna: 'Providencia'
  });

  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);

  // Historial de pedidos simulado
  const historialPedidos = [
    { id: 'PED-001', fecha: '01/06/2026', servicio: 'Confección Uniformes', estado: 'Entregado', total: '$45.000' },
    { id: 'PED-002', fecha: '05/06/2026', servicio: 'Estampado Poleras', estado: 'En producción', total: '$12.500' }
  ];

  const handleGuardarCambios = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulación de guardado en base de datos
    setTimeout(() => {
      setLoading(false);
      setEditando(false);
      alert("Perfil actualizado correctamente.");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] py-10 px-6 md:px-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Encabezado del Perfil */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-[#2b6cb0] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-inner">
              {usuario.nombre.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">¡Hola, {usuario.nombre}!</h1>
              <p className="text-gray-500">Cliente desde Junio 2026</p>
            </div>
          </div>
          <button 
            onClick={() => setEditando(!editando)}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
          >
            {editando ? 'Cancelar Edición' : 'Editar Perfil'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Columna Izquierda: Datos del Usuario */}
          <div className="md:col-span-1 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Tus Datos</h2>
            
            <form onSubmit={handleGuardarCambios} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input 
                  type="text" 
                  value={usuario.nombre}
                  disabled={!editando}
                  onChange={(e) => setUsuario({...usuario, nombre: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:ring-[#2b6cb0] focus:border-[#2b6cb0] disabled:opacity-70"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">RUT (Solo lectura)</label>
                <input 
                  type="text" 
                  value={usuario.rut}
                  disabled
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input 
                  type="text" 
                  value={usuario.telefono}
                  disabled={!editando}
                  onChange={(e) => setUsuario({...usuario, telefono: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:ring-[#2b6cb0] focus:border-[#2b6cb0] disabled:opacity-70"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Dirección</label>
                <input 
                  type="text" 
                  value={usuario.direccion}
                  disabled={!editando}
                  onChange={(e) => setUsuario({...usuario, direccion: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:ring-[#2b6cb0] focus:border-[#2b6cb0] disabled:opacity-70"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Comuna</label>
                <select
                  value={usuario.comuna}
                  disabled={!editando}
                  onChange={(e) => setUsuario({...usuario, comuna: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:ring-[#2b6cb0] focus:border-[#2b6cb0] disabled:opacity-70"
                >
                  <option value="Ñuñoa">Ñuñoa</option>
                  <option value="Providencia">Providencia</option>
                  <option value="Santiago">Santiago Centro</option>
                  <option value="Macul">Macul</option>
                  <option value="La Florida">La Florida</option>
                </select>
              </div>

              {editando && (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 bg-[#2b6cb0] hover:bg-[#1a4977] text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-70"
                >
                  {loading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              )}
            </form>
          </div>

          {/* Columna Derecha: Historial de Pedidos */}
          <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-6 border-b pb-2">
              <h2 className="text-xl font-bold text-gray-800">Historial de Pedidos</h2>
              <Link href="/pedidos" className="text-sm font-medium text-[#c05621] hover:underline">
                Realizar nuevo pedido
              </Link>
            </div>

            {historialPedidos.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center text-gray-500">
                <span className="text-4xl mb-4">📦</span>
                <p>Aún no tienes pedidos registrados.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicio</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {historialPedidos.map((pedido) => (
                      <tr key={pedido.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pedido.id}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{pedido.fecha}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{pedido.servicio}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            pedido.estado === 'Entregado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {pedido.estado}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">{pedido.total}</td>
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
