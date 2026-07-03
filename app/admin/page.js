"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PanelAdministrativo() {
  const router = useRouter();
  const [pestaña, setPestaña] = useState('pedidos'); // 'pedidos' o 'catalogo'
  
  // Estados para datos de pgAdmin
  const [pedidos, setPedidos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para UI
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [nuevoServicio, setNuevoServicio] = useState({ nombre: '', categoria: 'Confección', precio: '', descripcion: '' });

  // 1. Cargar datos reales desde nuestra API Postgres al abrir la página
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/admin');
        if (res.ok) {
          const data = await res.json();
          setPedidos(data.pedidos || []);
          setServicios(data.servicios || []);
        }
      } catch (error) {
        console.error("Error cargando panel:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // LÓGICA DE PEDIDOS
  const pedidosFiltrados = pedidos.filter((pedido) => {
    const coincideBusqueda = pedido.cliente_nombre?.toLowerCase().includes(busqueda.toLowerCase()) || 
                             pedido.rut_cliente?.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = filtroEstado === 'Todos' || pedido.estado === filtroEstado;
    return coincideBusqueda && coincideEstado;
  });

  const cambiarEstado = async (id, nuevoEstado) => {
    setPedidos(pedidos.map(p => p.id === id ? { ...p, estado: nuevoEstado } : p));
    await fetch('/api/admin', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, estado: nuevoEstado })
    });
  };

  const validarPago = async (id) => {
    if (window.confirm("¿Confirmas que recibiste la transferencia en la Cuenta RUT?")) {
      await cambiarEstado(id, 'En producción');
    }
  };

  // KPIs dinámicos
  const totalIngresos = pedidos.filter(p => p.estado !== 'Esperando Pago').reduce((acc, ped) => acc + Number(ped.total), 0);
  const pedidosPendientes = pedidos.filter(p => p.estado !== 'Entregado').length;

  // LÓGICA DE CATÁLOGO
  const agregarServicio = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoServicio)
    });

    if (res.ok) {
      const srvGuardado = await res.json();
      setServicios([...servicios, srvGuardado]); 
      setNuevoServicio({ nombre: '', categoria: 'Confección', precio: '', descripcion: '' });
      alert("Servicio agregado exitosamente a la base de datos.");
    }
  };

  // NUEVA FUNCIÓN: Eliminar Servicio
  const eliminarServicio = async (id) => {
    // 1. Preguntamos por seguridad antes de borrar
    if (!window.confirm("¿Estás seguro de que deseas eliminar este servicio del catálogo?")) return;

    try {
      // 2. Hacemos la petición DELETE a nuestra nueva ruta
      const res = await fetch('/api/servicios', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }) // Enviamos el ID
      });

      if (res.ok) {
        // 3. Si Neon lo borró con éxito, actualizamos la tabla en pantalla instantáneamente
        setServicios(servicios.filter(srv => srv.id !== id));
        alert("Servicio eliminado exitosamente.");
      } else {
        alert("Hubo un problema al intentar eliminar el servicio.");
      }
    } catch (error) {
      console.error("Error eliminando servicio:", error);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-gray-500">Cargando base de datos central...</div>;

  return (
    <div className="min-h-screen bg-[#f9fafb] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Centro de Control</h1>
            <p className="text-gray-600">Conectado a PostgreSQL Local</p>
          </div>
          <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1">
            <button 
              onClick={() => setPestaña('pedidos')}
              className={`px-6 py-2 rounded-md font-bold transition-all ${pestaña === 'pedidos' ? 'bg-[#10b981] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Pedidos
            </button>
            <button 
              onClick={() => setPestaña('catalogo')}
              className={`px-6 py-2 rounded-md font-bold transition-all ${pestaña === 'catalogo' ? 'bg-[#10b981] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Catálogo
            </button>
          </div>
        </div>

        {pestaña === 'pedidos' ? (
          <div>
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-gray-800">
                <p className="text-sm text-gray-500 font-bold uppercase">Total Histórico</p>
                <p className="text-3xl font-extrabold text-gray-800">{pedidos.length}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-[#f97316]">
                <p className="text-sm text-gray-500 font-bold uppercase">En Proceso / Pendientes</p>
                <p className="text-3xl font-extrabold text-[#f97316]">{pedidosPendientes}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-[#10b981]">
                <p className="text-sm text-gray-500 font-bold uppercase">Recaudación Validada</p>
                <p className="text-3xl font-extrabold text-[#10b981]">${totalIngresos.toLocaleString('es-CL')}</p>
              </div>
            </div>

            {/* Filtros */}
            <div className="bg-white p-6 rounded-t-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
              <input 
                type="text" 
                placeholder="Buscar por Nombre o RUT..." 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg outline-none"
              />
              <select 
                value={filtroEstado} 
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="w-full md:w-auto border border-gray-300 rounded-lg px-4 py-2 outline-none font-medium"
              >
                <option value="Todos">Todos los estados</option>
                <option value="Esperando Pago">🔴 Esperando Pago</option>
                <option value="En producción">🟡 En producción</option>
                <option value="Listo para retiro">🔵 Listo para retiro</option>
                <option value="Entregado">🟢 Entregado</option>
              </select>
            </div>

            {/* Tabla Pedidos */}
            <div className="bg-white shadow-sm rounded-b-xl border border-gray-100 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">ID / RUT</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Cliente</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Servicio / Total</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pedidosFiltrados.length === 0 ? (
                    <tr><td colSpan="4" className="text-center py-8 text-gray-500">No hay pedidos registrados.</td></tr>
                  ) : (
                    pedidosFiltrados.map((pedido) => (
                      <tr key={pedido.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-bold text-gray-800">{pedido.id}</div>
                          <div className="text-xs text-gray-500">{pedido.rut_cliente}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{pedido.cliente_nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-800">{pedido.servicio}</div>
                          <div className="font-bold text-[#10b981]">${Number(pedido.total).toLocaleString('es-CL')}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {pedido.estado === 'Esperando Pago' ? (
                            <button onClick={() => validarPago(pedido.id)} className="bg-red-100 text-red-700 font-bold py-1.5 px-4 rounded-lg text-sm border border-red-200">Validar Transferencia</button>
                          ) : (
                            <select value={pedido.estado} onChange={(e) => cambiarEstado(pedido.id, e.target.value)} className="text-sm font-bold border rounded-lg px-3 py-1.5">
                              <option value="En producción">En producción</option>
                              <option value="Listo para retiro">Listo para retiro</option>
                              <option value="Entregado">Entregado</option>
                            </select>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* PESTAÑA CATÁLOGO */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
              <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Añadir Nuevo Servicio</h2>
              <form onSubmit={agregarServicio} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Servicio</label>
                  <input required type="text" value={nuevoServicio.nombre} onChange={(e) => setNuevoServicio({...nuevoServicio, nombre: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none" placeholder="Ej: Ajuste de Basta" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select value={nuevoServicio.categoria} onChange={(e) => setNuevoServicio({...nuevoServicio, categoria: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none">
                    <option value="Confección">Confección</option>
                    <option value="Estampado">Estampado</option>
                    <option value="Reparación">Reparación</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio Base ($)</label>
                  <input required type="number" value={nuevoServicio.precio} onChange={(e) => setNuevoServicio({...nuevoServicio, precio: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none" placeholder="Ej: 2500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea rows="3" value={nuevoServicio.descripcion} onChange={(e) => setNuevoServicio({...nuevoServicio, descripcion: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none resize-none" placeholder="Breve descripción..."></textarea>
                </div>
                <button type="submit" className="w-full bg-[#f97316] hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition-colors">
                  Guardar en Catálogo
                </button>
              </form>
            </div>

            <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Servicio</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Categoría</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Precio Base</th>
                    {/* NUEVA COLUMNA ACCIONES */}
                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {servicios.map((srv) => (
                    <tr key={srv.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-bold text-gray-800">{srv.nombre}</div>
                        <div className="text-xs text-gray-500 truncate w-48">{srv.descripcion}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{srv.categoria}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-bold text-[#10b981]">
                        ${Number(srv.precio).toLocaleString('es-CL')}
                      </td>
                      {/* NUEVO BOTÓN DE ELIMINAR */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button 
                          onClick={() => eliminarServicio(srv.id)}
                          className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 font-bold py-1.5 px-3 rounded-lg text-xs transition-colors"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}