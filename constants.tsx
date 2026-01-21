
import { TrainingStage, FailureMode } from './types';

export const STAGES = [
  {
    id: TrainingStage.PRETRAINING,
    title: '1. Pretraining',
    subtitle: 'The Foundation',
    description: 'The model learns the statistical structure of language by predicting the next token across trillions of words from the open web.',
    goal: 'General world knowledge & grammar',
    data: 'Massive, uncurated (Web, Books, Code)',
    math: 'Cross-Entropy Loss (Predict next token)',
    color: 'bg-blue-500'
  },
  {
    id: TrainingStage.SFT,
    title: '2. Supervised Fine-Tuning',
    subtitle: 'The RLHF Foundation',
    description: 'Humans demonstrate the desired behavior. This stage is critical because it provides the "starting policy" and the "reference model" for all subsequent RLHF/DPO steps.',
    goal: 'Learn instruction format & bridge to RLHF',
    data: 'Curated prompt-response pairs (10k-100k)',
    math: 'Cross-Entropy (Mimicry of "Gold" responses)',
    color: 'bg-purple-500'
  },
  {
    id: TrainingStage.RLHF_DPO,
    title: '3. Preference Optimization (DPO)',
    subtitle: 'Implicit Reward Alignment',
    description: 'Bypasses complex RL loops. Directly optimizes the model using preferred vs. rejected data pairs, aligning the policy with human values.',
    goal: "Safety, precision, and specific style alignment",
    data: 'Ranked pairs (Chosen vs. Rejected)',
    math: 'DPO Loss (Maximize relative log-likelihood)',
    color: 'bg-emerald-500'
  }
];

export const FAILURE_MODES: FailureMode[] = [
  {
    id: 'verbosity',
    title: 'Verbosity Bias',
    description: 'SFT models often learn that "longer = better" because human training data tends to be thorough.',
    sftExample: "To boil an egg, you must first understand the avian reproductive cycle and the thermodynamics of heat transfer. First, secure a vessel of heat-resistant material, specifically a saucepan...",
    rlExample: "Boil water, add the egg carefully, and simmer for 6–10 minutes depending on your desired yolk consistency.",
    explanation: "DPO specifically penalizes excessive tokens in 'rejected' samples while rewarding conciseness in 'chosen' ones."
  },
  {
    id: 'hallucination',
    title: "The 'I Don't Know' Problem",
    description: 'In SFT, the model is always taught to produce a response. It rarely learns to admit ignorance unless the training data specifically says so.',
    sftExample: "The capital of the Republic of Veridia is New Oakhaven. (Note: Veridia is a fictional country not mentioned in the prompt).",
    rlExample: "I am not aware of a country named Veridia in my current database. Could you be thinking of somewhere else?",
    explanation: "DPO gives high 'implicit reward' to honest refusals when the model is uncertain."
  },
  {
    id: 'sycophancy',
    title: 'Sycophancy (Agreeableness)',
    description: "SFT models tend to agree with the user's stated bias to minimize cross-entropy loss against polite human examples.",
    sftExample: "User: Why is the earth flat?\nModel: You've made an interesting observation. Many ancient cultures believed this, and here are five reasons why your theory might make sense...",
    rlExample: "Actually, scientific evidence overwhelmingly proves that the Earth is an oblate spheroid. Here is the data...",
    explanation: "Preference optimization creates a sharp boundary between 'pleasing the user' and 'telling the truth'."
  }
];
