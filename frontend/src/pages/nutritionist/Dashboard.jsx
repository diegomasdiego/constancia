import React, { useState, useEffect } from 'react';
import { LogOut, Users, Plus, Search, ExternalLink, Copy, Check, X, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function NutritionistDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteData, setInviteData] = useState({ name: '', email: '' });
  const [generatedCode, setGeneratedCode] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await api.get('/nutritionist/patients');
      setPatients(res.data);
    } catch (err) {
      console.error('Error fetching patients:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    // In a real app, this would call the backend to create the user and generate a code
    // For this MVP demo, we'll simulate the code generation
    const code = `PORC-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedCode(code);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-stone-50 text-stone-500 font-medium">Cargando pacientes...</div>;

  return (
    <div className="min-h-screen bg-stone-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-stone-200 hidden md:flex flex-col">
        <div className="p-8 border-b border-stone-100 flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm">P</div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Porcio</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button className="w-full flex items-center space-x-3 px-4 py-3 bg-emerald-50 text-emerald-700 rounded-xl font-semibold transition-all">
            <Users size={20} />
            <span>Pacientes</span>
          </button>
        </nav>
        <div className="p-4 border-t border-stone-100">
          <button 
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-stone-500 hover:bg-stone-50 hover:text-red-600 rounded-xl transition-all font-medium"
          >
            <LogOut size={20} />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center border-b border-stone-200">
          <h2 className="text-xl font-bold text-stone-900">Panel de Pacientes</h2>
          <button 
            onClick={() => { setShowInviteModal(true); setGeneratedCode(null); }}
            className="bg-emerald-500 text-white px-5 py-2.5 rounded-xl flex items-center space-x-2 hover:bg-emerald-600 transition-all font-semibold shadow-sm transform active:scale-95"
          >
            <Plus size={20} />
            <span>Invitar Paciente</span>
          </button>
        </header>

        <div className="p-8 space-y-6">
          <div className="flex bg-white rounded-2xl border border-stone-200 px-4 py-3 items-center space-x-3 max-w-md shadow-sm focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all">
            <Search size={20} className="text-stone-400" />
            <input 
              type="text" 
              placeholder="Buscar por nombre o correo..." 
              className="bg-transparent border-none focus:outline-none w-full text-stone-700 text-sm placeholder-stone-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-stone-50 text-stone-500 text-xs uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-8 py-4">Paciente</th>
                  <th className="px-8 py-4">Progreso Hoy</th>
                  <th className="px-8 py-4">Estado</th>
                  <th className="px-8 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-sm">
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-8 py-12 text-center text-stone-400">
                      No se encontraron pacientes.
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-stone-900 text-base">{patient.name}</span>
                          <span className="text-xs text-stone-500">{patient.email}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center space-x-3 max-w-[200px]">
                          <div className="flex-1 bg-stone-100 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-emerald-500 h-full rounded-full" 
                              style={{ width: `65%` }} // Simulation
                            ></div>
                          </div>
                          <span className="text-xs font-bold text-stone-600">65%</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                          ACTIVO (HOY)
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button 
                          onClick={() => navigate(`/nutritionist/patients/${patient.id}`)}
                          className="text-emerald-600 hover:text-emerald-700 font-bold inline-flex items-center space-x-1 transition-colors"
                        >
                          <span>Ver plan</span>
                          <ExternalLink size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-stone-900">
                  {generatedCode ? '¡Invitación Generada! 🎉' : 'Invitar Nuevo Paciente'}
                </h3>
                <button onClick={() => setShowInviteModal(false)} className="text-stone-400 hover:text-stone-600 transition-colors">
                  <X size={24} />
                </button>
              </div>

              {!generatedCode ? (
                <form onSubmit={handleInvite} className="space-y-4">
                  <p className="text-stone-500 text-sm">Registra los datos del paciente para generar su código de acceso único.</p>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1 ml-1">Nombre del Paciente</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ej: María Solís"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      value={inviteData.name}
                      onChange={e => setInviteData({...inviteData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1 ml-1">Correo Electrónico</label>
                    <input 
                      type="email" 
                      required
                      placeholder="maria.solis@correo.com"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      value={inviteData.email}
                      onChange={e => setInviteData({...inviteData, email: e.target.value})}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-emerald-500 text-white font-bold py-4 rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 mt-4"
                  >
                    GENERAR INVITACIÓN
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl text-center">
                    <p className="text-emerald-700 text-xs font-bold uppercase tracking-widest mb-2">Código de Acceso</p>
                    <div className="text-4xl font-black text-emerald-600 tracking-[0.2em]">{generatedCode}</div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-stone-700 text-sm font-bold ml-1">Mensaje para compartir:</p>
                    <div className="bg-stone-50 border border-stone-100 p-4 rounded-xl text-stone-600 text-sm italic relative">
                      "¡Hola {inviteData.name}! He creado tu plan nutricional en Porcio. Usa el código {generatedCode} para empezar hoy: https://porcio.app/login"
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <button 
                      onClick={() => copyToClipboard(`¡Hola ${inviteData.name}! He creado tu plan nutricional en Porcio. Usa el código ${generatedCode} para empezar hoy: https://porcio.app/login`)}
                      className="w-full flex items-center justify-center space-x-2 bg-stone-900 text-white font-bold py-3 rounded-xl hover:bg-stone-800 transition-all"
                    >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                      <span>{copied ? '¡Copiado!' : 'Copiar para WhatsApp'}</span>
                    </button>
                    <button 
                      className="w-full flex items-center justify-center space-x-2 bg-white border border-stone-200 text-stone-700 font-bold py-3 rounded-xl hover:bg-stone-50 transition-all"
                    >
                      <Mail size={18} />
                      <span>Enviar por Correo</span>
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => setShowInviteModal(false)}
                    className="w-full text-stone-400 font-bold py-2 hover:text-stone-600 transition-all text-sm uppercase tracking-widest"
                  >
                    Finalizar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
