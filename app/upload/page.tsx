'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, FileText, Loader2 } from 'lucide-react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleUpload() {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('jobDescription', jobDesc);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.analysisId) {
        router.push(`/result/${data.analysisId}`);
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (e) {
      alert('Error uploading file');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Upload Your Resume</h1>
          <p className="text-slate-500">PDF format only. Max 5MB.</p>
        </div>

        <Card className="space-y-6">
          <div
            className={`border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center gap-4 transition-colors
              ${file ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
          >
            <Upload className="w-12 h-12 text-slate-400" />
            <div className="text-center">
              {file ? (
                <div className="flex items-center gap-2 font-medium text-blue-600">
                  <FileText className="w-5 h-5" />
                  {file.name}
                </div>
              ) : (
                <p className="text-slate-500">Drag and drop your PDF here or click to browse</p>
              )}
            </div>
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              id="file-upload"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <Button
              variant="secondary"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              Select File
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Target Job Description (Optional)
            </label>
            <textarea
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none h-32"
              placeholder="Paste the job description here to get a more tailored analysis..."
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
            />
          </div>

          <Button
            className="w-full py-6 text-lg"
            disabled={!file || loading}
            onClick={handleUpload}
          >
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Analyzing Resume...</>
            ) : (
              'Analyze Now'
            )}
          </Button>
        </Card>
      </div>
    </main>
  );
}
