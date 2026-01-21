/**
 * History Storage Utilities
 * Manages comparison history in localStorage
 */

import { ComparisonResult } from '../types';

const STORAGE_KEY = 'llm-training-lab-history';
const MAX_HISTORY_ITEMS = 20;

/**
 * Stored comparison entry
 */
export interface HistoryEntry {
  id: string;
  timestamp: string;
  prompt: string;
  result: ComparisonResult;
  favorite: boolean;
}

/**
 * Generates a unique ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Loads history from localStorage
 */
export function loadHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // localStorage might be blocked or data corrupted
  }
  return [];
}

/**
 * Saves history to localStorage
 */
function saveHistory(history: HistoryEntry[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // localStorage might be full or blocked
  }
}

/**
 * Adds a new comparison to history
 */
export function addToHistory(prompt: string, result: ComparisonResult): HistoryEntry {
  const history = loadHistory();

  const entry: HistoryEntry = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    prompt,
    result,
    favorite: false
  };

  // Add to beginning of array
  history.unshift(entry);

  // Keep only max items (but keep all favorites)
  const favorites = history.filter(h => h.favorite);
  const nonFavorites = history.filter(h => !h.favorite);

  const trimmedHistory = [
    ...favorites,
    ...nonFavorites.slice(0, MAX_HISTORY_ITEMS - favorites.length)
  ];

  saveHistory(trimmedHistory);
  return entry;
}

/**
 * Removes an entry from history
 */
export function removeFromHistory(id: string): void {
  const history = loadHistory();
  const filtered = history.filter(h => h.id !== id);
  saveHistory(filtered);
}

/**
 * Toggles favorite status
 */
export function toggleFavorite(id: string): boolean {
  const history = loadHistory();
  const entry = history.find(h => h.id === id);

  if (entry) {
    entry.favorite = !entry.favorite;
    saveHistory(history);
    return entry.favorite;
  }

  return false;
}

/**
 * Gets favorites only
 */
export function getFavorites(): HistoryEntry[] {
  return loadHistory().filter(h => h.favorite);
}

/**
 * Clears all history (except favorites if specified)
 */
export function clearHistory(keepFavorites = true): void {
  if (keepFavorites) {
    const favorites = getFavorites();
    saveHistory(favorites);
  } else {
    saveHistory([]);
  }
}

/**
 * Gets a specific entry by ID
 */
export function getHistoryEntry(id: string): HistoryEntry | undefined {
  return loadHistory().find(h => h.id === id);
}

/**
 * Searches history by prompt text
 */
export function searchHistory(query: string): HistoryEntry[] {
  const lowercaseQuery = query.toLowerCase();
  return loadHistory().filter(h =>
    h.prompt.toLowerCase().includes(lowercaseQuery) ||
    h.result.analysis.toLowerCase().includes(lowercaseQuery)
  );
}

/**
 * Gets history statistics
 */
export function getHistoryStats(): {
  totalComparisons: number;
  favorites: number;
  lastActivity: string | null;
} {
  const history = loadHistory();
  return {
    totalComparisons: history.length,
    favorites: history.filter(h => h.favorite).length,
    lastActivity: history.length > 0 ? history[0]?.timestamp ?? null : null
  };
}
