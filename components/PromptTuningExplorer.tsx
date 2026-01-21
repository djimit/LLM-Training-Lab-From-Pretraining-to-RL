
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const PEFT_DATA = [
  { name: 'Full Fine-Tuning', params: 100, vram: 90, speed: 20 },
  { name: 'LoRA', params: 0.1, vram: 30, speed: 80 },
  { name: 'Prompt Tuning', params: 0.001, vram: 15, speed: 95 },
];

const PromptTuningExplorer: React.FC = () => {
  const [method, setMethod] = useState<'full' | 'prompt'>('prompt');

  const stats = {
    full: {
      params: "100%",
      compute: "Very High",
      storage: "Huge (~150GB+)",
      flexibility: "Low (1 model per task)",
      color: "bg-red-500",
      textColor: "text-red-500",
      description: "In Full Fine-Tuning, every single weight in the model (e.g., 70 Billion parameters) is updated. This essentially creates a completely new copy of the model for every specific task."
    },
    prompt: {
      params: "< 0.01%",
      compute: "Low",
      storage: "Small (~10MB)",
      flexibility: "High (1 base model, many task-prompts)",
      color: "bg-emerald-500",
      textColor: "text-emerald-500",
      description: "Prompt Tuning keeps the entire LLM frozen. It only trains a small 'Soft Prompt'—a set of learnable vectors that act as a prefix to your input, steering the model's behavior without altering its core knowledge."
    }
  };

  const current = stats[method];

  return (
    <section className="py-24 px-6 bg-white border-y border-slate-100 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-widest mb-4">
            PEFT: Parameter Efficient Fine-Tuning
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Efficiency Breakthrough: Prompt Tuning</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Prompt Tuning isn't just about speed—it's about a modular architecture where one base model can support thousands of specialized skills simultaneously.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Visual Visualization */}
          <div className="space-y-8">
            <div className="relative group">
              <div className="bg-slate-900 rounded-[2.5rem] p-10 min-h-[400px] flex flex-col justify-between shadow-2xl relative">
                <div className="absolute top-0 right-0 p-8">
                  <div className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${method === 'full' ? 'border-red-500/30 text-red-400 bg-red-500/10' : 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'}`}>
                    {method === 'full' ? 'Full Fine-Tuning' : 'Soft Prompt Injection'}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    Model Parameter Map
                  </h4>
                  
                  <div className="grid grid-cols-10 gap-1.5 opacity-80">
                    {Array.from({ length: 100 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-4 rounded-sm transition-all duration-700 ${
                          method === 'full' 
                            ? 'bg-red-400/80 shadow-[0_0_8px_rgba(248,113,113,0.4)]' 
                            : i < 3 ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)] animate-pulse' : 'bg-slate-700 opacity-20'
                        }`}
                      ></div>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-4 font-mono">
                    {method === 'full' ? '> GRADS_FLOW: ALL_LAYERS' : '> GRADS_FLOW: INPUT_PREFIX_ONLY'}
                  </p>
                </div>

                <div className="mt-8">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Trainable Weights</p>
                      <p className={`text-3xl font-black transition-colors duration-500 ${current.textColor}`}>
                        {current.params}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Status</p>
                      <p className="text-white font-bold text-sm">
                        {method === 'full' ? 'Updating 175B+ Params' : 'Updating ~10k Params'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-[80px] opacity-20 transition-colors duration-700 ${method === 'full' ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
              </div>
              
              <div className="mt-8 flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
                <button 
                  onClick={() => setMethod('full')}
                  className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm transition-all ${method === 'full' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:bg-white/50'}`}
                >
                  Full Fine-Tuning
                </button>
                <button 
                  onClick={() => setMethod('prompt')}
                  className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm transition-all ${method === 'prompt' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:bg-white/50'}`}
                >
                  Prompt Tuning
                </button>
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 text-center">Efficiency Scorecard</h4>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={PEFT_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <YAxis hide />
                    <Tooltip 
                      cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px' }}
                    />
                    <Bar dataKey="vram" name="VRAM Usage" radius={[4, 4, 0, 0]}>
                      {PEFT_DATA.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={index === 2 ? '#10b981' : index === 1 ? '#3b82f6' : '#ef4444'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-center text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest">Relative VRAM requirements</p>
            </div>
          </div>

          {/* Explanation Content */}
          <div className="space-y-8">
            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{method === 'full' ? 'The Cost of Perfection' : 'The Magic of Soft Prompts'}</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {current.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:border-emerald-200 transition-colors">
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Storage Cost</h5>
                <p className="text-xl font-black text-slate-900">{current.storage}</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">Disk space required</p>
              </div>
              <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:border-emerald-200 transition-colors">
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">GPU Memory</h5>
                <p className="text-xl font-black text-slate-900">{current.compute}</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">VRAM requirement</p>
              </div>
            </div>

            {/* Hard vs Soft Prompt Toggle Area */}
            <div className="p-8 bg-blue-900 rounded-[2.5rem] text-white relative overflow-hidden">
               <div className="relative z-10">
                 <h4 className="text-sm font-bold text-blue-300 uppercase tracking-widest mb-4">Hard vs Soft Prompts</h4>
                 <div className="space-y-4">
                   <div className="flex gap-4 items-start">
                     <div className="w-8 h-8 rounded-lg bg-blue-800 flex items-center justify-center font-bold text-xs shrink-0">H</div>
                     <div>
                       <p className="text-sm font-bold">Hard Prompts (Discrete)</p>
                       <p className="text-xs text-blue-200/70 leading-relaxed">Regular text like "Write a poem:". Limited by the vocabulary tokens humans can read.</p>
                     </div>
                   </div>
                   <div className="flex gap-4 items-start">
                     <div className="w-8 h-8 rounded-lg bg-emerald-500 text-emerald-950 flex items-center justify-center font-bold text-xs shrink-0">S</div>
                     <div>
                       <p className="text-sm font-bold">Soft Prompts (Continuous)</p>
                       <p className="text-xs text-emerald-200 leading-relaxed">Abstract vectors learned by gradients. They occupy "between" token spaces that no human word can describe.</p>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
            </div>

            <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span>🛡️</span> Prevention of Catastrophic Forgetting
              </h4>
              <p className="text-xs text-emerald-800/80 leading-relaxed">
                Because core weights are <strong>never modified</strong>, the model can't "forget" how to speak or reason. This makes Prompt Tuning the safest method for multi-tenant applications where stability is non-negotiable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromptTuningExplorer;
