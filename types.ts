/**
 * Core type definitions for LLM Training Lab
 * These types are used throughout the application for type safety
 */

/**
 * Training stages in the LLM development pipeline
 */
export enum TrainingStage {
  /** Initial training on large text corpora */
  PRETRAINING = 'PRETRAINING',
  /** Supervised Fine-Tuning with human demonstrations */
  SFT = 'SFT',
  /** Reinforcement Learning with Human Feedback / Direct Preference Optimization */
  RLHF_DPO = 'RLHF_DPO'
}

/**
 * Represents a failure mode that SFT models commonly exhibit
 */
export interface FailureMode {
  /** Unique identifier for the failure mode */
  id: string;
  /** Human-readable title */
  title: string;
  /** Description of the failure mode */
  description: string;
  /** Example of how SFT model fails */
  sftExample: string;
  /** Example of how RL-aligned model handles it */
  rlExample: string;
  /** Explanation of why RL works better */
  explanation: string;
}

/**
 * Result from the AI comparison API
 */
export interface ComparisonResult {
  /** Response generated in SFT-only style */
  sftResponse: string;
  /** Response generated in RL-aligned style */
  rlResponse: string;
  /** Analysis explaining the differences */
  analysis: string;
}

/**
 * Stage configuration for display
 */
export interface StageConfig {
  /** Training stage identifier */
  id: TrainingStage;
  /** Display title */
  title: string;
  /** Subtitle/secondary title */
  subtitle: string;
  /** Full description */
  description: string;
  /** Primary goal of this stage */
  goal: string;
  /** Data requirements */
  data: string;
  /** Mathematical objective */
  math: string;
  /** Tailwind color class */
  color: string;
}

/**
 * Chart data point for visualization
 */
export interface ChartDataPoint {
  /** Data point name/label */
  name: string;
  /** Numeric value */
  value: number;
}

/**
 * Error log entry
 */
export interface ErrorLogEntry {
  /** Error message */
  message: string;
  /** Severity level */
  severity: 'info' | 'warning' | 'error' | 'critical';
  /** When the error occurred */
  timestamp: Date;
  /** Additional context */
  context?: Record<string, unknown>;
  /** Original error object */
  error?: Error;
}

/**
 * API request configuration
 */
export interface ApiConfig {
  /** Maximum prompt length */
  maxPromptLength: number;
  /** Request timeout in milliseconds */
  timeoutMs: number;
  /** Minimum interval between requests in milliseconds */
  minRequestInterval: number;
}

/**
 * User preferences (for future dark mode, etc.)
 */
export interface UserPreferences {
  /** Theme preference */
  theme: 'light' | 'dark' | 'system';
  /** Reduce motion preference */
  reduceMotion: boolean;
  /** Font size preference */
  fontSize: 'small' | 'medium' | 'large';
}

/**
 * Learning progress tracking
 */
export interface LearningProgress {
  /** Sections the user has viewed */
  viewedSections: string[];
  /** Quizzes completed */
  completedQuizzes: string[];
  /** Comparison prompts tried */
  comparisonsTried: number;
  /** Last activity timestamp */
  lastActivity: Date;
}
