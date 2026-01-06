
import React from 'react';

const AlignmentTechnicalSpecs: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-slate-50 border-y border-slate-200 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">The Modern Alignment Frontier</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Compare the structural mechanics of traditional Reinforcement Learning (PPO) against the streamlined Direct Preference Optimization (DPO).
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 bg-white rounded-[3rem] shadow-2xl border border-slate-200 overflow-hidden">
          {/* PPO Column */}
          <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-slate-100">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-lg">P</div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 leading-none mb-1">PPO Pipeline</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Reinforcement Learning</p>
              </div>
            </div>

            <div className="space-y-12">
              {/* Architecture Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Architecture</h4>
                  <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-600 font-bold">4 Models</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-center">
                    <p className="text-[10px] font-bold text-blue-800 uppercase">Actor</p>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl text-center">
                    <p className="text-[10px] font-bold text-purple-800 uppercase">Critic</p>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-center">
                    <p className="text-[10px] font-bold text-emerald-800 uppercase">Reward</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center opacity-50">
                    <p className="text-[10px] font-bold text-slate-800 uppercase">Ref</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed italic">Requires complex synchronization between actor and critic gradients.</p>
              </div>

              {/* Cost Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Computational Cost</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold mb-1 uppercase"><span>VRAM Overhead</span> <span className="text-red-500">Very High</span></div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-400 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-bold mb-1 uppercase"><span>Training Time</span> <span className="text-red-500">Slow (Active Sampling)</span></div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-400 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stability Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Training Stability</h4>
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl relative overflow-hidden group">
                  <div className="relative z-10">
                    <p className="text-xs text-red-800 font-medium mb-1 italic">"Unstable & Fragile"</p>
                    <p className="text-[10px] text-red-600 leading-relaxed">Susceptible to KL-divergence collapse and sensitive reward-hacking exploits.</p>
                  </div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-red-200/20 -mr-12 -mb-12 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* DPO Column */}
          <div className="p-8 md:p-12 bg-emerald-900 text-white relative">
            <div className="absolute top-0 right-0 p-8">
              <div className="w-16 h-16 border-4 border-emerald-500/20 rounded-full animate-ping opacity-20"></div>
            </div>

            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-400 text-emerald-900 flex items-center justify-center font-black text-xl shadow-lg shadow-emerald-500/20">D</div>
              <div>
                <h3 className="text-2xl font-bold text-emerald-50 leading-none mb-1">DPO Shortcut</h3>
                <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Direct Optimization</p>
              </div>
            </div>

            <div className="space-y-12">
              {/* Architecture Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Architecture</h4>
                  <span className="text-[10px] bg-emerald-800 px-2 py-1 rounded text-emerald-300 font-bold border border-emerald-700">2 Models</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-emerald-500 rounded-xl text-center shadow-lg shadow-emerald-500/20">
                    <p className="text-[10px] font-bold text-emerald-950 uppercase">Main Policy</p>
                  </div>
                  <div className="p-3 bg-emerald-800/50 border border-emerald-700 rounded-xl text-center">
                    <p className="text-[10px] font-bold text-emerald-400 uppercase">Static Ref</p>
                  </div>
                  <div className="col-span-2 p-3 border-2 border-dashed border-emerald-700 rounded-xl text-center opacity-40">
                    <p className="text-[10px] font-bold text-emerald-600 uppercase">No Separate Reward/Value Model</p>
                  </div>
                </div>
                <p className="text-xs text-emerald-300/60 leading-relaxed italic">Implicit reward is extracted directly from the policy log-ratios.</p>
              </div>

              {/* Cost Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Computational Cost</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold mb-1 uppercase"><span>VRAM Overhead</span> <span className="text-emerald-400">Low (Same as SFT)</span></div>
                    <div className="h-1.5 w-full bg-emerald-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-bold mb-1 uppercase"><span>Training Time</span> <span className="text-emerald-400">Fast (Offline)</span></div>
                    <div className="h-1.5 w-full bg-emerald-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stability Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Training Stability</h4>
                <div className="p-4 bg-emerald-800/50 border border-emerald-700 rounded-2xl relative overflow-hidden">
                  <p className="text-xs text-emerald-100 font-medium mb-1 italic">"Robust & Stable"</p>
                  <p className="text-[10px] text-emerald-300/80 leading-relaxed">Behaves like standard supervised training. No actor-critic oscillation or live generation noise.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlignmentTechnicalSpecs;
