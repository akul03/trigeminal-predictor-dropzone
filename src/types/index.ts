
export interface FileUploadProps {
  onFileAccepted: (file: File) => void;
  isProcessing: boolean;
}

export interface PredictionResultProps {
  isLoading: boolean;
  result: PredictionData | null;
  error: string | null;
}

export interface PredictionData {
  probability: number;
  prediction: 'Positive' | 'Negative';
  confidenceScore: number;
  factors: FactorData[];
}

export interface FactorData {
  name: string;
  weight: number;
  value: string | number;
}

export interface HeaderProps {
  title: string;
}

export interface FooterProps {
  version?: string;
}
