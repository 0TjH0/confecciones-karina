"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Registro() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    email: '',
    password: ''
  });
  const [errorRUT, setErrorRUT] = useState('');
  const [errorGeneral, setErrorGeneral] = useState('');
  const [loading, setLoading] = useState(false);

  // Validación estricta chilena (Sin puntos, con guion automático)
  const handleRutChange = (e) => {
    let valor = e.target.value.replace(/[^0-9kK]/g, '').toUpperCase();
    
    if (valor.length > 1) {
      valor = valor.slice(0, -1) + '-' + valor.slice(-1);
    }
    
    setFormData({ ...formData, rut: valor });
    
    if (valor.length > 0 && valor.length < 9) {
      setErrorRUT('El RUT ingresado parece muy corto.');
    } else {
      setErrorRUT('');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (errorRUT) return;

    setLoading(true);
    setErrorGeneral('');
    
    try {
      // 🚀 CONEXIÓN DIRECTA CON NUESTRA API POSTGRESQL EN LA NUBE (NEON)
      const respuesta = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Pasamos los datos limpios
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.error || 'Ocurrió un problema durante el registro.');
      }

      // Mensaje amigable para el cliente final
      alert("✅ ¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
      router.push('/login'); // Redirección real a la pantalla de Login corporativo

    } catch (error) {
      setErrorGeneral(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Crea tu cuenta de cliente
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 font-medium">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="font-bold text-[#f97316] hover:text-[#ea580c] hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-fade-in-up">
        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleRegister}>
            
            {errorGeneral && (
              <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium">
                ⚠️ {errorGeneral}
              </div>
            )}

            {/* Nombre Completo */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-bold text-gray-700">Nombre Completo</label>
              <div className="mt-1">
                <input
                  id="nombre" type="text" required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="appearance-none block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-[#10b981] sm:text-sm font-medium"
                  placeholder="Ej: Juan Pérez"
                />
              </div>
            </div>

            {/* RUT */}
            <div>
              <label htmlFor="rut" className="block text-sm font-bold text-gray-700">RUT (Sin puntos, con guion)</label>
              <div className="mt-1">
                <input
                  id="rut" type="text" required maxLength="10"
                  value={formData.rut}
                  onChange={handleRutChange}
                  className={`appearance-none block w-full px-4 py-2.5 border ${errorRUT ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#10b981] focus:border-[#10b981]'} rounded-lg shadow-sm focus:outline-none focus:ring-2 sm:text-sm font-medium`}
                  placeholder="12345678-9"
                />
              </div>
              {errorRUT && <p className="mt-2 text-sm text-red-600 font-bold">{errorRUT}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700">Correo electrónico</label>
              <div className="mt-1">
                <input
                  id="email" type="email" required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="appearance-none block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-[#10b981] sm:text-sm font-medium"
                  placeholder="correo@ejemplo.com"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700">Contraseña</label>
              <div className="mt-1">
                <input
                  id="password" type="password" required minLength="6"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="appearance-none block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-[#10b981] sm:text-sm font-medium"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || errorRUT !== ''}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-[#10b981] hover:bg-[#059669] transition-all disabled:opacity-50 transform hover:-translate-y-0.5"
              >
                {loading ? 'Creando cuenta en Neon...' : 'Crear Cuenta'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}