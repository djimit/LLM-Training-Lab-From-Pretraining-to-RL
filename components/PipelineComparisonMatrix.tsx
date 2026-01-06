
import React, { useState } from 'react';

const PipelineComparisonMatrix: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'tradeoffs'>('architecture');

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest mb-4">
            The Algorithmic Battle
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">PPO vs. DPO Comparison</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Understanding the structural shift from Reinforcement Learning (RL) loops to direct preference gradients.
          </p>
          
          <div className="mt-8 flex justify-center gap-2">
            <button 
              onClick={() => setActiveTab('architecture')}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all border-2 ${activeTab === 'architecture' ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'}`}
            >
              Pipeline Visualizer
            </button>
            <button 
              onClick={() => setActiveTab('tradeoffs')}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all border-2 ${activeTab === 'tradeoffs' ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'}`}
            >
              Technical Scorecard
            </button>
          </div>
        </div>

        {activeTab === 'architecture' ? (
          <div className="grid md:grid-cols-2 gap-12 animate-in fade-in zoom-in-95 duration-500">
            {/* PPO Pipeline Diagram */}
            <div className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100 relative group">
              <div className="absolute top-6 right-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Legacy Flow</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-10 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">A</span>
                PPO (RLHF)
              </h3>
              
              <div className="space-y-6 relative">
                {/* Visual Flow */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full p-4 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Step 1</p>
                    <p className="text-sm font-bold">Generate Tokens (On-Policy)</p>
                  </div>
                  <div className="w-0.5 h-6 bg-slate-200"></div>
                  <div className="w-full p-4 bg-white rounded-2xl border border-blue-200 shadow-sm text-center">
                    <p className="text-[10px] font-bold text-blue-400 uppercase mb-1">Step 2</p>
                    <p className="text-sm font-bold">Query Reward Model (RM)</p>
                  </div>
                  <div className="w-0.5 h-6 bg-slate-200"></div>
                  <div className="w-full p-4 bg-white rounded-2xl border border-purple-200 shadow-sm text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                    <p className="text-[10px] font-bold text-purple-400 uppercase mb-1">Step 3</p>
                    <p className="text-sm font-bold">Update Actor + Critic Loop</p>
                  </div>
                </div>
                
                <div className="mt-10 p-5 bg-red-50 rounded-2xl border border-red-100">
                  <h4 className="text-xs font-bold text-red-900 uppercase mb-2">Complexity Warning</h4>
                  <p className="text-xs text-red-700 leading-relaxed">
                    Must manage 4 separate model weights in VRAM (Actor, Critic, Reward, Ref). 90% of time is spent on token generation, not optimization.
                  </p>
                </div>
              </div>
            </div>

            {/* DPO Pipeline Diagram */}
            <div className="bg-emerald-900 rounded-[3rem] p-10 text-white relative group shadow-2xl">
              <div className="absolute top-6 right-8 text-[10px] font-black text-emerald-500/50 uppercase tracking-[0.2em]">Modern Flow</div>
              <h3 className="text-2xl font-bold text-white mb-10 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-emerald-400 text-emerald-950 flex items-center justify-center text-xs">B</span>
                DPO (Implicit)
              </h3>
              
              <div className="space-y-6 relative">
                {/* Visual Flow */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full p-4 bg-emerald-800/50 rounded-2xl border border-emerald-700 shadow-sm text-center">
                    <p className="text-[10px] font-bold text-emerald-500 uppercase mb-1">Step 1</p>
                    <p className="text-sm font-bold">Load Pre-Ranked (y_w, y_l) Pairs</p>
                  </div>
                  <div className="w-0.5 h-6 bg-emerald-700/50"></div>
                  <div className="w-full p-6 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/20 text-center text-emerald-950">
                    <p className="text-[10px] font-bold uppercase mb-1 opacity-60">Step 2 (Unified)</p>
                    <p className="text-sm font-black">Direct Gradient Update</p>
                    <p className="text-[10px] mt-1 font-bold">Loss = Log(Policy Ratio)</p>
                  </div>
                </div>

                <div className="mt-20 py-10 border-2 border-dashed border-emerald-700/50 rounded-3xl text-center">
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2">Eliminated Components</p>
                  <p className="text-sm font-bold text-emerald-300 opacity-60">No Reward Model Training</p>
                  <p className="text-sm font-bold text-emerald-300 opacity-60">No Live Token Sampling</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 rounded-[3rem] p-8 md:p-16 border border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-6 font-bold text-slate-400 uppercase tracking-widest text-xs">Metric</th>
                    <th className="py-6 font-bold text-slate-900 text-lg px-8">Traditional PPO</th>
                    <th className="py-6 font-bold text-emerald-600 text-lg">Modern DPO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-8 align-top">
                      <p className="font-bold text-slate-800">Architecture</p>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase">Models in Memory</p>
                    </td>
                    <td className="py-8 px-8 align-top">
                      <p className="text-sm font-medium">4 Active Models</p>
                      <p className="text-xs text-slate-500 mt-1 italic">(Policy, Critic, Reward, Ref)</p>
                    </td>
                    <td className="py-8 align-top">
                      <p className="text-sm font-bold text-emerald-700">2 Models</p>
                      <p className="text-xs text-emerald-600/70 mt-1 italic">(Policy, Static Ref)</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-8 align-top">
                      <p className="font-bold text-slate-800">Training Data</p>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase">Requirements</p>
                    </td>
                    <td className="py-8 px-8 align-top">
                      <p className="text-sm font-medium">Rankings + On-Policy Samples</p>
                    </td>
                    <td className="py-8 align-top">
                      <p className="text-sm font-bold text-emerald-700">Binary Preference Pairs</p>
                      <p className="text-xs text-emerald-600/70 mt-1 italic">(Chosen vs Rejected)</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-8 align-top">
                      <p className="font-bold text-slate-800">Computational Cost</p>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase">GPU Utilization</p>
                    </td>
                    <td className="py-8 px-8 align-top">
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-[10px] font-bold uppercase">Very High</span>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">Most GPU cycles wasted on text generation.</p>
                    </td>
                    <td className="py-8 align-top">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold uppercase">Low (SFT Speed)</span>
                      <p className="text-xs text-emerald-600 mt-2 leading-relaxed">Training is 5-10x faster than PPO.</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-8 align-top">
                      <p className="font-bold text-slate-800">Stability</p>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase">Failure Probability</p>
                    </td>
                    <td className="py-8 px-8 align-top">
                      <p className="text-sm font-medium">Sensitive / Unstable</p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">Requires hyperparameter tuning (KL weight, clip range).</p>
                    </td>
                    <td className="py-8 align-top">
                      <p className="text-sm font-bold text-emerald-700">Robust / Convex</p>
                      <p className="text-xs text-emerald-600 mt-1 leading-relaxed">Behaves like standard classification training.</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-16 p-8 bg-blue-50 border border-blue-100 rounded-[2rem] flex flex-col md:flex-row items-center gap-8">
           <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-lg shadow-blue-500/20">
             ⚡
           </div>
           <div>
             <h4 className="text-xl font-bold text-blue-900 mb-2">The Convergence Factor</h4>
             <p className="text-sm text-blue-800/70 leading-relaxed italic">
               DPO has largely replaced PPO for consumer LLMs because it bypasses the "Reward Hacking" phase entirely. By optimizing the log-probability margin directly, the model learns a robust preference without a separate, fallible judge model.
             </p>
           </div>
        </div>
      </div>
    </section>
  );
};

export default PipelineComparisonMatrix;
