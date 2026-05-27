import { geminiModel } from '@/lib/gemini';
import { GeminiAnalysisResponse } from '@/types';

export async function analyzeResume(resumeText: string, jobDescription?: string): Promise<GeminiAnalysisResponse> {
  const prompt = `
    You are an expert ATS (Applicant Tracking System) and professional resume reviewer.
    Analyze the following resume text against the provided job description (if available).

    Resume Text:
    ${resumeText}

    Job Description:
    ${jobDescription || 'No specific job description provided. Analyze for general professional quality and ATS validity.'}

    Please provide the analysis in a strict JSON format. Do not include markdown formatting like \`\`\`json.

    The JSON must have the following structure:
    {
      "atsScore": number (0-100, based on matching keywords, formatting, and professional impact),
      "feedback": {
        "formatting": "Detailed feedback on layout, fonts, and ATS compatibility",
        "keywordMatch": [
          { "skill": "Skill Name", "snippet": "The exact phrase/sentence from the resume where this skill is mentioned" }
        ],
        "missingKeywords": ["List of critical keywords missing for this role"],
        "suggestions": ["Actionable tips to improve the resume"]
      }
    }
  `;

  try {
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response in case the model included markdown blocks despite the prompt
    const cleanedText = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanedText) as GeminiAnalysisResponse;
  } catch (error) {
    console.error('Gemini AI Error:', error);
    throw new Error('AI analysis failed');
  }
}
