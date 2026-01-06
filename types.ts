
export enum TrainingStage {
  PRETRAINING = 'PRETRAINING',
  SFT = 'SFT',
  RLHF_DPO = 'RLHF_DPO'
}

export interface FailureMode {
  id: string;
  title: string;
  description: string;
  sftExample: string;
  rlExample: string;
  explanation: string;
}

export interface ComparisonResult {
  sftResponse: string;
  rlResponse: string;
  analysis: string;
}
