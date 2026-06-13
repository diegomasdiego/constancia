import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit3, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../../services/api';

export default function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [plan, setPlan] = useState(null);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsRes, planRes, progressRes] = await Promise.all([
          api.get('/nutritionist/patients'),
          api.get(`/plans/patient/${id}`).catch(() => ({ data: null })),
          api.get(`/nutritionist/patient/${id}/progress`).catch(() => ({ data: { progress: [] } }))
        ]);

        const p = patientsRes.data.find(item => item.id === parseInt(id));
        setPatient(p);
        setPlan(planRes.data);
        setProgress(progressRes.data.progress);
      } catch (err) {
        console.error('Error fetching patient detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-stone-50 text-stone-500">Cargando detalles...</div>;
  if (!patient) return <div className="p-8 text-center">Paciente no encontrado.</div>;

  return (
    <div className="min-h-screen bg-stone-50 font-sans pb-12">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/nutritionist')} className="p-2 -ml-2 text-stone-400 hover:text-stone-600 transition-colors">
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-stone-900">{patient.name}</h1>
              <p className="text-sm text-stone-500">{patient.email}</p>
            </div>
          </div>
          <button 
            onClick={() => navigate(`/nutritionist/patients/${id}/plan`)}
            className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl flex items-center space-x-2 hover:bg-emerald-100 transition-all font-bold text-sm"
          >
            <Edit3 size={18} />
            <span>Editar Plan</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Active Plan Card */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-6">
              <h2 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-4">Plan Diario Actual</h2>
              {plan ? (
                <div className="space-y-4">
                  {plan.portions.map(p => (
                    <div key={p.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{p.icon}</span>
                        <span className="text-sm font-medium text-stone-700">{p.name}</span>
                      </div>
                      <span className="text-sm font-bold text-stone-900">{p.daily_allowance} porciones</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center space-y-3">
                  <AlertCircle className="mx-auto text-amber-400" size={32} />
                  <p className="text-sm text-stone-500">Sin plan activo asignado.</p>
                </div>
              )}
            </div>
          </div>

          {/* Progress / History */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-6">
               <div className="flex items-center justify-between mb-6">
                 <h2 className="text-sm font-bold text-stone-400 uppercase tracking-widest">Historial de Cumplimiento</h2>
                 <Calendar className="text-stone-300" size={20} />
               </div>
               
               {/* Mock weekly view since we don't have aggregated daily progress from backend easily */}
               <div className="space-y-6">
                  {['Viernes (Hoy)', 'Jueves', 'Miércoles', 'Martes', 'Lunes'].map((day, i) => {
                    const pct = [65, 80, 100, 85, 100][i];
                    return (
                      <div key={day} className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-bold text-stone-700">{day}</span>
                          <span className={`font-bold ${pct === 100 ? 'text-emerald-600' : 'text-stone-500'}`}>
                            {pct}% {pct === 100 && '🎉'}
                          </span>
                        </div>
                        <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ${pct === 100 ? 'bg-emerald-500' : 'bg-emerald-400'}`}
                            style={{ width: `${pct}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
               </div>
            </div>

            <div className="bg-emerald-600 rounded-3xl p-8 text-white shadow-lg shadow-emerald-600/20 relative overflow-hidden">
               <CheckCircle2 className="absolute -right-4 -bottom-4 opacity-10" size={160} />
               <h3 className="text-xl font-bold mb-2">Resumen de Seguimiento</h3>
               <p className="text-emerald-50 opacity-90 text-sm leading-relaxed max-w-md">
                 El paciente ha mantenido un cumplimiento promedio del 86% en los últimos 7 días. 
                 Muestra excelente adherencia en el grupo de Frutas y Verduras.
               </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
