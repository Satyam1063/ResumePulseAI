import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, FileText, Calendar } from 'lucide-react';

export default async function ResumeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const resume = await prisma.resume.findUnique({
    where: { id },
  });

  if (!resume) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/admin/resumes">
            <Button variant="ghost" className="flex items-center text-slate-500 hover:text-slate-800">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Resumes
            </Button>
          </Link>
          <div className="text-right">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Resume ID</span>
            <p className="text-sm font-mono text-slate-600">{resume.id}</p>
          </div>
        </div>

        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <FileText className="w-6 h-6 text-blue-500" />
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{resume.fileName}</h1>
              <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                <Calendar className="w-4 h-4" />
                Uploaded on {new Date(resume.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Extracted Content</h3>
            <div className="p-6 bg-slate-100 rounded-lg border border-slate-200 text-slate-800 font-mono text-sm leading-relaxed whitespace-pre-wrap overflow-auto max-h-[60vh]">
              {resume.extractedText || (
                <span className="text-slate-400 italic">No text was extracted from this document.</span>
              )}
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
