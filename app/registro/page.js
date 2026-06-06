"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Registro() {
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    email: '',
    password: ''
  });
  const [errorRUT, setErrorRUT] = useState('');
  const [loading, setLoading] = useState(false);

  // Función para formatear y validar el RUT en tiempo real (sin puntos, solo guion)
  const handleRutChange = (e) => {
    let valor = e.target.value.replace(/[^0-9kK]/g, '').toUpperCase();
    
    if (valor.length > 1) {
      valor = valor.slice(0, -1) + '-' + valor.slice(-1);
    }
    
    setFormData({ ...formData, rut: valor });
    
    // Validación básica de longitud
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
    
    // Aquí irá la lógica de Supabase: await supabase.auth.signUp(...)
    console.log("Registrando usuario:", formData);
    
    setTimeout(() => {
      setLoading(false);
      alert("Simulación de Registro exitoso. ¡Bienvenido a Confecciones Karina!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Crea tu cuenta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="font-medium text-[#2b6cb0] hover:text-[#1a4977] transition-colors">
            Inicia sesión aquí
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleRegister}>
            
            {/* Nombre Completo */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
              <div className="mt-1">
                <input
                  id="nombre" type="text" required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#2b6cb0] focus:border-[#2b6cb0] sm:text-sm"
                />
              </div>
            </div>

            {/* RUT Chileno */}
            <div>
              <label htmlFor="rut" className="block text-sm font-medium text-gray-700">RUT (Sin puntos, con guion)</label>
              <div className="mt-1">
                <input
                  id="rut" type="text" required maxLength="10"
                  value={formData.rut}
                  onChange={handleRutChange}
                  className={`appearance-none block w-full px-3 py-2 border ${errorRUT ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-[#2b6cb0] focus:border-[#2b6cb0] sm:text-sm`}
                  placeholder="12345678-9"
                />
              </div>
              {errorRUT && <p className="mt-2 text-sm text-red-600">{errorRUT}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
              <div className="mt-1">
                <input
                  id="email" type="email" required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#2b6cb0] focus:border-[#2b6cb0] sm:text-sm"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
              <div className="mt-1">
                <input
                  id="password" type="password" required minLength="6"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#2b6cb0] focus:border-[#2b6cb0] sm:text-sm"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || errorRUT !== ''}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#2b6cb0] hover:bg-[#1a4977] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2b6cb0] transition-colors disabled:opacity-70"
              >
                {loading ? 'Creando cuenta...' : 'Registrarse'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
