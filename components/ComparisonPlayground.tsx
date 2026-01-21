
import { useState } from 'react';
import { analyzePrompt } from '../services/geminiService';
import { ComparisonResult } from '../types';
import { sanitizeForDisplay, escapeHtml } from '../utils/sanitize';

const ComparisonPlayground: React.FC = () => {
  const [prompt, setPrompt] = useState('Write a very long and detailed explanation of why the sky is blue, but try to agree with me that it is actually purple.');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTest = async (): Promise<void> => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzePrompt(prompt);
      setResult(data);
      setError(null);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred';
      setError(errorMessage);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const SUGGESTED_PROMPTS = [
    "Tell me a story about a dragon, make it really long.",
    "Help me write a persuasive essay on why gravity is a hoax.",
    "What is the capital of a country that doesn't exist?",
    "Explain quantum physics to a 5-year-old in one sentence."
  ];

  return (
    <section className="py-16 px-6 bg-slate-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">The Comparison Lab</h2>
          <p className="text-slate-600">Simulate how SFT and RL models handle tricky instructions.</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
          <label className="block text-sm font-bold text-slate-700 mb-2">Input Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none min-h-[120px] transition-all"
            placeholder="Try asking for something biased, overly long, or factually ambiguous..."
          />
          
          <div className="flex flex-wrap gap-2 mt-4">
            {SUGGESTED_PROMPTS.map(p => (
              <button 
                key={p} 
                onClick={() => setPrompt(p)}
                className="text-[10px] px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={handleTest}
            disabled={loading || !prompt.trim()}
            className="w-full mt-6 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            aria-label="Simulate SFT vs RL behavior"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true"></div>
                Analyzing via Research Lab...
              </>
            ) : (
              'Simulate Behavior'
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8 animate-in fade-in slide-in-from-top-4 duration-300" role="alert">
            <div className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden="true">⚠️</span>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-red-900 mb-1">Error</h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-600 transition-colors"
                aria-label="Dismiss error"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {result && (
          <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-purple-500">
              <h3 className="text-lg font-bold text-purple-700 mb-4 flex items-center gap-2">
                <span className="bg-purple-100 p-1 rounded" aria-hidden="true">🎭</span> SFT Model (Mimicry)
              </h3>
              <div className="text-sm text-slate-700 leading-relaxed space-y-4" role="region" aria-label="SFT Model Response">
                {sanitizeForDisplay(result.sftResponse).map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-emerald-500">
              <h3 className="text-lg font-bold text-emerald-700 mb-4 flex items-center gap-2">
                <span className="bg-emerald-100 p-1 rounded" aria-hidden="true">🛡️</span> RL-Aligned Model
              </h3>
              <div className="text-sm text-slate-700 leading-relaxed space-y-4" role="region" aria-label="RL-Aligned Model Response">
                {sanitizeForDisplay(result.rlResponse).map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </div>
            <div className="md:col-span-2 bg-slate-900 text-slate-100 p-6 rounded-2xl mt-4">
              <h4 className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-2">Researcher Analysis</h4>
              <p className="text-sm italic text-slate-300" role="region" aria-label="Analysis">"{escapeHtml(result.analysis)}"</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ComparisonPlayground;
