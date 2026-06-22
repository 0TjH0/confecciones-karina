"use client";

import { useState } from 'react';

// ============================================================================
// Estados reales que usa la modista en su Panel Administrativo
// ============================================================================
const PASOS_ESTADO = ['Esperando Pago', 'En producción', 'Listo para retiro', 'Entregado'];

export default function SeguimientoPedidos() {
  const [busqueda, setBusqueda] = useState('');
  const [pedido, setPedido] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const buscarPedido = async (e) => {
    e.preventDefault();
    if (!busqueda.trim()) return;

    setLoading(true);
    setError('');
    setPedido(null);

    try {
      // Llamamos a nuestra nueva API conectada a PostgreSQL
      const res = await fetch(`/api/seguimiento?id=${busqueda.trim()}`);
      
      if (res.ok) {
        const data = await res.json();
        setPedido(data);
      } else {
        setError('No hemos encontrado un pedido con ese código. Por favor, verifica e intenta nuevamente.');
      }
    } catch (err) {
      setError('Hubo un problema de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  // Función para calcular si un paso ya se completó o es el actual
  const getStepStatus = (estadoActual, pasoIterado) => {
    const indiceActual = PASOS_ESTADO.indexOf(estadoActual);
    const indiceIterado = PASOS_ESTADO.indexOf(pasoIterado);
    
    if (indiceIterado < indiceActual) return 'completado';
    if (indiceIterado === indiceActual) return 'actual';
    return 'pendiente';
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] py-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
       
        {/* Encabezado */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
            Sigue tu Pedido
          </h1>
          <p className="text-gray-600">
            Ingresa el código de tu orden para conocer su estado en tiempo real.
          </p>
          <div className="w-24 h-1.5 bg-[#c05621] mx-auto rounded-full mt-6"></div>
        </div>

        {/* Buscador */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-gray-100 mb-8">
          <form onSubmit={buscarPedido} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Ejemplo: PED-1234"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b6cb0] outline-none text-lg uppercase transition-all"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-[#2b6cb0] hover:bg-[#1a4977] text-white font-bold rounded-lg shadow-md transition-all disabled:opacity-70 transform hover:-translate-y-0.5"
            >
              {loading ? 'Buscando...' : 'Rastrear Orden'}
            </button>
          </form>
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium animate-fade-in-up">
              {error}
            </div>
          )}
        </div>

        {/* Resultado del Seguimiento */}
        {pedido && (
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gray-100 pb-6 gap-4">
              <div>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Orden Encontrada</p>
                <h2 className="text-2xl font-extrabold text-[#2b6cb0]">{pedido.id}</h2>
                <p className="text-gray-600 mt-1">Servicio: <strong>{pedido.servicio}</strong></p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-sm text-gray-500">Fecha de solicitud</p>
                <p className="font-medium text-gray-800">
                  {pedido.fecha ? new Date(pedido.fecha).toLocaleDateString('es-CL') : 'Reciente'}
                </p>
              </div>
            </div>

            {/* Línea de Progreso Visual (Stepper) */}
            <div className="relative pt-4 pb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-8 md:gap-0">
                {PASOS_ESTADO.map((paso, index) => {
                  const status = getStepStatus(pedido.estado, paso);
                  return (
                    <div key={paso} className="flex flex-row md:flex-col items-center flex-1 w-full relative">
                     
                      {/* Línea conectora (oculta en el último elemento) */}
                      {index !== PASOS_ESTADO.length - 1 && (
                        <div className={`hidden md:block absolute top-6 left-[50%] w-full h-1 ${status === 'completado' ? 'bg-green-500' : 'bg-gray-200'} -z-10 transition-colors duration-500`}></div>
                      )}
                     
                      {/* Línea conectora vertical para móviles */}
                      {index !== PASOS_ESTADO.length - 1 && (
                        <div className={`block md:hidden absolute left-6 top-[3rem] w-1 h-full ${status === 'completado' ? 'bg-green-500' : 'bg-gray-200'} -z-10 transition-colors duration-500`}></div>
                      )}

                      {/* Círculo del paso */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-4 transition-all duration-500 bg-white z-10
                        ${status === 'completado' ? 'border-green-500 text-green-500' :
                          status === 'actual' ? 'border-[#c05621] bg-[#c05621] text-white shadow-lg transform scale-110' :
                          'border-gray-200 text-gray-400'}`}
                      >
                        {status === 'completado' ? '✓' : index + 1}
                      </div>

                      {/* Texto del paso */}
                      <div className="ml-4 md:ml-0 md:mt-4 text-left md:text-center">
                        <p className={`font-bold text-sm md:text-base ${status === 'actual' ? 'text-[#c05621]' : status === 'completado' ? 'text-gray-800' : 'text-gray-400'}`}>
                          {paso}
                        </p>
                        {status === 'actual' && (
                          <p className="text-xs text-gray-500 mt-1 md:mx-auto max-w-[120px]">
                            {paso === 'Esperando Pago' && 'Revisando tu transferencia.'}
                            {paso === 'En producción' && 'Estamos trabajando en tu prenda.'}
                            {paso === 'Listo para retiro' && 'Tu pedido está listo para ti.'}
                            {paso === 'Entregado' && '¡Pedido finalizado!'}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
           
            {pedido.estado === 'Entregado' && (
              <div className="mt-8 bg-green-50 p-4 rounded-xl text-center border border-green-200 animate-fade-in">
                <p className="text-green-800 font-medium">¡Gracias por confiar en Confecciones Karina! Esperamos verte pronto.</p>
              </div>
            )}
           
          </div>
        )}
      </div>
    </div>
  );
}
