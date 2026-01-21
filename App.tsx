
import React, { useState, Suspense, lazy } from 'react';
import { TrainingStage } from './types';
import { STAGES } from './constants';
import StageCard from './components/StageCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ThemeToggle } from './contexts/ThemeContext';
import { ProgressIndicator } from './contexts/ProgressContext';

// Lazy load heavy components for better initial load performance
const FailureModeSection = lazy(() => import('./components/FailureModeSection'));
const ComparisonPlayground = lazy(() => import('./components/ComparisonPlayground'));
const RLSuitabilityPlanner = lazy(() => import('./components/RLSuitabilityPlanner'));
const DPOVisualizer = lazy(() => import('./components/DPOVisualizer'));
const PipelineDeepDive = lazy(() => import('./components/PipelineDeepDive'));
const ArchitectureComparison = lazy(() => import('./components/ArchitectureComparison'));
const AlignmentTechnicalSpecs = lazy(() => import('./components/AlignmentTechnicalSpecs'));
const PromptTuningExplorer = lazy(() => import('./components/PromptTuningExplorer'));
const DecisionTree = lazy(() => import('./components/DecisionTree'));
const PipelineComparisonMatrix = lazy(() => import('./components/PipelineComparisonMatrix'));
const TrainingSimulator = lazy(() => import('./components/TrainingSimulator'));
const PipelineArchitectureFlow = lazy(() => import('./components/PipelineArchitectureFlow'));
const QuizSection = lazy(() => import('./components/QuizSection'));

