
import React, { useState, useEffect } from 'react';

const TrainingSimulator: React.FC = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [ppoProgress, setPpoProgress] = useState(0);
  const [dpoProgress, setDpoProgress] = useState(0);
  const [ppoStability, setPpoStability] = useState(100);
  const [dpoStability, setDpoStability] = useState(100);

  useEffect(() => {
    let interval: number;
    if (isTraining) {
      interval = window.setInterval(() => {
        setPpoProgress(prev => {
          if (prev >= 100) return 100;
          // PPO is slower and jittery
          const jitter = Math.random() > 0.8 ? -0.5 : 0.3;
          return Math.min(100, prev + jitter);
        });
        setDpoProgress(prev => {
          if (prev >= 100) return 100;
          // DPO is faster and smooth
          return Math.min(100, prev + 1.2);
        });

        // Simulate PPO stability drops
        setPpoStability(prev => {
          if (ppoProgress > 30 && ppoProgress < 70) {
            return Math.max(40, prev - Math.random() * 2);
          }
          return prev;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isTraining, ppoProgress]);

  const reset = () => {
    setIsTraining(false);
    setPpoProgress(0);
    setDpoProgress(0);
    setPpoStability(100);
    setDpoStability(100);
  };

  return (
    <section className="py-24 px-6 bg-slate-950 text-white overflow-hidden border-y border-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-4 border border-emerald-500/20">
            Real-time Benchmarking
          </div>
          <h2 className="text-4xl font-black mb-4 tracking-tight italic">Training Throughput Simulator</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Experience the operational difference. Watch how PPO's multi-model orchestration compares to DPO's streamlined gradient descent under simulated load.
          </p>
          
          <div className="mt-8 flex justify-center gap-4">
            {!isTraining ? (
              <button 
                onClick={() => setIsTraining(true)}
                className="px-10 py-4 bg-emerald-500 text-slate-900 rounded-full font-black hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-3"
              >
                <span className="text-xl">▶</span> START TRAINING CLUSTERS
              </button>
            ) : (
              <button 
                onClick={reset}
                className="px-10 py-4 bg-slate-800 text-white rounded-full font-black hover:bg-slate-700 transition-all border border-slate-700"
              >
                RESET SIMULATION
              </button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* PPO Cluster */}
          <div className="bg-slate-900/50 rounded-[3rem] p-10 border border-slate-800 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <div className="flex gap-2">
                <div className={`w-2 h-2 rounded-full ${isTraining && ppoProgress < 100 ? 'bg-red-500 animate-pulse' : 'bg-slate-700'}`}></div>
                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-10 flex items-center gap-3">
              <span className="text-red-500">PPO</span>
              <span className="text-slate-500 text-sm font-normal uppercase tracking-widest">Cluster 01</span>
            </h3>

            <div className="space-y-10">
              {/* VRAM Visualizer */}
              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                  <span>VRAM Allocation (4x Models)</span>
                  <span className="text-red-400">82.4 GB / 80 GB (Spilling)</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div className={`h-12 rounded-xl border ${isTraining ? 'bg-red-500/20 border-red-500/50' : 'bg-slate-800 border-slate-700'} flex items-center justify-center text-[8px] font-bold text-slate-400 uppercase`}>Actor</div>
                  <div className={`h-12 rounded-xl border ${isTraining ? 'bg-red-500/20 border-red-500/50' : 'bg-slate-800 border-slate-700'} flex items-center justify-center text-[8px] font-bold text-slate-400 uppercase`}>Critic</div>
                  <div className={`h-12 rounded-xl border ${isTraining ? 'bg-red-500/20 border-red-500/50' : 'bg-slate-800 border-slate-700'} flex items-center justify-center text-[8px] font-bold text-slate-400 uppercase`}>Reward</div>
                  <div className={`h-12 rounded-xl border ${isTraining ? 'bg-red-500/20 border-red-500/50' : 'bg-slate-800 border-slate-700'} flex items-center justify-center text-[8px] font-bold text-slate-400 uppercase`}>Ref</div>
                </div>
              </div>

              {/* Progress */}
              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                  <span>Training Progress</span>
                  <span className="text-slate-300">{ppoProgress.toFixed(1)}%</span>
                </div>
                <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div 
                    className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300"
                    style={{ width: `${ppoProgress}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-red-500 mt-2 italic font-mono">
                  {isTraining && ppoProgress < 100 ? '> ALERT: High compute latency in Sampling Phase...' : '> Status: IDLE'}
                </p>
              </div>

              {/* Stability Gauge */}
              <div className="pt-6 border-t border-slate-800">
                 <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Stability Index</h4>
                      <p className="text-2xl font-black text-white">{ppoStability.toFixed(0)}%</p>
                    </div>
                    <div className="text-right">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Fail Probability</h4>
                      <p className="text-2xl font-black text-red-500">{(100 - ppoStability).toFixed(0)}%</p>
                    </div>
                 </div>
              </div>
            </div>
            
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-600/10 rounded-full blur-[80px]"></div>
          </div>

          {/* DPO Cluster */}
          <div className="bg-emerald-950/20 rounded-[3rem] p-10 border border-emerald-900/30 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <div className="flex gap-2">
                <div className={`w-2 h-2 rounded-full ${isTraining && dpoProgress < 100 ? 'bg-emerald-400 animate-ping' : 'bg-slate-700'}`}></div>
                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-10 flex items-center gap-3 text-emerald-50">
              <span className="text-emerald-400">DPO</span>
              <span className="text-emerald-700 text-sm font-normal uppercase tracking-widest">Cluster 02</span>
            </h3>

            <div className="space-y-10">
              {/* VRAM Visualizer */}
              <div>
                <div className="flex justify-between text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-4">
                  <span>VRAM Allocation (2x Models)</span>
                  <span className="text-emerald-400">24.2 GB / 80 GB (Safe)</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div className={`h-12 rounded-xl border ${isTraining ? 'bg-emerald-500/20 border-emerald-500/50' : 'bg-slate-800 border-slate-700'} flex items-center justify-center text-[8px] font-bold text-emerald-400 uppercase`}>Policy</div>
                  <div className={`h-12 rounded-xl border ${isTraining ? 'bg-emerald-500/20 border-emerald-500/50' : 'bg-slate-800 border-slate-700'} flex items-center justify-center text-[8px] font-bold text-emerald-400 uppercase`}>Ref</div>
                  <div className="h-12 rounded-xl border border-dashed border-slate-800 opacity-20"></div>
                  <div className="h-12 rounded-xl border border-dashed border-slate-800 opacity-20"></div>
                </div>
              </div>

              {/* Progress */}
              <div>
                <div className="flex justify-between text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-2">
                  <span>Training Progress</span>
                  <span className="text-emerald-300">{dpoProgress.toFixed(1)}%</span>
                </div>
                <div className="h-4 w-full bg-emerald-900/30 rounded-full overflow-hidden border border-emerald-900/50">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-300"
                    style={{ width: `${dpoProgress}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-emerald-500 mt-2 italic font-mono">
                  {isTraining && dpoProgress < 100 ? '> Optimal Gradient Flow: Unified Optimization Step' : '> Status: READY'}
                </p>
              </div>

              {/* Stability Gauge */}
              <div className="pt-6 border-t border-emerald-900/50">
                 <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-1">Stability Index</h4>
                      <p className="text-2xl font-black text-white">{dpoStability.toFixed(0)}%</p>
                    </div>
                    <div className="text-right">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-1">Fail Probability</h4>
                      <p className="text-2xl font-black text-emerald-500">{(100 - dpoStability).toFixed(0)}%</p>
                    </div>
                 </div>
              </div>
            </div>
            
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px]"></div>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-4 gap-4">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
            <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Architecture</h5>
            <p className="text-sm font-bold">PPO: Actor-Critic-Ref-RM</p>
            <p className="text-xs text-emerald-400 mt-1">DPO: Policy-Ref Only</p>
          </div>
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
            <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Training Data</h5>
            <p className="text-sm font-bold">PPO: Live Sampling</p>
            <p className="text-xs text-emerald-400 mt-1">DPO: Static Pairs</p>
          </div>
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
            <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Stability</h5>
            <p className="text-sm font-bold">PPO: High Variance</p>
            <p className="text-xs text-emerald-400 mt-1">DPO: Convex Loss</p>
          </div>
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
            <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Latency</h5>
            <p className="text-sm font-bold">PPO: Generation Bound</p>
            <p className="text-xs text-emerald-400 mt-1">DPO: Gradient Bound</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingSimulator;
