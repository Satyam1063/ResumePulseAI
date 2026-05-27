export interface ResumeData {
  fileName: string;
  filePath: string;
  text: string;
}

export interface AnalysisFeedback {
  formatting: string;
  keywordMatch: string[];
  missingKeywords: string[];
  suggestions: string[];
}

export interface AnalysisResult {
  atsScore: number;
  feedback: AnalysisFeedback;
}

export interface GeminiAnalysisResponse {
  atsScore: number;
  feedback: AnalysisFeedback;
}
