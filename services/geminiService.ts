
import { GoogleGenAI, Type } from '@google/genai';
import { ComparisonResult } from '../types';
import { logger } from '../utils/errorLogger';

// Constants
const MAX_PROMPT_LENGTH = 2000;
const API_TIMEOUT_MS = 30000;
const MODEL_NAME = 'gemini-3-flash-preview';

// Rate limiting (simple client-side throttle)
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 2000; // 2 seconds between requests

/**
 * Validates the API key is configured
 * WARNING: This exposes the API key in the client bundle.
 * For production, move all API calls to a backend server.
 */
function validateApiKey(): string {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_api_key_here') {
    logger.critical('SECURITY WARNING: Gemini API key not configured or using placeholder value');
    throw new Error(
      'API key not configured. Please set VITE_GEMINI_API_KEY in your .env.local file. ' +
      'See .env.local.example for details.'
    );
  }

  // Basic security check - warn if key looks suspicious
  if (apiKey.length < 20) {
    logger.warn('API key seems too short - please verify it is correct');
  }

  return apiKey;
}

/**
 * Validates and sanitizes user input
 */
function validatePrompt(prompt: string): string {
  if (!prompt || typeof prompt !== 'string') {
    throw new Error('Prompt must be a non-empty string');
  }

  const trimmed = prompt.trim();

  if (trimmed.length === 0) {
    throw new Error('Prompt cannot be empty');
  }

  if (trimmed.length > MAX_PROMPT_LENGTH) {
    logger.warn('Prompt exceeds maximum length, truncating', {
      originalLength: trimmed.length,
      maxLength: MAX_PROMPT_LENGTH
    });
    return trimmed.substring(0, MAX_PROMPT_LENGTH);
  }

  return trimmed;
}

/**
 * Simple rate limiting check
 */
function checkRateLimit(): void {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
    throw new Error(`Rate limit: Please wait ${Math.ceil(waitTime / 1000)} seconds before making another request`);
  }

  lastRequestTime = now;
}

/**
 * Analyzes a prompt and generates SFT vs RL comparison
 * @param prompt - User prompt to analyze
 * @returns Comparison result with SFT and RL responses
 * @throws Error if API key is missing, prompt is invalid, or API call fails
 */
export async function analyzePrompt(prompt: string): Promise<ComparisonResult> {
  try {
    // Validate inputs
    const apiKey = validateApiKey();
    const validatedPrompt = validatePrompt(prompt);
    checkRateLimit();

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `
      You are an expert AI researcher.
      Analyze the given prompt and generate two simulated responses:
      1. An 'SFT-only' response: Mimics typical SFT failures (too verbose, slightly sycophantic, over-confident, or prone to hedging).
      2. An 'RL-Aligned' response: High-quality, helpful, honest, and harmless.
      Then, provide a brief 'analysis' explaining why RL was necessary for this specific case.
    `;

    // Create timeout promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('API request timed out')), API_TIMEOUT_MS);
    });

    // Race between API call and timeout
    const apiPromise = ai.models.generateContent({
      model: MODEL_NAME,
      contents: validatedPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sftResponse: { type: Type.STRING },
            rlResponse: { type: Type.STRING },
            analysis: { type: Type.STRING }
          },
          required: ['sftResponse', 'rlResponse', 'analysis']
        }
      }
    });

    const response = await Promise.race([apiPromise, timeoutPromise]);

    // Parse response
    try {
      const parsed = JSON.parse(response.text);

      // Validate response structure
      if (!parsed.sftResponse || !parsed.rlResponse || !parsed.analysis) {
        throw new Error('Invalid response structure from API');
      }

      logger.info('Successfully generated comparison', {
        promptLength: validatedPrompt.length
      });

      return parsed;
    } catch (parseError) {
      logger.error('Failed to parse Gemini response', parseError as Error, {
        responseText: response.text?.substring(0, 100)
      });

      throw new Error('Failed to parse API response. Please try again.');
    }

  } catch (error) {
    // Log error with context
    if (error instanceof Error) {
      logger.error('API request failed', error, {
        promptLength: prompt?.length,
        errorMessage: error.message
      });

      // Re-throw user-friendly error
      if (error.message.includes('API key')) {
        throw error; // Pass through API key errors
      } else if (error.message.includes('Rate limit')) {
        throw error; // Pass through rate limit errors
      } else if (error.message.includes('timed out')) {
        throw new Error('Request timed out. Please check your internet connection and try again.');
      } else if (error.message.includes('quota') || error.message.includes('429')) {
        throw new Error('API quota exceeded. Please try again later.');
      } else if (error.message.includes('401') || error.message.includes('403')) {
        throw new Error('Invalid API key. Please check your .env.local file.');
      } else {
        throw new Error('Failed to generate comparison. Please try again.');
      }
    }

    // Fallback for unknown errors
    logger.critical('Unexpected error in analyzePrompt', undefined, { error });
    throw new Error('An unexpected error occurred. Please try again.');
  }
}
