
import React from 'react';

interface StageCardProps {
  title: string;
  subtitle: string;
  description: string;
  goal: string;
  data: string;
  math: string;
  color: string;
  isActive: boolean;
  onClick: () => void;
}

const StageCard: React.FC<StageCardProps> = ({
  title, subtitle, description, goal, data, math, color, isActive, onClick
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      aria-label={`${title}: ${subtitle}`}
      className={`w-full text-left cursor-pointer transition-all duration-300 p-6 rounded-2xl border-2 focus:outline-none focus:ring-4 focus:ring-offset-2 ${
        isActive
          ? `${color} text-white shadow-xl scale-105 focus:ring-white/50`
          : 'bg-white border-slate-100 hover:border-slate-300 shadow-sm hover:shadow-md focus:ring-slate-900/20'
      }`}
    >
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <p className={`text-sm font-medium mb-4 ${isActive ? 'text-white/80' : 'text-slate-500'}`}>{subtitle}</p>

      <div className={`space-y-3 ${isActive ? 'text-white' : 'text-slate-600'}`}>
        <p className="text-sm italic">"{description}"</p>
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/20">
          <div>
            <span className="block text-[10px] uppercase font-bold tracking-wider opacity-60">Primary Goal</span>
            <span className="text-xs font-semibold">{goal}</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase font-bold tracking-wider opacity-60">Objective</span>
            <span className="text-xs font-semibold">{math}</span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default StageCard;
