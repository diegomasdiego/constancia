import React, { useState } from 'react';
import { LogOut, User, ChevronLeft, ChevronRight, LayoutDashboard, History, Settings, Plus, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import usePatientData from '../../hooks/usePatientData';
import PortionCard from '../../components/PortionCard';
import UndoBanner from '../../components/UndoBanner';
import { FOOD_GROUPS } from '../../constants';

export default function PatientDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { loading, foodGroups, logsSummary, error, addPortion, removePortion, setLogsSummary } = usePatientData();
  const [undoState, setUndoBanner] = useState(null);
  const [showQuickLog, setShowQuickLog] = useState(false);

  const handleAdd = (foodGroupId) => {
    // Optimistic update
    setLogsSummary(prev => ({
      ...prev,
      [foodGroupId]: { ...prev[foodGroupId], consumed: prev[foodGroupId].consumed + 1 }
    }));

    const group = FOOD_GROUPS.find(g => g.id === foodGroupId) || { name: 'Porción' };
    
    // Clear previous undo if any
    if (undoState) clearTimeout(undoState.timeout);

    const timeout = setTimeout(async () => {
      try {
        await addPortion(foodGroupId);
        setUndoBanner(null);
      } catch (err) {
        console.error('Failed to sync with backend', err);
      }
    }, 5000);

    setUndoBanner({
      foodGroupId,
      message: `¡Porción de ${group.name} agregada!`,
      timeout
    });
  };

  const handleSubtract = async (foodGroupId) => {
    // Direct update (no undo for subtract for simplicity)
    setLogsSummary(prev => ({
      ...prev,
      [foodGroupId]: { ...prev[foodGroupId], consumed: Math.max(0, prev[foodGroupId].consumed - 1) }
    }));
    try {
      await removePortion(foodGroupId);
    } catch (err) {
      console.error('Failed to remove portion', err);
    }
  };

  const handleUndo = () => {
    if (!undoState) return;
    clearTimeout(undoState.timeout);
    
    // Revert optimistic update
    setLogsSummary(prev => ({
      ...prev,
      [undoState.foodGroupId]: { 
        ...prev[undoState.foodGroupId], 
        consumed: Math.max(0, prev[undoState.foodGroupId].consumed - 1) 
      }
    }));
    
    setUndoBanner(null);
  };

  const totalConsumed = Object.values(logsSummary).reduce((acc, curr) => acc + curr.consumed, 0);
  const totalAllowance = Object.values(logsSummary).reduce((acc, curr) => acc + curr.allowance, 0);
  const progressPercent = totalAllowance > 0 ? (totalConsumed / totalAllowance) * 100 : 0;

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-stone-50">Cargando tu plan...</div>;

  if (error === 'NO_PLAN') {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="text-6xl mb-4">🥗</div>
        <h2 className="text-2xl font-bold text-stone-900">¡Hola, {user.name}!</h2>
        <p className="text-stone-600 mt-2 max-w-xs">
          Tu nutriólogo está preparando tu plan de porciones. Te avisaremos en cuanto esté listo.
        </p>
        <button 
          onClick={logout}
          className="mt-8 text-emerald-600 font-semibold flex items-center space-x-2"
        >
          <LogOut size={20} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    );
  }

  const today = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });

  return (
    <div className="min-h-screen bg-stone-50 pb-24 font-sans">
      <header className="bg-white shadow-sm px-4 py-4 flex justify-between items-center sticky top-0 z-30 border-b border-stone-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">P</div>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight">Porcio</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-stone-400 hover:text-emerald-600 transition-colors">
            <User size={24} />
          </button>
          <button onClick={logout} className="text-stone-400 hover:text-red-500 transition-colors">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <main className="p-4 space-y-6 max-w-md mx-auto">
        <div className="flex flex-col items-center space-y-1">
           <h2 className="text-lg font-semibold text-stone-900">¡Hola, {user.name.split(' ')[0]}!</h2>
           <div className="flex items-center space-x-4 text-stone-500 text-sm font-medium">
             <button className="p-1 hover:bg-stone-200 rounded-full transition-colors"><ChevronLeft size={20} /></button>
             <span className="uppercase tracking-wider">HOY ({today})</span>
             <button className="p-1 hover:bg-stone-200 rounded-full transition-colors opacity-30 cursor-not-allowed"><ChevronRight size={20} /></button>
           </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <LayoutDashboard size={80} />
          </div>
          <p className="text-stone-500 text-sm font-medium">Resumen del día</p>
          <h2 className="text-3xl font-bold text-stone-900 mt-1">
            {totalConsumed} <span className="text-stone-400 text-xl font-medium">/ {totalAllowance} porciones</span>
          </h2>
          <div className="w-full bg-stone-100 rounded-full h-3 mt-4 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-stone-400 mt-3 font-medium flex items-center justify-between">
            <span>PROGRESO TOTAL</span>
            <span>{Math.round(progressPercent)}%</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {FOOD_GROUPS.map((group) => {
            const data = logsSummary[group.id];
            if (!data) return null;
            return (
              <PortionCard
                key={group.id}
                group={group}
                consumed={data.consumed}
                allowance={data.allowance}
                onAdd={handleAdd}
                onSubtract={handleSubtract}
              />
            );
          })}
        </div>
      </main>

      {/* FAB */}
      <button 
        onClick={() => setShowQuickLog(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-all transform active:scale-90 z-40"
      >
        <Plus size={32} />
      </button>

      {/* Quick Log Modal */}
      {showQuickLog && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4 sm:p-0">
          <div 
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setShowQuickLog(false)}
          ></div>
          <div className="bg-white w-full max-w-md rounded-t-[2.5rem] sm:rounded-3xl shadow-2xl z-10 p-8 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-2xl font-bold text-stone-900">Registrar</h3>
               <button onClick={() => setShowQuickLog(false)} className="p-2 bg-stone-100 rounded-full text-stone-400">
                 <X size={20} />
               </button>
            </div>
            
            <p className="text-stone-500 font-medium mb-6">¿Qué consumiste hoy?</p>
            
            <div className="grid grid-cols-2 gap-4">
               {FOOD_GROUPS.map(group => (
                 <button
                   key={group.id}
                   onClick={() => {
                     handleAdd(group.id);
                     setShowQuickLog(false);
                   }}
                   className={`flex flex-col items-center justify-center p-6 rounded-3xl border ${group.border} ${group.bg} hover:brightness-95 transition-all space-y-2`}
                 >
                   <span className="text-3xl">{group.icon}</span>
                   <span className={`text-sm font-bold ${group.text}`}>{group.name}</span>
                 </button>
               ))}
            </div>
            
            <button 
              onClick={() => setShowQuickLog(false)}
              className="w-full mt-8 py-4 text-stone-400 font-bold uppercase tracking-widest text-xs"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {undoState && (
        <UndoBanner
          message={undoState.message}
          onUndo={handleUndo}
          onExpire={() => setUndoBanner(null)}
        />
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-stone-200 flex justify-around p-3 pb-6 z-40">
        <button className="text-emerald-600 flex flex-col items-center space-y-1">
          <LayoutDashboard size={24} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Hoy</span>
        </button>
        <button 
          onClick={() => navigate('/patient/progress')}
          className="text-stone-400 flex flex-col items-center space-y-1 hover:text-emerald-500 transition-colors"
        >
          <History size={24} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Historial</span>
        </button>
        <button className="text-stone-400 flex flex-col items-center space-y-1 hover:text-emerald-500 transition-colors">
          <Settings size={24} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Ajustes</span>
        </button>
      </nav>
    </div>
  );
}
