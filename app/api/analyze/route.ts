import { NextRequest, NextResponse } from 'next/server';
import { processResumeAnalysis } from '@/services/analysisService';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const jobDescription = formData.get('jobDescription') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await processResumeAnalysis(file.name, buffer, jobDescription || undefined);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Analysis Route Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
