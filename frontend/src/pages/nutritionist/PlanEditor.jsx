import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Save, Plus, Minus, CheckCircle2 } from 'lucide-react';
import api from '../../services/api';
import { FOOD_GROUPS } from '../../constants';

export default function PlanEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [portions, setPortions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsRes, planRes] = await Promise.all([
          api.get('/nutritionist/patients'),
          api.get(`/plans/patient/${id}`).catch(() => ({ data: null }))
        ]);

        const p = patientsRes.data.find(item => item.id === parseInt(id));
        setPatient(p);

        // Initialize portions from existing plan or defaults
        const initialPortions = FOOD_GROUPS.map(group => {
          const existing = planRes.data?.portions?.find(pp => pp.food_group_id === group.id);
          return {
            food_group_id: group.id,
            name: group.name,
            icon: group.icon,
            daily_allowance: existing ? existing.daily_allowance : 0
          };
        });
        setPortions(initialPortions);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const updateAllowance = (groupId, delta) => {
    setPortions(prev => prev.map(p => 
      p.food_group_id === groupId 
        ? { ...p, daily_allowance: Math.max(0, p.daily_allowance + delta) }
        : p
    ));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.post('/plans', {
        patient_id: parseInt(id),
        portions: portions.map(p => ({
          food_group_id: p.food_group_id,
          daily_allowance: p.daily_allowance
        }))
      });
      setSuccess(true);
      setTimeout(() => navigate(`/nutritionist/patients/${id}`), 1500);
    } catch (err) {
      console.error('Error saving plan:', err);
      alert('Error al guardar el plan.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-stone-50 text-stone-500">Cargando editor...</div>;

  return (
    <div className="min-h-screen bg-stone-50 font-sans pb-12">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate(`/nutritionist/patients/${id}`)} className="p-2 -ml-2 text-stone-400 hover:text-stone-600 transition-colors">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-xl font-bold text-stone-900">Configurar Plan</h1>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving || success}
            className="bg-emerald-500 text-white px-6 py-2 rounded-xl flex items-center space-x-2 hover:bg-emerald-600 disabled:opacity-50 transition-all font-bold shadow-sm"
          >
            {saving ? <span>Guardando...</span> : success ? <CheckCircle2 size={20} /> : <Save size={18} />}
            {!saving && !success && <span>Guardar Plan</span>}
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="p-6 border-b border-stone-100 bg-stone-50/50">
            <h2 className="text-sm font-bold text-stone-400 uppercase tracking-widest">Paciente</h2>
            <p className="text-lg font-bold text-stone-900">{patient?.name}</p>
          </div>
          
          <div className="divide-y divide-stone-100">
            {portions.map((portion) => (
              <div key={portion.food_group_id} className="p-6 flex items-center justify-between hover:bg-stone-50/30 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white border border-stone-100 rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                    {portion.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900">{portion.name}</h3>
                    <p className="text-xs text-stone-500 italic">
                      {portion.daily_allowance > 0 
                        ? `${portion.daily_allowance} porciones diarias` 
                        : 'Sin asignar'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => updateAllowance(portion.food_group_id, -1)}
                    className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:bg-white hover:text-red-500 hover:border-red-100 transition-all"
                  >
                    <Minus size={20} />
                  </button>
                  <div className="w-12 text-center">
                    <span className="text-2xl font-black text-stone-900">{portion.daily_allowance}</span>
                  </div>
                  <button 
                    onClick={() => updateAllowance(portion.food_group_id, 1)}
                    className="w-10 h-10 rounded-full border border-emerald-100 bg-emerald-50 flex items-center justify-center text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-amber-50 border border-amber-100 p-6 rounded-3xl flex items-start space-x-4">
          <div className="bg-amber-100 p-2 rounded-xl text-amber-600">
            <Save size={20} />
          </div>
          <div>
            <h4 className="font-bold text-amber-900 text-sm uppercase tracking-tight">Nota Importante</h4>
            <p className="text-amber-800/80 text-sm mt-1 leading-relaxed">
              Al guardar el plan, se desactivará automáticamente cualquier plan previo del paciente. 
              El paciente verá los cambios instantáneamente en su aplicación.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
