
import { GoogleGenAI, Type } from "@google/genai";
import { ComparisonResult } from '../types';

export const analyzePrompt = async (prompt: string): Promise<ComparisonResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are an expert AI researcher. 
    Analyze the given prompt and generate two simulated responses:
    1. An 'SFT-only' response: Mimics typical SFT failures (too verbose, slightly sycophantic, over-confident, or prone to hedging).
    2. An 'RL-Aligned' response: High-quality, helpful, honest, and harmless.
    Then, provide a brief 'analysis' explaining why RL was necessary for this specific case.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
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

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return {
      sftResponse: "Error generating simulation.",
      rlResponse: "Error generating simulation.",
      analysis: "The model was unable to generate a comparison."
    };
  }
};
