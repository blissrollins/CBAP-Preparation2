export interface Question {
  id: string; // unique ID
  number: number; // Question number e.g. 1, 2, 3
  topic?: string; // Topic/Chapter/Knowledge Area
  text: string; // Question text
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation?: string; // Cache explanation if preloaded
  babokSection?: string; // Cache BABOK section if preloaded
}

export interface ExamSession {
  id: string;
  name: string;
  date: string;
  questions: Question[];
  userAnswers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  elapsedTime: number; // in seconds
  isSubmitted: boolean;
}

export interface VerificationResult {
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  babokSection: string;
  knowledgeArea: string;
  explanation: string;
  confidenceScore: number;
}
