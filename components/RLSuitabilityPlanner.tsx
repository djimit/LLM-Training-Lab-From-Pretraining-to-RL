
import React, { useState, useMemo } from 'react';

interface Criterion {
  id: string;
  title: string;
  description: string;
  weight: number;
  icon: string;
}

const CRITERIA: Criterion[] = [
  {
    id: 'correctness',
    title: "The Verification Gap",
    description: "Correctness is hard to generate but easy for a human (or RM) to recognize. (e.g. 'Is this summary engaging?')",
    weight: 30,
    icon: "🔍"
  },
  {
    id: 'sparse',
    title: "Sparse Rewards",
    description: "Most responses are 'acceptable', but you need to push the model toward 'exceptional' outliers.",
    weight: 25,
    icon: "💎"
  },
  {
    id: 'safety',
    title: "Safety & Boundaries",
    description: "Your project involves high-stakes advice where 'mimicry' of biased web data is dangerous.",
    weight: 35,
    icon: "🛡️"
  },
  {
    id: 'exploration',
    title: "Strategic Discovery",
    description: "The model needs to find optimal paths (like in math or coding) that aren't well-represented in the SFT data.",
    weight: 10,
    icon: "🚀"
  }
];

const RLSuitabilityPlanner: React.FC = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleCriterion = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const score = useMemo(() => {
    let s = 0;
    CRITERIA.forEach(c => {
      if (selected.has(c.id)) s += c.weight;
    });
    return s;
  }, [selected]);

  const getRecommendation = () => {
    if (score === 0) return { title: "Pure SFT", desc: "Stick to Supervised Fine-Tuning. Your task is likely a simple mapping or formatting exercise.", color: "text-slate-500", bg: "bg-slate-100" };
    if (score < 40) return { title: "SFT + Targeted SFT", desc: "RL is likely overkill. Focus on cleaning your training data or using 'Rejection Sampling' (best-of-N).", color: "text-blue-600", bg: "bg-blue-50" };
    if (score < 70) return { title: "Direct Preference Optimization (DPO)", desc: "The sweet spot. Use DPO to align style and safety without the complexity of a full RL loop.", color: "text-emerald-600", bg: "bg-emerald-50" };
    return { title: "Full RLHF / PPO Loop", desc: "Your project demands deep exploration and complex safety guards. PPO or GRPO is recommended for this level of difficulty.", color: "text-purple-600", bg: "bg-purple-50" };
  };

  const rec = getRecommendation();

  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">The RL Strategy Planner</h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
          RL is expensive and complex. Select the attributes of your project below to calculate the "Alignment ROI" and receive a recommended training strategy.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Interactive Checklist */}
        <div className="lg:col-span-3 space-y-4">
          {CRITERIA.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleCriterion(item.id)}
              className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 group flex gap-6 ${
                selected.has(item.id)
                  ? 'border-emerald-500 bg-emerald-50/30 shadow-md scale-[1.02]'
                  : 'border-slate-100 bg-white hover:border-slate-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-colors ${
                selected.has(item.id) ? 'bg-emerald-500' : 'bg-slate-100'
              }`}>
                {item.icon}
              </div>
              <div>
                <h4 className={`font-bold mb-1 transition-colors ${selected.has(item.id) ? 'text-emerald-900' : 'text-slate-800'}`}>
                  {item.title}
                </h4>
                <p className={`text-sm leading-relaxed ${selected.has(item.id) ? 'text-emerald-700/80' : 'text-slate-500'}`}>
                  {item.description}
                </p>
              </div>
              <div className="ml-auto self-center">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selected.has(item.id) ? 'bg-emerald-500 border-emerald-500' : 'border-slate-200'
                }`}>
                  {selected.has(item.id) && <span className="text-white text-xs font-bold">✓</span>}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Dynamic Recommendation Card */}
        <div className="lg:col-span-2 sticky top-8">
          <div className="bg-white rounded-[2rem] p-8 shadow-2xl border border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8 text-center">ROI Suitability Analysis</h4>
            
            <div className="relative h-48 flex items-center justify-center mb-8">
              {/* Circular Gauge */}
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  cx="80" cy="80" r="70"
                  fill="transparent"
                  stroke="#f1f5f9"
                  strokeWidth="12"
                />
                <circle
                  cx="80" cy="80" r="70"
                  fill="transparent"
                  stroke={score > 60 ? '#10b981' : score > 30 ? '#3b82f6' : '#94a3b8'}
                  strokeWidth="12"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * score) / 100}
                  className="transition-all duration-700 ease-out"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-slate-900">{score}%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">RL Value Score</span>
              </div>
            </div>

            <div className={`p-6 rounded-2xl ${rec.bg} border border-black/5 transition-all duration-500`}>
              <h5 className={`font-black text-lg mb-2 ${rec.color}`}>
                {rec.title}
              </h5>
              <p className="text-sm text-slate-700 leading-relaxed">
                {rec.desc}
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
                <span>Training Effort</span>
                <span className={score > 60 ? 'text-red-500' : 'text-slate-500'}>{score > 60 ? 'High' : 'Low/Med'}</span>
              </div>
              <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-slate-400 transition-all duration-500" 
                  style={{ width: `${Math.max(10, score)}%` }}
                ></div>
              </div>
            </div>

            <p className="mt-6 text-[10px] text-slate-400 text-center leading-relaxed">
              Recommendation based on compute-to-value heuristics for modern LLM development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RLSuitabilityPlanner;
