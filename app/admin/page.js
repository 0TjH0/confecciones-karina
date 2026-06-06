"use client";

import { useState } from 'react';

// ============================================================================
// SIMULACIÓN DE BASE DE DATOS (Día 11 se conectará a Supabase)
// ============================================================================
const pedidosIniciales = [
  { id: 'PED-101', cliente: 'María López', servicio: 'Confección', fecha: '06/06/2026', estado: 'Recibido', total: 18000 },
  { id: 'PED-102', cliente: 'Carlos Ruiz', servicio: 'Estampado', fecha: '05/06/2026', estado: 'En producción', total: 12500 },
  { id: 'PED-103', cliente: 'Ana Soto', servicio: 'Reparación', fecha: '04/06/2026', estado: 'Listo para retiro', total: 2500 },
  { id: 'PED-104', cliente: 'Pedro Gomez', servicio: 'Confección', fecha: '02/06/2026', estado: 'Entregado', total: 45000 },
];

export default function PanelAdministrativo() {
  const [pedidos, setPedidos] = useState(pedidosIniciales);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos');

  // ============================================================================
  // LÓGICA DE NEGOCIO: Filtrado y Búsqueda
  // ============================================================================
  const pedidosFiltrados = pedidos.filter((pedido) => {
    const coincideBusqueda = pedido.cliente.toLowerCase().includes(busqueda.toLowerCase()) || 
                             pedido.id.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = filtroEstado === 'Todos' || pedido.estado === filtroEstado;
    return coincideBusqueda && coincideEstado;
  });

  // ============================================================================
  // LÓGICA DE NEGOCIO: Actualizar Estado
  // ============================================================================
  const cambiarEstado = (id, nuevoEstado) => {
    const pedidosActualizados = pedidos.map(pedido => 
      pedido.id === id ? { ...pedido, estado: nuevoEstado } : pedido
    );
    setPedidos(pedidosActualizados);
    // En el Día 11 aquí haremos: await supabase.from('Pedidos').update({estado: nuevoEstado}).eq('id', id);
  };

  // Estadísticas rápidas
  const totalIngresos = pedidos.reduce((acc, ped) => acc + ped.total, 0);
  const pedidosPendientes = pedidos.filter(p => p.estado !== 'Entregado').length;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado del Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Panel Administrativo</h1>
            <p className="text-gray-600">Gestión de operaciones de Confecciones Karina</p>
          </div>
          <div className="bg-[#2b6cb0] text-white px-6 py-2 rounded-lg font-bold shadow-md">
            Modista Activa
          </div>
        </div>

        {/* Tarjetas de Estadísticas (KPIs) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-[#2b6cb0]">
            <p className="text-sm text-gray-500 font-bold uppercase">Total Pedidos</p>
            <p className="text-3xl font-extrabold text-gray-800">{pedidos.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-[#e26526]">
            <p className="text-sm text-gray-500 font-bold uppercase">Trabajos Pendientes</p>
            <p className="text-3xl font-extrabold text-gray-800">{pedidosPendientes}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-green-500">
            <p className="text-sm text-gray-500 font-bold uppercase">Ingresos Proyectados</p>
            <p className="text-3xl font-extrabold text-gray-800">${totalIngresos.toLocaleString('es-CL')}</p>
          </div>
        </div>

        {/* Controles de Búsqueda y Filtros */}
        <div className="bg-white p-6 rounded-t-xl shadow-sm border-b border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="w-full md:w-1/2 relative">
            <input 
              type="text" 
              placeholder="Buscar por ID o nombre de cliente..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b6cb0] outline-none"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
          
          <div className="w-full md:w-auto flex items-center gap-2">
            <label className="text-sm font-bold text-gray-700">Filtrar:</label>
            <select 
              value={filtroEstado} 
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2b6cb0] outline-none"
            >
              <option value="Todos">Todos los estados</option>
              <option value="Recibido">Recibido</option>
              <option value="En producción">En producción</option>
              <option value="Listo para retiro">Listo para retiro / En camino</option>
              <option value="Entregado">Entregado</option>
            </select>
          </div>
        </div>

        {/* Tabla de Gestión de Pedidos */}
        <div className="bg-white shadow-sm rounded-b-xl overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ID / Fecha</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Servicio</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Estado Actual</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Monto</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Acción (Actualizar)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pedidosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No se encontraron pedidos con esos filtros.
                  </td>
                </tr>
              ) : (
                pedidosFiltrados.map((pedido) => (
                  <tr key={pedido.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-[#2b6cb0]">{pedido.id}</div>
                      <div className="text-xs text-gray-500">{pedido.fecha}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{pedido.cliente}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pedido.servicio}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full 
                        ${pedido.estado === 'Entregado' ? 'bg-green-100 text-green-800' : 
                          pedido.estado === 'En producción' ? 'bg-yellow-100 text-yellow-800' : 
                          pedido.estado === 'Listo para retiro' ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {pedido.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                      ${pedido.total.toLocaleString('es-CL')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <select 
                        value={pedido.estado}
                        onChange={(e) => cambiarEstado(pedido.id, e.target.value)}
                        className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#95441c]"
                      >
                        <option value="Recibido">Recibido</option>
                        <option value="En producción">En producción</option>
                        <option value="Listo para retiro">Listo para retiro</option>
                        <option value="Entregado">Entregado</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
