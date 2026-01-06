
import React, { useState } from 'react';

const PipelineDeepDive: React.FC = () => {
  const [view, setView] = useState<'ppo' | 'dpo'>('ppo');

  const ppoSteps = [
    { title: "SFT Baseline", desc: "Start with a supervised model trained on high-quality instructions." },
    { title: "Reward Modeling", desc: "Train a separate classifier to predict which of two answers a human prefers. This requires its own dataset and training phase." },
    { title: "Active Sampling", desc: "The model must generate thousands of tokens 'on-policy' during training to get feedback from the Reward Model." },
    { title: "Actor-Critic Loop", desc: "Update the policy using PPO. Requires balancing the Actor, Critic, Reward Model, and Reference Model simultaneously." }
  ];

  const dpoSteps = [
    { title: "SFT Baseline", desc: "Identical starting point: a supervised fine-tuned model." },
    { title: "Direct Optimization", desc: "Optimize the policy directly using preference pairs (Chosen vs Rejected) using a simple classification loss." },
    { title: "Implicit Reward", desc: "The model's own log-probabilities act as the reward signal. No separate model training required." },
    { title: "No Sampling", desc: "Training is 'offline'. No need to generate text during the training loop, making it significantly faster." }
  ];

  const ppoChallenges = [
    { title: "Reward Hacking", desc: "Models often find 'exploits' in the Reward Model—generating nonsense that technically scores high but lacks human utility." },
    { title: "Extreme VRAM Usage", desc: "Fitting four models (Policy, Value, Reward, Ref) on GPUs often requires massive clusters or complex sharding (ZeRO-3)." },
    { title: "Hyperparameter Sensitivity", desc: "PPO is famously unstable. A slightly wrong learning rate or KL-coefficient can cause 'model collapse' or training divergence." },
    { title: "Sampling Bottleneck", desc: "Generating text during training (active sampling) is 10-20x slower than the actual gradient updates." }
  ];

  return (
    <div className="max-w-6xl mx-auto py-20 px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">The Complexity Gap: PPO vs. DPO</h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-8">
          Traditional RLHF (PPO) is powerful but notoriously difficult to scale. DPO simplifies this by mathematically collapsing two stages into one.
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => setView('ppo')}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${view === 'ppo' ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-200 text-slate-500 hover:bg-slate-300'}`}
          >
            PPO (4-Model Loop)
          </button>
          <button 
            onClick={() => setView('dpo')}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${view === 'dpo' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-200 text-slate-500 hover:bg-slate-300'}`}
          >
            DPO (Streamlined)
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left: Diagram & Challenges */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-10 text-white min-h-[450px] relative overflow-hidden">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full animate-pulse ${view === 'ppo' ? 'bg-red-400' : 'bg-emerald-400'}`}></span>
              {view === 'ppo' ? 'The PPO Architecture' : 'The DPO Architecture'}
            </h3>

            <div className="space-y-4 relative z-10">
              {view === 'ppo' ? (
                <>
                  <div className="p-4 border border-blue-500/30 bg-blue-500/10 rounded-xl flex justify-between items-center group hover:bg-blue-500/20 transition-all">
                    <div>
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-tighter">Required</span>
                      <p className="font-bold">Policy (Actor)</p>
                    </div>
                    <span className="text-[10px] bg-blue-500/20 px-2 py-1 rounded">Active Update</span>
                  </div>
                  <div className="p-4 border border-purple-500/30 bg-purple-500/10 rounded-xl flex justify-between items-center group hover:bg-purple-500/20 transition-all">
                    <div>
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-tighter">Required</span>
                      <p className="font-bold">Value Model (Critic)</p>
                    </div>
                    <span className="text-[10px] bg-purple-500/20 px-2 py-1 rounded">Active Update</span>
                  </div>
                  <div className="p-4 border border-emerald-500/30 bg-emerald-500/10 rounded-xl flex justify-between items-center group hover:bg-emerald-500/20 transition-all">
                    <div>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-tighter">Separate Phase</span>
                      <p className="font-bold">Reward Model</p>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 px-2 py-1 rounded">Frozen</span>
                  </div>
                  <div className="p-4 border border-white/10 bg-white/5 rounded-xl flex justify-between items-center opacity-50">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Required</span>
                      <p className="font-bold">Reference Model (KL)</p>
                    </div>
                    <span className="text-[10px] border border-white/20 px-2 py-1 rounded uppercase">Frozen</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-4 border border-emerald-500/30 bg-emerald-500/10 rounded-xl flex justify-between items-center shadow-lg shadow-emerald-500/5">
                    <div>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-tighter">Unified</span>
                      <p className="font-bold">Main Policy</p>
                    </div>
                    <span className="text-[10px] bg-emerald-500/40 px-2 py-1 rounded">Optimizing</span>
                  </div>
                  <div className="p-4 border border-white/10 bg-white/5 rounded-xl flex justify-between items-center opacity-50">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Minimal</span>
                      <p className="font-bold">Reference Model</p>
                    </div>
                    <span className="text-[10px] border border-white/20 px-2 py-1 rounded uppercase">Static</span>
                  </div>
                  <div className="mt-20 py-12 text-center border-2 border-dashed border-white/10 rounded-3xl">
                     <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">No Separate Reward Model</p>
                     <p className="text-slate-600 text-[10px]">Math eliminates the need for a scalar RM</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {view === 'ppo' && (
            <div className="grid grid-cols-2 gap-4">
              {ppoChallenges.map((challenge, i) => (
                <div key={i} className="p-4 bg-red-50 border border-red-100 rounded-xl">
                  <h5 className="text-xs font-bold text-red-800 uppercase mb-1">{challenge.title}</h5>
                  <p className="text-[10px] text-red-700 leading-tight">{challenge.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Step Explanation */}
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Execution Path</h4>
            <div className="space-y-6">
              {(view === 'ppo' ? ppoSteps : dpoSteps).map((step, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${view === 'ppo' ? 'bg-slate-200 text-slate-600 group-hover:bg-red-200' : 'bg-emerald-100 text-emerald-700 group-hover:bg-emerald-200'}`}>
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800">{step.title}</h5>
                    <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
             <h4 className="text-xs font-bold text-slate-800 uppercase mb-3">The "Separate Reward Model" Trap</h4>
             <p className="text-xs text-slate-600 leading-relaxed">
               In PPO, you must train a Reward Model (RM) first. If the RM is biased or inaccurate, the PPO policy will learn to perfectly mimic those errors. <strong>DPO removes this bottleneck</strong> by deriving an objective where the policy *is* the reward model, ensuring they never fall out of sync.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineDeepDive;
