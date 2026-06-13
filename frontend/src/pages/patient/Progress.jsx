import React from 'react';
import { ChevronLeft, LayoutDashboard, History, Settings, Flame, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Progress() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Mock data for the week
  const weekDays = [
    { day: 'L', date: '9', pct: 100, completed: true },
    { day: 'M', date: '10', pct: 85, completed: false },
    { day: 'M', date: '11', pct: 100, completed: true },
    { day: 'J', date: '12', pct: 80, completed: false },
    { day: 'V', date: '13', pct: 65, completed: false },
    { day: 'S', date: '14', pct: 0, completed: false },
    { day: 'D', date: '15', pct: 0, completed: false },
  ];

  return (
    <div className="min-h-screen bg-stone-50 pb-24 font-sans">
      <header className="bg-white shadow-sm px-4 py-4 flex justify-between items-center sticky top-0 z-30 border-b border-stone-100">
        <div className="flex items-center space-x-2">
          <button onClick={() => navigate('/patient')} className="p-1 -ml-1 text-stone-400">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight">Mi Progreso</h1>
        </div>
      </header>

      <main className="p-4 space-y-6 max-w-md mx-auto">
        {/* Streak Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 flex items-center space-x-4">
          <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
            <Flame size={32} fill="currentColor" />
          </div>
          <div>
            <p className="text-stone-500 text-sm font-medium uppercase tracking-wider text-[10px]">Racha Actual</p>
            <h2 className="text-2xl font-bold text-stone-900">5 días seguidos</h2>
            <p className="text-stone-400 text-xs mt-0.5">¡Excelente trabajo! Sigue así.</p>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 space-y-4">
          <div className="flex justify-between items-end pb-2 border-b border-stone-50">
            <h3 className="font-bold text-stone-900">Esta Semana</h3>
            <span className="text-xs text-stone-400 font-medium uppercase">Junio 9 - 15</span>
          </div>
          
          <div className="flex justify-between items-end h-40 pt-4 px-2">
            {weekDays.map((wd, i) => (
              <div key={i} className="flex flex-col items-center space-y-2 group">
                <div className="relative w-8 flex flex-col justify-end h-32">
                  {/* Tooltip */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-stone-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 font-bold">
                    {wd.pct}%
                  </div>
                  <div className="w-full bg-stone-50 rounded-full h-full absolute top-0"></div>
                  <div 
                    className={`w-full rounded-full transition-all duration-1000 ease-out ${wd.completed ? 'bg-emerald-500' : 'bg-emerald-200'}`}
                    style={{ height: `${wd.pct}%` }}
                  ></div>
                </div>
                <div className="flex flex-col items-center">
                  <span className={`text-[10px] font-bold ${wd.pct > 0 ? 'text-stone-900' : 'text-stone-300'}`}>{wd.day}</span>
                  <span className="text-[10px] text-stone-400">{wd.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats breakdown */}
        <div className="space-y-4">
          <h3 className="font-bold text-stone-900 px-2 flex items-center space-x-2">
            <TrendingUp size={18} className="text-emerald-500" />
            <span>Desglose de Hoy</span>
          </h3>
          
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 space-y-4">
             <div className="flex justify-between items-center text-sm">
               <span className="text-stone-600 font-medium">Cereales</span>
               <span className="font-bold text-stone-900">3 / 5 (60%)</span>
             </div>
             <div className="w-full bg-stone-50 rounded-full h-1.5 overflow-hidden">
               <div className="bg-amber-400 h-full w-[60%]"></div>
             </div>

             <div className="flex justify-between items-center text-sm">
               <span className="text-stone-600 font-medium">Verduras</span>
               <span className="font-bold text-emerald-600">4 / 4 (100%) 🎉</span>
             </div>
             <div className="w-full bg-stone-50 rounded-full h-1.5 overflow-hidden">
               <div className="bg-emerald-500 h-full w-[100%]"></div>
             </div>

             <div className="flex justify-between items-center text-sm">
               <span className="text-stone-600 font-medium">Frutas</span>
               <span className="font-bold text-emerald-600">3 / 3 (100%) 🎉</span>
             </div>
             <div className="w-full bg-stone-50 rounded-full h-1.5 overflow-hidden">
               <div className="bg-emerald-500 h-full w-[100%]"></div>
             </div>
          </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-stone-200 flex justify-around p-3 pb-6 z-40">
        <button onClick={() => navigate('/patient')} className="text-stone-400 flex flex-col items-center space-y-1 hover:text-emerald-500 transition-colors">
          <LayoutDashboard size={24} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Hoy</span>
        </button>
        <button className="text-emerald-600 flex flex-col items-center space-y-1">
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
