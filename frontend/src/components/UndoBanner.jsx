import React, { useState, useEffect } from 'react';

export default function UndoBanner({ message, onUndo, duration = 5000, onExpire }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, duration - elapsed);
      setTimeLeft(remaining);
      if (remaining === 0) {
        clearInterval(interval);
        onExpire();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [duration, onExpire]);

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 bg-stone-900 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between border border-stone-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center space-x-3">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="16"
              cy="16"
              r="14"
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              className="text-stone-700"
            />
            <circle
              cx="16"
              cy="16"
              r="14"
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              strokeDasharray={88}
              strokeDashoffset={88 - (timeLeft / duration) * 88}
              className="text-emerald-500 transition-all duration-100"
            />
          </svg>
          <span className="absolute text-[10px] font-bold">{Math.ceil(timeLeft / 1000)}s</span>
        </div>
        <span className="text-sm font-medium">{message}</span>
      </div>
      <button
        onClick={onUndo}
        className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-emerald-400 font-bold rounded-xl text-sm transition-colors uppercase"
      >
        Deshacer
      </button>
    </div>
  );
}