// Loading component for Suspense fallback
const ComponentLoader: React.FC = () => (
  <div className="py-24 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
      <p className="text-slate-500 text-sm font-medium">Loading component...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeStage, setActiveStage] = useState<TrainingStage>(TrainingStage.SFT);

  const getVisualizationData = () => {
    switch (activeStage) {
      case TrainingStage.PRETRAINING:
        return [
          { name: 'Knowledge', value: 95 },
          { name: 'Formatting', value: 10 },
          { name: 'Safety', value: 5 },
          { name: 'Honesty', value: 20 },
        ];
      case TrainingStage.SFT:
        return [
          { name: 'Knowledge', value: 90 },
          { name: 'Formatting', value: 85 },
          { name: 'Safety', value: 40 },
          { name: 'Honesty', value: 50 },
        ];
      case TrainingStage.RLHF_DPO:
        return [
          { name: 'Knowledge', value: 88 },
          { name: 'Formatting', value: 95 },
          { name: 'Safety', value: 90 },
          { name: 'Honesty', value: 85 },
        ];
    }
  };

  const chartData = getVisualizationData();
  const currentStage = STAGES.find(s => s.id === activeStage);

  // Type guard - this should never happen as activeStage is controlled
  if (!currentStage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Invalid training stage selected</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Fixed Header Controls */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        <div className="hidden md:block">
          <ProgressIndicator />
        </div>
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <header className="bg-slate-900 dark:bg-slate-950 text-white py-20 px-6 text-center relative">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-800 text-slate-400 text-xs font-bold uppercase tracking-widest mb-6 border border-slate-700">
            Based on Direct Preference Optimization (DPO)
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
            Understanding the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400">LLM Training Stack</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            From raw text mimicry to human alignment. Discover how RL moves beyond "next-token" prediction to prioritize quality, safety, and conciseness.
          </p>
        </div>
      </header>

      {/* Main Training Stack Interactive */}
      <section className="py-16 px-6 max-w-6xl mx-auto -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {STAGES.map(stage => (
            <StageCard
              key={stage.id}
              {...stage}
              isActive={activeStage === stage.id}
              onClick={() => setActiveStage(stage.id)}
            />
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-100 flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4 text-slate-800 flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg ${currentStage.color}`}></div>
              {currentStage.subtitle}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              {currentStage.description}
            </p>
            
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h4 className="text-xs uppercase font-bold text-slate-400 mb-1 tracking-widest">Training Data</h4>
                <p className="text-slate-700 font-semibold">{currentStage.data}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h4 className="text-xs uppercase font-bold text-slate-400 mb-1 tracking-widest">Success Metric</h4>
                <p className="text-slate-700 font-semibold">{currentStage.goal}</p>
              </div>

              {/* Enhanced SFT -> RLHF Bridge Logic */}
              {activeStage === TrainingStage.SFT && (
                <div className="mt-8 p-6 bg-purple-50 rounded-2xl border border-purple-100 animate-in fade-in slide-in-from-left-4 duration-500">
                  <h4 className="text-sm font-bold text-purple-900 mb-3 flex items-center gap-2">
                    <span>🚀</span> The Bridge to RLHF
                  </h4>
                  <p className="text-xs text-purple-800 leading-relaxed mb-4">
                    SFT is technically the first stage of the RLHF pipeline. Without a solid SFT model, Reinforcement Learning often fails to converge because the "search space" is too large.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-[10px] text-purple-700">
                      <span className="font-bold">• Starting Policy:</span> SFT provides the initial "good enough" behavior.
                    </li>
                    <li className="flex items-start gap-2 text-[10px] text-purple-700">
                      <span className="font-bold">• Reference Model:</span> Used as a safety anchor in PPO/DPO to prevent "reward hacking."
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-[400px] h-[300px] bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 text-center">Conceptual Capability Profile</h4>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={activeStage === TrainingStage.PRETRAINING ? '#3b82f6' : activeStage === TrainingStage.SFT ? '#a855f7' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Pipeline Comparison View */}
      <Suspense fallback={<ComponentLoader />}>
        <PipelineArchitectureFlow />
      </Suspense>

      {/* NEW: Training Simulator */}
      <Suspense fallback={<ComponentLoader />}>
        <TrainingSimulator />
      </Suspense>

      {/* Complexity Breakdown Section */}
      <section className="bg-white border-y border-slate-100">
        <Suspense fallback={<ComponentLoader />}>
          <PipelineDeepDive />
        </Suspense>
      </section>

      {/* NEW: Comparison Matrix (PPO vs DPO) */}
      <Suspense fallback={<ComponentLoader />}>
        <PipelineComparisonMatrix />
      </Suspense>

      {/* NEW: Prompt Tuning Section */}
      <Suspense fallback={<ComponentLoader />}>
        <PromptTuningExplorer />
      </Suspense>

      {/* DPO Interactive Visualization */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">The DPO Revolution</h2>
          <p className="text-slate-600 leading-relaxed">
            Direct Preference Optimization (arXiv:2305.18290) proved that the complex PPO loop is often unnecessary.
            By leveraging the log-probability ratios, the policy becomes its own Reward Model.
          </p>
        </div>
        <Suspense fallback={<ComponentLoader />}>
          <DPOVisualizer />
        </Suspense>
      </section>

      <Suspense fallback={<ComponentLoader />}>
        <FailureModeSection />
      </Suspense>

      {/* High-Fidelity Technical Spec Comparison */}
      <Suspense fallback={<ComponentLoader />}>
        <AlignmentTechnicalSpecs />
      </Suspense>

      {/* Architecture Evolution & Complexity Comparison */}
      <Suspense fallback={<ComponentLoader />}>
        <ArchitectureComparison />
      </Suspense>

      {/* Cross-Entropy vs RL Technical Explanation */}
      <section className="bg-slate-900 py-24 px-6 text-white overflow-hidden relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 italic">Strategic Alignment</h2>
            <div className="h-1 w-24 bg-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold tracking-widest uppercase rounded">Imitation Learning</div>
              <h3 className="text-2xl font-bold">Cross-Entropy (SFT)</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Forces the model to copy training data. It cannot learn to be "better" than the human examples, only to resemble them. This leads to verbosity and sycophancy.
              </p>
            </div>
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-widest uppercase rounded">Comparative Learning</div>
              <h3 className="text-2xl font-bold">Implicit Reward (DPO)</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Allows the model to learn from contrast. It distinguishes high-quality "Winning" responses from mediocre "Losing" ones, carving out a safer, more helpful latent space.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      </section>

      <Suspense fallback={<ComponentLoader />}>
        <ComparisonPlayground />
      </Suspense>

      {/* NEW: RL Investment Logic Section */}
      <Suspense fallback={<ComponentLoader />}>
        <DecisionTree />
      </Suspense>

      {/* Updated interactive Strategy Planner */}
      <Suspense fallback={<ComponentLoader />}>
        <RLSuitabilityPlanner />
      </Suspense>

      {/* Interactive Quiz Section */}
      <Suspense fallback={<ComponentLoader />}>
        <QuizSection />
      </Suspense>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-12 px-6 text-center">
        <p className="text-slate-400 dark:text-slate-500 text-sm italic">
          Technical Education Tool • Explaining LLM Training Dynamics (SFT, PPO, DPO)
        </p>
        <p className="text-slate-300 dark:text-slate-600 text-xs mt-2">
          Version 1.0.0 • Open Source Educational Platform
        </p>
      </footer>
    </div>
  );
};

export default App;
