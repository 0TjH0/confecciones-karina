"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// ============================================================================
// DICCIONARIOS DE DATOS AUTOMATIZADOS (PRECIOS DE LA EMPRESA)
// ============================================================================
const PRECIOS_BASE = {
  'Confección': 15000,
  'Estampado': 4500,
  'Reparación': 2500
};

// 🌟 Cobertura ampliada para eliminar los cálculos mentales de despacho
const TARIFAS_DESPACHO = {
  'Retiro en Taller': 0,
  'La Pintana': 2500,
  'Puente Alto': 3000,
  'San Bernardo': 3500,
  'La Florida': 3500,
  'Macul': 3500,
  'San Ramón': 3000,
  'El Bosque': 3500,
  'Santiago Centro': 4500,
  'Ñuñoa': 4500,
  'Providencia': 5000,
  'Las Condes': 6000
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

    // Simulación de cálculo en tiempo real
    setTimeout(() => {
      setPresupuesto({ subtotal, despacho: costoDespacho, total });
      setLoading(false);
      setPaso(2);
    }, 600);
  };

  const confirmarPedido = async () => {
    setLoadingEnvio(true);
    try {
      const res = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          servicio: formData.servicio,
          cantidad: parseInt(formData.cantidad),
          comuna: formData.comuna,
          costo_despacho: presupuesto.despacho,
          total: presupuesto.total,
          especificaciones: formData.especificaciones,
          medidas: formData.servicio === 'Confección' ? `Pecho:${formData.pecho}cm, Cintura:${formData.cintura}cm, Largo:${formData.largo}cm` : 'N/A'
        })
      });

      if (res.status === 401) {
        alert("🔒 Debes iniciar sesión o registrarte para confirmar tu pedido.");
        router.push('/login');
        return;
      }

      if (res.ok) {
        alert("✅ ¡Pedido confirmado con éxito! Tu cobro de despacho ha sido automatizado.");
        router.push('/perfil');
      } else {
        alert("❌ Ocurrió un error al procesar tu compra en el servidor. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error confirmando pedido:", error);
      alert("❌ Error de conexión de red.");
    } finally {
      setLoadingEnvio(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] py-12 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
       
        {/* Encabezado con colores corporativos (Verde/Naranjo) */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
            {paso === 1 ? 'Solicitud de Pedido Modular' : 'Resumen de Cotización'}
          </h1>
          <p className="text-gray-600">
            {paso === 1
              ? 'Completa los detalles para calcular tu presupuesto y despacho al instante.'
              : 'Revisa el detalle de tu presupuesto logístico automatizado.'}
          </p>
          <div className="w-24 h-1.5 bg-[#f97316] mx-auto rounded-full mt-6"></div>
        </div>

        {paso === 1 ? (
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <form onSubmit={calcularCotizacion} className="space-y-8">
             
              {/* Selección de Servicio */}
              <div>
                <label className="text-lg font-bold text-gray-800 mb-4 block">1. ¿Qué servicio necesitas?</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.keys(PRECIOS_BASE).map((tipo) => (
                    <label key={tipo} className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 text-center block ${formData.servicio === tipo ? 'border-[#10b981] bg-emerald-50' : 'border-gray-200 hover:border-emerald-200'}`}>
                      <input type="radio" name="servicio" value={tipo} className="hidden" onChange={handleChange} checked={formData.servicio === tipo} required />
                      <span className={`font-bold block ${formData.servicio === tipo ? 'text-[#10b981]' : 'text-gray-600'}`}>{tipo}</span>
                      <span className="text-xs text-gray-400 block mt-1">Base: ${PRECIOS_BASE[tipo].toLocaleString('es-CL')}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Cantidad */}
              <div>
                <label className="text-lg font-bold text-gray-800 mb-2 block" htmlFor="cantidad">2. Cantidad de prendas</label>
                <input type="number" id="cantidad" name="cantidad" min="1" value={formData.cantidad} onChange={handleChange} required className="w-full md:w-1/3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10b981] focus:border-[#10b981] outline-none font-medium" />
              </div>

              {/* Medidas (Renderizado Condicional) */}
              {formData.servicio === 'Confección' && (
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <label className="text-lg font-bold text-gray-800 mb-4 block">3. Medidas requeridas (cm)</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><label className="block text-sm font-medium text-gray-600 mb-1">Contorno de Pecho</label><input type="number" name="pecho" value={formData.pecho} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#10b981] outline-none" /></div>
                    <div><label className="block text-sm font-medium text-gray-600 mb-1">Contorno de Cintura</label><input type="number" name="cintura" value={formData.cintura} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#10b981] outline-none" /></div>
                    <div><label className="block text-sm font-medium text-gray-600 mb-1">Largo Total</label><input type="number" name="largo" value={formData.largo} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#10b981] Bars outline-none" /></div>
                  </div>
                </div>
              )}

              {/* Comunas y Tarifa Logística */}
              <div>
                <label className="text-lg font-bold text-gray-800 mb-2 block">
                  {formData.servicio === 'Confección' ? '4.' : '3.'} Comuna de Despacho (Cálculo Automático)
                </label>
                <select name="comuna" value={formData.comuna} onChange={handleChange} required className="w-full md:w-2/3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10b981] focus:border-[#10b981] outline-none bg-white font-medium text-gray-700">
                  <option value="" disabled>Selecciona comuna de destino...</option>
                  {Object.keys(TARIFAS_DESPACHO).map((opcion) => (
                    <option key={opcion} value={opcion}>
                      {opcion} {TARIFAS_DESPACHO[opcion] === 0 ? '(Gratis)' : `(+$${TARIFAS_DESPACHO[opcion].toLocaleString('es-CL')})`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Especificaciones */}
              <div>
                <label className="text-lg font-bold text-gray-800 mb-2 block">
                  {formData.servicio === 'Confección' ? '5.' : '4.'} Especificaciones del diseño corporativo
                </label>
                <textarea name="especificaciones" rows="3" value={formData.especificaciones} onChange={handleChange} required placeholder="Detalla colores, tipo de tela, logos a estampar, etc..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10b981] focus:border-[#10b981] outline-none resize-none"></textarea>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button type="submit" disabled={loading || !formData.servicio} className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-md text-lg font-bold text-white bg-[#f97316] hover:bg-[#ea580c] transition-all disabled:opacity-50">
                  {loading ? 'Calculando Tarifas...' : 'Calcular Presupuesto Automatizado →'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* PASO 2: VISTA TOTALIZADA CON PRECISIÓN LOGÍSTICA */
          <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center border-b pb-4">Resumen de tu Presupuesto</h3>
           
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-gray-700 text-lg">
                <span>Servicio: <span className="font-bold text-gray-900">{formData.servicio}</span> (x{formData.cantidad})</span>
                <span className="font-bold text-gray-900">${presupuesto.subtotal.toLocaleString('es-CL')}</span>
              </div>
              <div className="flex justify-between items-center text-gray-700 text-lg">
                <span>Despacho Automatizado: <span className="font-bold text-gray-900">{formData.comuna}</span></span>
                <span className="font-bold text-emerald-600">${presupuesto.despacho.toLocaleString('es-CL')}</span>
              </div>
            </div>

            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200 mb-8">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-800 text-xl">Total Neto Calculado:</span>
                <span className="font-extrabold text-[#f97316] text-3xl">${presupuesto.total.toLocaleString('es-CL')}</span>
              </div>
              <p className="text-xs text-emerald-700 mt-2 text-right font-medium">✨ Error de cálculo mental mitigado al 100%</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setPaso(1)} className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50 transition-all">
                ← Modificar Comuna o Datos
              </button>
              <button onClick={confirmarPedido} disabled={loadingEnvio} className="flex-1 py-3 px-4 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50">
                {loadingEnvio ? 'Procesando en Neon...' : 'Confirmar y Guardar Pedido'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}