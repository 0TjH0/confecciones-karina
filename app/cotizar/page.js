"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// ============================================================================
// DICCIONARIOS DE DATOS BASE
// ============================================================================
const PRECIOS_BASE = {
  'Confección': 15000,
  'Estampado': 4500,
  'Reparación': 2500
};

const TARIFAS_DESPACHO = {
  'Retiro en Taller': 0,
  'Macul': 2000,
  'Ñuñoa': 2500,
  'Providencia': 3000,
  'Santiago Centro': 3500,
  'La Florida': 4000
};

export default function SolicitudPedido() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    servicio: '',
    cantidad: 1,
    especificaciones: '',
    pecho: '', cintura: '', largo: '',
    comuna: ''
  });

  const [loading, setLoading] = useState(false);
  const [loadingEnvio, setLoadingEnvio] = useState(false);
  const [paso, setPaso] = useState(1);
  const [presupuesto, setPresupuesto] = useState({ subtotal: 0, despacho: 0, total: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calcularCotizacion = (e) => {
    e.preventDefault();
    setLoading(true);

    const precioUnitario = PRECIOS_BASE[formData.servicio] || 0;
    const costoDespacho = TARIFAS_DESPACHO[formData.comuna] || 0;

    const subtotal = precioUnitario * parseInt(formData.cantidad);
    const total = subtotal + costoDespacho;

    setTimeout(() => {
      setPresupuesto({ subtotal, despacho: costoDespacho, total });
      setLoading(false);
      setPaso(2);
    }, 800);
  };

  const confirmarPedido = async () => {
    setLoadingEnvio(true);
    try {
      const res = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          servicio: formData.servicio,
          total: presupuesto.total
        })
      });

      if (res.status === 401) {
        alert("🔒 Debes iniciar sesión o registrarte para confirmar tu pedido.");
        router.push('/login');
        return;
      }

      if (res.ok) {
        alert("✅ ¡Pedido confirmado con éxito! Puedes revisarlo en tu perfil.");
        // Redirección profesional: El cliente va a su perfil a ver la compra
        router.push('/perfil'); 
      } else {
        alert("❌ Ocurrió un error al procesar tu compra. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error confirmando pedido:", error);
    } finally {
      setLoadingEnvio(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] py-12 px-6 md:px-12">
      <div className="max-w-3xl mx-auto animate-fade-in-up">
        
        {/* Encabezado */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
            {paso === 1 ? 'Solicitud de Pedido' : 'Resumen de Cotización'}
          </h1>
          <p className="text-gray-600">
            {paso === 1
              ? 'Completa los detalles para calcular tu presupuesto al instante.'
              : 'Revisa el detalle de tu presupuesto automatizado.'}
          </p>
          <div className="w-24 h-1.5 bg-[#c05621] mx-auto rounded-full mt-6"></div>
        </div>

        {paso === 1 ? (
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <form onSubmit={calcularCotizacion} className="space-y-8">
              
              {/* Selección de Servicio */}
              <div>
                <label className="text-lg font-bold text-gray-800 mb-4 block">1. ¿Qué servicio necesitas?</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.keys(PRECIOS_BASE).map((tipo) => (
                    <label key={tipo} className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 text-center ${formData.servicio === tipo ? 'border-[#2b6cb0] bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}>
                      <input type="radio" name="servicio" value={tipo} className="hidden" onChange={handleChange} required />
                      <span className={`font-semibold ${formData.servicio === tipo ? 'text-[#2b6cb0]' : 'text-gray-600'}`}>{tipo}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Cantidad */}
              <div>
                <label className="text-lg font-bold text-gray-800 mb-2 block" htmlFor="cantidad">2. Cantidad de prendas</label>
                <input type="number" name="cantidad" min="1" value={formData.cantidad} onChange={handleChange} required className="w-full md:w-1/3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b6cb0] outline-none" />
              </div>

              {/* Medidas (Renderizado Condicional) */}
              {formData.servicio === 'Confección' && (
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 animate-fade-in-down">
                  <label className="text-lg font-bold text-gray-800 mb-4 block">3. Medidas (cm)</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><label className="block text-sm mb-1">Pecho</label><input type="number" name="pecho" value={formData.pecho} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" /></div>
                    <div><label className="block text-sm mb-1">Cintura</label><input type="number" name="cintura" value={formData.cintura} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" /></div>
                    <div><label className="block text-sm mb-1">Largo</label><input type="number" name="largo" value={formData.largo} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" /></div>
                  </div>
                </div>
              )}

              {/* Logística de Despacho */}
              <div>
                <label className="text-lg font-bold text-gray-800 mb-2 block">
                  {formData.servicio === 'Confección' ? '4.' : '3.'} Método de entrega
                </label>
                <select name="comuna" value={formData.comuna} onChange={handleChange} required className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b6cb0] outline-none">
                  <option value="" disabled>Selecciona tu comuna o retiro...</option>
                  {Object.keys(TARIFAS_DESPACHO).map((opcion) => (
                    <option key={opcion} value={opcion}>{opcion}</option>
                  ))}
                </select>
              </div>

              {/* Especificaciones */}
              <div>
                <label className="text-lg font-bold text-gray-800 mb-2 block">
                  {formData.servicio === 'Confección' ? '5.' : '4.'} Especificaciones personalizadas
                </label>
                <textarea name="especificaciones" rows="3" value={formData.especificaciones} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b6cb0] outline-none resize-none"></textarea>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button type="submit" disabled={loading || !formData.servicio} className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-md text-lg font-bold text-white bg-[#c05621] hover:bg-[#9c4221] transition-all disabled:opacity-50">
                  {loading ? 'Calculando Presupuesto...' : 'Generar Cotización Automática →'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* ======================= PASO 2: RESUMEN DE COMPRA ======================= */
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Detalle de tu orden</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-gray-700">
                <span>Servicio: <strong>{formData.servicio}</strong> (x{formData.cantidad})</span>
                <span className="font-medium">${presupuesto.subtotal.toLocaleString('es-CL')}</span>
              </div>
              <div className="flex justify-between items-center text-gray-700">
                <span>Despacho: <strong>{formData.comuna}</strong></span>
                <span className="font-medium">${presupuesto.despacho.toLocaleString('es-CL')}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
              <div className="flex justify-between items-center text-xl">
                <span className="font-bold text-gray-800">Total a Pagar:</span>
                <span className="font-extrabold text-[#2b6cb0] text-3xl">${presupuesto.total.toLocaleString('es-CL')}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2 text-right">Precios en Pesos Chilenos (CLP)</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button onClick={() => setPaso(1)} className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50 transition-all">
                ← Editar Datos
              </button>
              <button onClick={confirmarPedido} disabled={loadingEnvio} className="flex-1 py-3 px-4 bg-[#2b6cb0] hover:bg-[#1a4977] text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50">
                {loadingEnvio ? 'Guardando en Base de Datos...' : 'Confirmar Pedido'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
