
import React from 'react';

const ArchitectureComparison: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-slate-50 border-y border-slate-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">The RLHF Architecture Shift</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Traditional RLHF (PPO) requires orchestrating several models at once. 
            DPO collapses this complexity into a single, stable training objective.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Traditional PPO Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-bold uppercase tracking-widest">Legacy / Standard</span>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-800 mb-6">PPO: The 3-Phase Loop</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">1</div>
                <div>
                  <h4 className="font-bold text-slate-900">Separate Reward Model (RM)</h4>
                  <p className="text-sm text-slate-600">Train a separate LLM (the judge) to score outputs based on human rankings. This model must be frozen and maintained throughout training.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">2</div>
                <div>
                  <h4 className="font-bold text-slate-900">Active On-Policy Sampling</h4>
                  <p className="text-sm text-slate-600">The model generates thousands of responses <i>live</i> during training. This makes the loop extremely slow (sampling takes 90% of time).</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">3</div>
                <div>
                  <h4 className="font-bold text-slate-900">The Actor-Critic Balancing Act</h4>
                  <p className="text-sm text-slate-600">Syncing the Policy (Actor), Value Model (Critic), Reward Model, and Reference Model in VRAM is a massive engineering challenge.</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-red-50 rounded-2xl border border-red-100">
                <h5 className="text-xs font-bold text-red-800 uppercase mb-2">PPO Bottlenecks</h5>
                <ul className="text-xs text-red-700 space-y-1 list-disc list-inside">
                  <li>Reward Hacking: Model finds weird tokens that "trick" the RM</li>
                  <li>Hyperparameter Hell: Tiny LR changes cause collapse</li>
                  <li>VRAM Bloat: Need 4-8x more memory than standard SFT</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Modern DPO Section */}
          <div className="bg-emerald-900 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-500/30">Current State-of-the-Art</span>
            </div>
            
            <h3 className="text-2xl font-bold text-emerald-50 mb-6">DPO: The Direct Shortcut</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-emerald-400 text-emerald-900 flex items-center justify-center flex-shrink-0 font-bold text-sm">1</div>
                <div>
                  <h4 className="font-bold text-emerald-100">Implicit Reward Model</h4>
                  <p className="text-sm text-emerald-300/80">The policy <i>is</i> the reward model. Math allows us to extract a reward signal directly from the model's own log-probabilities.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-emerald-400 text-emerald-900 flex items-center justify-center flex-shrink-0 font-bold text-sm">2</div>
                <div>
                  <h4 className="font-bold text-emerald-100">Offline Dataset Training</h4>
                  <p className="text-sm text-emerald-300/80">No sampling needed. We just pass (Chosen, Rejected) pairs through the model like standard supervised training. It's fast and stable.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-emerald-400 text-emerald-900 flex items-center justify-center flex-shrink-0 font-bold text-sm">3</div>
                <div>
                  <h4 className="font-bold text-emerald-100">Stable Convergence</h4>
                  <p className="text-sm text-emerald-300/80">Because it's just a classification-style loss, DPO doesn't "diverge" or suffer from the noise of a changing critic model.</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-emerald-800/50 rounded-2xl border border-emerald-700/50">
                <h5 className="text-xs font-bold text-emerald-400 uppercase mb-2">DPO Advantages</h5>
                <ul className="text-xs text-emerald-300/80 space-y-1 list-disc list-inside">
                  <li>Compute Efficient: Only requires Policy and Ref Model</li>
                  <li>Mathematically Sound: Direct gradient for preference margin</li>
                  <li>Plug-and-Play: Works with standard fine-tuning scripts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureComparison;
