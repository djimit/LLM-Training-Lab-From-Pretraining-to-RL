/**
 * Interactive Quiz Component
 * Tests user understanding of LLM training concepts
 */

import React, { useState, useCallback, memo } from 'react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What is the primary limitation of Supervised Fine-Tuning (SFT)?',
    options: [
      'It requires too much compute power',
      'It can only mimic training data, not improve upon it',
      'It cannot learn from text data',
      'It always produces verbose outputs'
    ],
    correctIndex: 1,
    explanation: 'SFT teaches models to imitate human examples through cross-entropy loss. This means the model can only learn to replicate the training data, including any flaws like verbosity or bias. It cannot learn to be "better" than the examples it was trained on.'
  },
  {
    id: 'q2',
    question: 'How does DPO (Direct Preference Optimization) differ from PPO in terms of architecture?',
    options: [
      'DPO requires more models in memory',
      'DPO needs only 2 models (Policy + Reference) vs PPO\'s 4 models',
      'DPO uses active on-policy sampling',
      'DPO trains a separate reward model'
    ],
    correctIndex: 1,
    explanation: 'DPO dramatically simplifies the RLHF pipeline by eliminating the need for a separate Reward Model and Critic. It only requires the Policy model being trained and a Reference model for KL regularization, compared to PPO which needs Actor, Critic, Reward, and Reference models.'
  },
  {
    id: 'q3',
    question: 'What problem does the "implicit reward" in DPO solve?',
    options: [
      'It speeds up training time',
      'It eliminates the risk of reward hacking',
      'It reduces VRAM requirements',
      'It allows for larger batch sizes'
    ],
    correctIndex: 1,
    explanation: 'In PPO, models can find exploits in the Reward Model - generating outputs that score high but are actually low quality. DPO\'s implicit reward is mathematically derived from the policy itself, ensuring the reward and policy never fall out of sync, eliminating reward hacking.'
  },
  {
    id: 'q4',
    question: 'Why is SFT still necessary before applying RLHF/DPO?',
    options: [
      'It\'s not necessary - you can apply RLHF directly to pretrained models',
      'It provides the starting policy and reduces the search space for RL',
      'It trains the reward model',
      'It\'s only needed for small models'
    ],
    correctIndex: 1,
    explanation: 'SFT provides the crucial "starting policy" for RLHF. Without it, the RL search space is too large and training often fails to converge. SFT teaches the model basic instruction-following, which RL then refines for quality, safety, and alignment.'
  },
  {
    id: 'q5',
    question: 'What is "sycophancy" in the context of LLM behavior?',
    options: [
      'When a model generates very long responses',
      'When a model agrees with the user even when they\'re wrong',
      'When a model refuses to answer questions',
      'When a model makes up facts'
    ],
    correctIndex: 1,
    explanation: 'Sycophancy occurs when models prioritize pleasing users over being truthful. SFT models learn this from polite human examples that often agree with users. RL/DPO can create boundaries between "being helpful" and "telling the truth" through preference optimization.'
  }
];

interface QuizSectionProps {
  onComplete?: (score: number, total: number) => void;
}

const QuizSection: React.FC<QuizSectionProps> = memo(function QuizSection({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question = QUIZ_QUESTIONS[currentQuestion];

  const handleAnswerSelect = useCallback((index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);

    if (index === question?.correctIndex) {
      setScore(prev => prev + 1);
    }
  }, [showExplanation, question?.correctIndex]);

  const handleNext = useCallback(() => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
      onComplete?.(score + (selectedAnswer === question?.correctIndex ? 1 : 0), QUIZ_QUESTIONS.length);
    }
  }, [currentQuestion, score, selectedAnswer, question?.correctIndex, onComplete]);

  const handleRestart = useCallback(() => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setCompleted(false);
  }, []);

  if (!question) return null;

  if (completed) {
    const finalScore = score;
    const percentage = Math.round((finalScore / QUIZ_QUESTIONS.length) * 100);

    return (
      <section className="py-16 px-6 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 shadow-xl border border-slate-100 dark:border-slate-700">
            <div className="text-6xl mb-6">
              {percentage >= 80 ? '🏆' : percentage >= 60 ? '🎉' : '📚'}
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
              Quiz Complete!
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
              You scored <span className="font-bold text-emerald-600">{finalScore}</span> out of <span className="font-bold">{QUIZ_QUESTIONS.length}</span>
            </p>

            <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-4 mb-6">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  percentage >= 80 ? 'bg-emerald-500' : percentage >= 60 ? 'bg-blue-500' : 'bg-amber-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>

            <p className="text-slate-500 dark:text-slate-400 mb-8">
              {percentage >= 80
                ? 'Excellent! You have a strong understanding of LLM training concepts.'
                : percentage >= 60
                ? 'Good job! Review the sections you missed to strengthen your understanding.'
                : 'Keep learning! Review the educational content and try again.'}
            </p>

            <button
              onClick={handleRestart}
              className="px-8 py-4 bg-slate-900 dark:bg-slate-700 text-white rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-600 transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px] font-bold uppercase tracking-widest mb-4">
            Test Your Knowledge
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">LLM Training Quiz</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700">
          {/* Progress bar */}
          <div className="h-1 w-full bg-slate-100 dark:bg-slate-700 rounded-full mb-8">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            {question.question}
          </h3>

          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctIndex;
              const showResult = showExplanation;

              let buttonClass = 'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500';

              if (showResult) {
                if (isCorrect) {
                  buttonClass = 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-900 dark:text-emerald-100';
                } else if (isSelected && !isCorrect) {
                  buttonClass = 'bg-red-50 dark:bg-red-900/30 border-red-500 text-red-900 dark:text-red-100';
                }
              } else if (isSelected) {
                buttonClass = 'bg-blue-50 dark:bg-blue-900/30 border-blue-500';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all ${buttonClass} ${
                    showExplanation ? 'cursor-default' : 'cursor-pointer'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      showResult && isCorrect
                        ? 'bg-emerald-500 text-white'
                        : showResult && isSelected && !isCorrect
                        ? 'bg-red-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-slate-700 dark:text-slate-200">{option}</span>
                    {showResult && isCorrect && (
                      <span className="ml-auto text-emerald-500" aria-label="Correct answer">✓</span>
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <span className="ml-auto text-red-500" aria-label="Incorrect answer">✗</span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="p-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
              <h4 className="text-sm font-bold text-blue-900 dark:text-blue-200 mb-2 flex items-center gap-2">
                <span>💡</span> Explanation
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                {question.explanation}
              </p>
            </div>
          )}

          {showExplanation && (
            <button
              onClick={handleNext}
              className="w-full py-4 bg-slate-900 dark:bg-slate-700 text-white rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-600 transition-all"
            >
              {currentQuestion < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          )}
        </div>

        {/* Score tracker */}
        <div className="mt-6 text-center text-slate-500 dark:text-slate-400 text-sm">
          Current Score: <span className="font-bold text-emerald-600">{score}</span> / {currentQuestion + (showExplanation ? 1 : 0)}
        </div>
      </div>
    </section>
  );
});

QuizSection.displayName = 'QuizSection';

export default QuizSection;
