import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const resumes = await prisma.resume.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(resumes);
  } catch (error: any) {
    console.error('Fetch Resumes Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
