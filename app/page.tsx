import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-3xl space-y-8">
        <h1 className="text-6xl font-extrabold text-slate-900 tracking-tight">
          Optimize Your Resume for <span className="text-blue-600">ATS</span>
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          Upload your resume and get a professional AI-powered analysis.
          Increase your chances of landing an interview with a resume that
          passes Applicant Tracking Systems.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/upload">
            <Button className="px-8 py-4 text-lg">Get Started Now</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
