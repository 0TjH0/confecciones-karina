"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
   
    try {
      const resultado = await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
      });

      if (resultado.error) {
        setErrorMsg("Correo o contraseña incorrectos.");
        setLoading(false);
      } else {
        // Redirigimos al perfil por defecto en la nube
        router.push('/perfil');
        router.refresh(); // Refrescamos para que el Navbar detecte la sesión en Neon al instante
      }
    } catch (error) {
      setErrorMsg("Error de conexión con el servidor.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Ingresa a tu cuenta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          ¿Aún no eres cliente?{' '}
          <Link href="/registro" className="font-bold text-[#f97316] hover:text-[#ea580c] hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-fade-in-up">
        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleLogin}>
           
            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium">
                ⚠️ {errorMsg}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700">
                Correo electrónico
              </label>
              <div className="mt-1">
                <input
                  id="email" type="email" required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-[#10b981] sm:text-sm font-medium"
                  placeholder="correo@ejemplo.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700">
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password" type="password" required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-[#10b981] sm:text-sm font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-[#10b981] hover:bg-[#059669] transition-all disabled:opacity-50 transform hover:-translate-y-0.5"
              >
                {loading ? 'Validando credenciales...' : 'Iniciar Sesión'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}