/**
 * Learning Progress Context
 * Tracks user's progress through educational content
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { LearningProgress } from '../types';

interface ProgressContextType {
  progress: LearningProgress;
  markSectionViewed: (sectionId: string) => void;
  markQuizCompleted: (quizId: string) => void;
  incrementComparisons: () => void;
  getProgressPercentage: () => number;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'llm-training-lab-progress';

// All available sections in the app
const ALL_SECTIONS = [
  'hero',
  'training-stages',
  'pipeline-architecture',
  'training-simulator',
  'pipeline-deep-dive',
  'comparison-matrix',
  'prompt-tuning',
  'dpo-visualizer',
  'failure-modes',
  'alignment-specs',
  'architecture-comparison',
  'strategic-alignment',
  'comparison-playground',
  'decision-tree',
  'rl-planner'
];

/**
 * Creates default progress state
 */
function createDefaultProgress(): LearningProgress {
  return {
    viewedSections: [],
    completedQuizzes: [],
    comparisonsTried: 0,
    lastActivity: new Date()
  };
}

/**
 * Loads progress from localStorage
 */
function loadStoredProgress(): LearningProgress {
  if (typeof window === 'undefined') return createDefaultProgress();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...parsed,
        lastActivity: new Date(parsed.lastActivity)
      };
    }
  } catch {
    // localStorage might be blocked or data corrupted
  }
  return createDefaultProgress();
}

/**
 * Saves progress to localStorage
 */
function saveProgress(progress: LearningProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // localStorage might be blocked
  }
}

interface ProgressProviderProps {
  children: ReactNode;
}

/**
 * Progress Provider Component
 * Wraps the application to provide progress tracking
 */
export function ProgressProvider({ children }: ProgressProviderProps): React.ReactElement {
  const [progress, setProgress] = useState<LearningProgress>(createDefaultProgress);

  // Load progress from storage on mount
  useEffect(() => {
    setProgress(loadStoredProgress());
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const markSectionViewed = useCallback((sectionId: string) => {
    setProgress(prev => {
      if (prev.viewedSections.includes(sectionId)) {
        return { ...prev, lastActivity: new Date() };
      }
      return {
        ...prev,
        viewedSections: [...prev.viewedSections, sectionId],
        lastActivity: new Date()
      };
    });
  }, []);

  const markQuizCompleted = useCallback((quizId: string) => {
    setProgress(prev => {
      if (prev.completedQuizzes.includes(quizId)) {
        return { ...prev, lastActivity: new Date() };
      }
      return {
        ...prev,
        completedQuizzes: [...prev.completedQuizzes, quizId],
        lastActivity: new Date()
      };
    });
  }, []);

  const incrementComparisons = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      comparisonsTried: prev.comparisonsTried + 1,
      lastActivity: new Date()
    }));
  }, []);

  const getProgressPercentage = useCallback(() => {
    const sectionWeight = 0.6; // 60% weight for sections
    const quizWeight = 0.3; // 30% weight for quizzes
    const comparisonWeight = 0.1; // 10% weight for comparisons

    const sectionProgress = progress.viewedSections.length / ALL_SECTIONS.length;
    const quizProgress = progress.completedQuizzes.length / Math.max(1, 3); // Assuming 3 quizzes
    const comparisonProgress = Math.min(1, progress.comparisonsTried / 5); // Cap at 5 comparisons

    return Math.round(
      (sectionProgress * sectionWeight +
       quizProgress * quizWeight +
       comparisonProgress * comparisonWeight) * 100
    );
  }, [progress]);

  const resetProgress = useCallback(() => {
    setProgress(createDefaultProgress());
  }, []);

  return (
    <ProgressContext.Provider value={{
      progress,
      markSectionViewed,
      markQuizCompleted,
      incrementComparisons,
      getProgressPercentage,
      resetProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

/**
 * Hook to access progress context
 * @throws Error if used outside ProgressProvider
 */
export function useProgress(): ProgressContextType {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}

/**
 * Progress Indicator Component
 * Shows user's learning progress
 */
export function ProgressIndicator(): React.ReactElement {
  const { progress, getProgressPercentage } = useProgress();
  const percentage = getProgressPercentage();

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
      <div className="flex-1">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1">
          <span className="text-slate-500 dark:text-slate-400">Learning Progress</span>
          <span className="text-emerald-600 dark:text-emerald-400">{percentage}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Learning progress"
          />
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg font-black text-slate-900 dark:text-white">{progress.viewedSections.length}</p>
        <p className="text-[8px] text-slate-400 uppercase font-bold">Sections</p>
      </div>
    </div>
  );
}
