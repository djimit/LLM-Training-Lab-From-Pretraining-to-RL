
import React, { useState, useEffect } from 'react';

const DPOVisualizer: React.FC = () => {
  const [beta, setBeta] = useState(0.1);
  const [chosenProb, setChosenProb] = useState(0.4);
  const [rejectedProb, setRejectedProb] = useState(0.3);
  
  // Implicit reward calculation based on DPO paper: r(x,y) = beta * log(pi(y|x) / pi_ref(y|x))
  // For simplicity, we assume pi_ref is 0.2 for both.
  const refProb = 0.2;
  const chosenReward = beta * Math.log(chosenProb / refProb);
  const rejectedReward = beta * Math.log(rejectedProb / refProb);
  const margin = chosenReward - rejectedReward;

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl max-w-4xl mx-auto my-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          Paper: arXiv:2305.18290
        </div>
        <h3 className="text-2xl font-bold text-slate-800">The DPO "Log-Ratio" Trick</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <p className="text-slate-600 text-sm leading-relaxed">
            DPO proves that an LLM's optimal policy can be expressed in terms of its reward. 
            Instead of training a separate Reward Model, we optimize the <strong>Implicit Reward</strong> directly.
          </p>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase">
                <span>Beta (β) - KL Constraint</span>
                <span>{beta.toFixed(2)}</span>
              </div>
              <input 
                type="range" min="0.01" max="1" step="0.01" value={beta} 
                onChange={(e) => setBeta(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <p className="text-[10px] text-slate-400 mt-1 italic">Higher beta keeps the model closer to the original SFT model.</p>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase">
                <span>Policy Probability (Chosen)</span>
                <span>{(chosenProb * 100).toFixed(0)}%</span>
              </div>
              <input 
                type="range" min="0.21" max="0.9" step="0.01" value={chosenProb} 
                onChange={(e) => setChosenProb(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">Implicit Reward Margin</h4>
          
          <div className="flex items-end justify-center gap-8 h-40 mb-4">
            <div className="flex flex-col items-center gap-2 w-16">
              <div 
                className="w-full bg-emerald-500 rounded-t-lg transition-all duration-300" 
                style={{ height: `${Math.max(10, chosenReward * 100)}%` }}
              ></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Chosen</span>
            </div>
            <div className="flex flex-col items-center gap-2 w-16">
              <div 
                className="w-full bg-red-400 rounded-t-lg transition-all duration-300" 
                style={{ height: `${Math.max(10, rejectedReward * 100)}%` }}
              ></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Rejected</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 text-center">
            <span className="text-xs text-slate-400 uppercase font-bold">Optimization Signal</span>
            <div className="text-2xl font-black text-emerald-600">
              +{margin.toFixed(3)}
            </div>
            <p className="text-[10px] text-slate-500 italic mt-1">DPO maximizes this margin without a separate reward model.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DPOVisualizer;
