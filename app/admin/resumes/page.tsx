import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, User } from 'lucide-react';

export default async function AdminResumesPage() {
  const resumes = await prisma.resume.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <main className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900">All Resumes</h1>
            <p className="text-slate-500">Manage and review all uploaded candidate resumes</p>
          </div>
          <Link href="/upload">
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Upload New
            </Button>
          </Link>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">File Name</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Upload Date</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {resumes.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-slate-400 italic">
                      No resumes uploaded yet.
                    </td>
                  </tr>
                ) : (
                  resumes.map((resume) => (
                    <tr key={resume.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-slate-400" />
                          <span className="text-sm font-medium text-slate-700">{resume.fileName}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-slate-500">
                        {new Date(resume.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <Link href={`/admin/resumes/${resume.id}`}>
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                            View Content
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </main>
  );
}
