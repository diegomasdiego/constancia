import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(email, password);
      if (user.role === 'patient') {
        navigate('/patient');
      } else {
        navigate('/nutritionist');
      }
    } catch (err) {
      setError('Credenciales inválidas. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-md border border-stone-100">
        <div>
          <div className="flex justify-center text-4xl">🥑🥦🌾</div>
          <h2 className="mt-4 text-center text-3xl font-bold text-stone-900">
            Porcio App
          </h2>
          <p className="mt-2 text-center text-stone-500">
            Simplifica tu alimentación diaria
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-xl text-sm border border-red-100 text-center">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700 ml-1 mb-1">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-stone-200 placeholder-stone-400 text-stone-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm transition-all"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" title="Para efectos de demo, usa cualquier contraseña si el usuario ya existe" className="block text-sm font-medium text-stone-700 ml-1 mb-1">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-stone-200 placeholder-stone-400 text-stone-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-xl text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all shadow-sm"
            >
              INGRESAR A MI PLAN
            </button>
          </div>
        </form>
        <div className="text-center text-sm text-stone-500">
          ¿Eres nutricionista? Usa tus credenciales de profesional.
        </div>
      </div>
    </div>
  );
}
