import { prisma } from '@/lib/prisma';
import { extractTextFromPDF } from './pdfService';
import { analyzeResume } from './aiService';
import { AnalysisResult } from '@/types';

export async function processResumeAnalysis(
  fileName: string,
  fileBuffer: Buffer,
  jobDescription?: string
): Promise<{ analysisId: string; result: AnalysisResult }> {
  // 1. Extract text from PDF
  const extractedText = await extractTextFromPDF(fileBuffer);

  // 2. Save resume to DB
  const resume = await prisma.resume.create({
    data: {
      fileName,
      filePath: 'local-storage', // In production, use S3 URL
      extractedText,
    },
  });

  // 3. Get AI Analysis
  const aiResult = await analyzeResume(extractedText, jobDescription);

  // 4. Save analysis to DB
  const analysis = await prisma.analysis.create({
    data: {
      resumeId: resume.id,
      jobDescription,
      atsScore: aiResult.atsScore,
      feedback: aiResult.feedback as any,
    },
  });

  return {
    analysisId: analysis.id,
    result: {
      atsScore: aiResult.atsScore,
      feedback: aiResult.feedback,
    },
  };
}
