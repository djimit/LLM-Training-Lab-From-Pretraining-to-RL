
import React from 'react';

const RL_ROI_CRITERIA = [
  {
    title: "Complexity of 'Correctness'",
    condition: "When the 'right' answer is hard to write down but easy to recognize.",
    detail: "This is known as the 'Verification Gap'. SFT struggles when there are many valid ways to be right, but specific qualities (like 'elegance' or 'tone') are what matter. RL allows the model to explore these nuances.",
    example: "Summarizing a legal brief: Any summary might be 'accurate', but an RL-trained model learns which summaries are actually useful to a lawyer.",
    icon: "⚖️"
  },
  {
    title: "Sparse Rewards",
    condition: "When most responses are 'okay', but only a few are 'excellent'.",
    detail: "In SFT, every token in the training set is treated as ground truth. In RL, we can specifically reward the top 1% of responses, pushing the model toward exceptional performance rather than median quality.",
    example: "Coding assistants: An SFT model might write code that works. An RL model finds the most performant, secure, and idiomatic implementation.",
    icon: "💎"
  },
  {
    title: "Safety & Boundaries",
    condition: "When avoiding failure modes (hallucinations, bias) is critical.",
    detail: "Human feedback is best used as a safety filter. By rewarding refusals of harmful prompts and penalizing 'hallucinated' facts, RL carves a safe path that pure imitation often misses.",
    example: "Medical AI: Admitting 'I don't know' is more valuable than a guess that sounds helpful. RL specifically rewards this honesty.",
    icon: "🛡️"
  },
  {
    title: "Strategic Discovery",
    condition: "When you want the model to find novel strategies humans haven't shown.",
    detail: "RL allows for 'self-play' or exploration. The model can test hypotheses and discover shortcuts or reasoning steps that don't exist in the supervised training data.",
    example: "Complex Math: Discovering a new proof method or an unconventional but correct way to solve a calculus problem.",
    icon: "🚀"
  }
];

const DecisionTree: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-slate-50 border-y border-slate-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest mb-4">
            Deployment Framework
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">The RL Investment Framework</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Reinforcement Learning is 10x more complex to implement than SFT. Use these four industry-standard criteria to determine if your project truly requires RL alignment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {RL_ROI_CRITERIA.map((item, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500 shadow-inner">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">{item.title}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Criterion {idx + 1}</p>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <p className="text-slate-800 font-bold text-sm bg-slate-50 p-4 rounded-xl border-l-4 border-slate-900">
                  {item.condition}
                </p>
                
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.detail}
                </p>

                <div className="pt-6 border-t border-slate-100 mt-auto">
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-black text-slate-300 uppercase shrink-0 mt-0.5">Use Case:</span>
                    <p className="text-xs text-slate-500 italic leading-relaxed">{item.example}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex-1">
            <h3 className="text-3xl font-bold mb-4">The "Value vs. Complexity" Trade-off</h3>
            <p className="text-slate-300 leading-relaxed text-sm max-w-xl">
              While PPO and DPO are the gold standards, many teams find that <strong>Rejection Sampling (Best-of-N)</strong> provides 80% of the benefit with only 10% of the complexity. Always start with SFT + Rejection Sampling before moving to RL.
            </p>
          </div>
          <div className="relative z-10 flex-shrink-0">
            <div className="flex flex-col gap-3">
              <div className="px-6 py-3 bg-white/10 rounded-xl border border-white/20 text-xs font-bold flex items-center justify-between gap-8">
                <span className="text-white/60">SFT Implementation</span>
                <span className="text-emerald-400">Low Cost</span>
              </div>
              <div className="px-6 py-3 bg-white/10 rounded-xl border border-white/20 text-xs font-bold flex items-center justify-between gap-8">
                <span className="text-white/60">RL Implementation</span>
                <span className="text-red-400">High Cost</span>
              </div>
            </div>
          </div>
          {/* Abstract background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
        </div>
      </div>
    </section>
  );
};

export default DecisionTree;
