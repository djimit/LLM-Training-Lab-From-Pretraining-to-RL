
import React from 'react';

const PipelineArchitectureFlow: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden border-y border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest mb-4">
            Structural Evolution
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">The Pipeline Complexity Shift</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Transitioning from Reinforcement Learning (RL) loops to direct gradient updates.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start relative">
          {/* Central Divider Decor */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-100 -translate-x-1/2"></div>

          {/* PPO Pipeline */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-lg">P</div>
              <h3 className="text-2xl font-bold text-slate-900">PPO Architecture</h3>
            </div>

            <div className="relative space-y-6">
              {/* Node 1 */}
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl relative z-10">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Phase 1: Sampling</p>
                <p className="text-sm font-bold text-slate-800">Rollout (On-Policy Generation)</p>
                <p className="text-xs text-slate-500 mt-1">The model must generate thousands of tokens live to be evaluated.</p>
              </div>
              
              <div className="flex justify-center"><div className="w-0.5 h-6 bg-slate-200"></div></div>

              {/* Node 2 */}
              <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl relative z-10">
                <p className="text-[10px] font-bold text-blue-400 uppercase mb-2">Phase 2: Scoring</p>
                <p className="text-sm font-bold text-slate-800">Query Reward Model (RM)</p>
                <p className="text-xs text-slate-500 mt-1">A separate frozen model scores every generated token sequence.</p>
              </div>

              <div className="flex justify-center"><div className="w-0.5 h-6 bg-slate-200"></div></div>

              {/* Node 3 */}
              <div className="p-6 bg-purple-50 border border-purple-200 rounded-2xl relative z-10">
                <p className="text-[10px] font-bold text-purple-400 uppercase mb-2">Phase 3: Update</p>
                <p className="text-sm font-bold text-slate-800">Actor-Critic Optimization</p>
                <p className="text-xs text-slate-500 mt-1">Syncing Actor, Critic, Ref, and Reward models in VRAM.</p>
              </div>

              {/* Feedback Loop Decor */}
              <div className="absolute top-1/2 -left-4 bottom-10 w-8 border-l-2 border-t-2 border-b-2 border-dashed border-slate-200 rounded-l-2xl -z-0"></div>
            </div>

            <div className="p-6 bg-red-50 border border-red-100 rounded-3xl">
              <h4 className="text-xs font-bold text-red-900 uppercase tracking-widest mb-3">Key Inefficiencies</h4>
              <ul className="space-y-2">
                <li className="text-xs text-red-800 flex items-start gap-2">
                  <span className="shrink-0">⚠️</span> 90% of time spent on slow sampling, not learning.
                </li>
                <li className="text-xs text-red-800 flex items-start gap-2">
                  <span className="shrink-0">⚠️</span> High risk of "Model Collapse" during updates.
                </li>
              </ul>
            </div>
          </div>

          {/* DPO Pipeline */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-500/20">D</div>
              <h3 className="text-2xl font-bold text-slate-900">DPO Architecture</h3>
            </div>

            <div className="relative space-y-6">
              {/* Node 1 */}
              <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl relative z-10">
                <p className="text-[10px] font-bold text-emerald-500 uppercase mb-2">Phase 1: Static Load</p>
                <p className="text-sm font-bold text-slate-800">Binary Preference Dataset</p>
                <p className="text-xs text-slate-500 mt-1">Load static pairs of (Chosen, Rejected) responses. No live sampling.</p>
              </div>
              
              <div className="flex justify-center"><div className="w-0.5 h-6 bg-emerald-200"></div></div>

              {/* Node 2 - The Simplified Step */}
              <div className="p-8 bg-emerald-600 text-white rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <div className="w-24 h-24 border-8 border-white rounded-full"></div>
                </div>
                <p className="text-[10px] font-bold text-emerald-200 uppercase mb-2 tracking-widest">Unified Optimization</p>
                <p className="text-lg font-black mb-1 leading-tight">Implicit Gradient Step</p>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  Math collapses the Reward Model and Policy into a single step. We optimize the log-probability ratio directly.
                </p>
                <div className="mt-6 flex gap-4">
                  <div className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase">No Critic</div>
                  <div className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase">No Sampling</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-widest mb-3">Operational Breakthroughs</h4>
              <ul className="space-y-2">
                <li className="text-xs text-emerald-800 flex items-start gap-2">
                  <span className="shrink-0 text-emerald-500 font-bold">✓</span> Same hardware requirements as standard SFT.
                </li>
                <li className="text-xs text-emerald-800 flex items-start gap-2">
                  <span className="shrink-0 text-emerald-500 font-bold">✓</span> Training is stable, convex, and 10x faster than PPO.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PipelineArchitectureFlow;
