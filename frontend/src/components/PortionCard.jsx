import React, { useState, useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';

export default function PortionCard({ group, consumed, allowance, onAdd, onSubtract }) {
  const isCompleted = consumed >= allowance;
  const isExceeded = consumed > allowance;

  return (
    <div className={`bg-white shadow-sm border ${isExceeded ? 'border-amber-200 bg-amber-50/30' : 'border-stone-100'} rounded-2xl p-4 flex flex-col space-y-3 transition-all`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className={`${group.bg} ${group.text} w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm`}>
            {group.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-stone-900">{group.name}</h3>
            {isExceeded ? (
              <span className="text-xs font-medium text-amber-700">Has superado la porción ideal</span>
            ) : isCompleted ? (
              <span className="text-xs font-medium text-emerald-600">¡Meta cumplida! 🎉</span>
            ) : (
              <span className="text-xs text-stone-500">Quedan: {allowance - consumed}</span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onSubtract(group.id)}
            disabled={consumed <= 0}
            className={`w-8 h-8 rounded-full flex items-center justify-center border border-stone-200 text-stone-400 hover:bg-stone-50 transition-colors ${consumed <= 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
          >
            <Minus size={18} />
          </button>
          <div className="text-lg font-bold text-stone-900 min-w-[3rem] text-center">
            <span className={isExceeded ? 'text-amber-600' : isCompleted ? 'text-emerald-600' : ''}>
              {consumed}
            </span>
            <span className="text-stone-400 font-medium"> / {allowance}</span>
          </div>
          <button
            onClick={() => onAdd(group.id)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${group.primary} hover:brightness-110 shadow-sm transition-all transform active:scale-95`}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${isExceeded ? 'bg-amber-500' : 'bg-emerald-500'}`}
          style={{ width: `${Math.min((consumed / allowance) * 100, 100)}%` }}
        ></div>
      </div>
    </div>
  );
}
