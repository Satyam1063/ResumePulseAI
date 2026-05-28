'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { ScoreGauge } from '@/components/charts/ScoreGauge';
import { SkillBarChart } from '@/components/charts/SkillBarChart';
import { SectionRadar } from '@/components/charts/SectionRadar';
import { CheckCircle2, AlertCircle, ArrowLeft, XCircle } from 'lucide-react';
import Link from 'next/link';

interface Analysis {
  atsScore: number;
  feedback: {
    formatting: string;
    keywordMatch: { skill: string; snippet: string }[];
    missingKeywords: string[];
    suggestions: string[];
  };
}

export default function ResultPage() {
  const { id } = useParams();
  const [data, setData] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalysis() {
      try {
        const res = await fetch(`/api/analyze/${id}`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error('Error fetching analysis');
      } finally {
        setLoading(false);
      }
    }
    fetchAnalysis();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading analysis...</div>;
  if (!data) return <div className="min-h-screen flex items-center justify-center">Analysis not found.</div>;

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Link href="/upload" className="flex items-center text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Upload
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Analysis Results</h1>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card className="p-6 space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Analysis Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h4 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Overall ATS Score</h4>
                <ScoreGauge score={data.atsScore} />
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-600 uppercase tracking-wider text-center">Sectional Strength</h4>
                <SectionRadar scores={{
                  Formatting: data.atsScore * 0.9, // Simulated based on overall score
                  Keywords: data.feedback.keywordMatch.length * 10,
                  Experience: 80, // Mock
                  Education: 90, // Mock
                }} />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1 md:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold text-slate-700">Skill Gap Analysis</h3>
            <SkillBarChart matched={data.feedback.keywordMatch.map(m => m.skill)} missing={data.feedback.missingKeywords} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-100">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Matched Skills
                </h4>
                <div className="flex flex-col gap-3">
                  {data.feedback.keywordMatch.length > 0 ? (
                    data.feedback.keywordMatch.map((match, i) => (
                      <div key={i} className="p-2 bg-green-50 rounded-md border border-green-100">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-green-700 uppercase tracking-wider">
                            {match.skill}
                          </span>
                        </div>
                        <p className="text-xs text-green-600 italic leading-relaxed">
                          "{match.snippet}"
                        </p>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">No matching skills found</span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  Missing Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.feedback.missingKeywords.length > 0 ? (
                    data.feedback.missingKeywords.map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full border border-red-200">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">No missing skills identified</span>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-700">Formatting Feedback</h3>
            <div className="flex gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100 text-blue-700 text-sm leading-relaxed">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {data.feedback.formatting}
            </div>
          </Card>
        </div>

        <Card className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-700">How to Improve</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.feedback.suggestions.map((suggestion, i) => (
              <div key={i} className="flex gap-3 p-3 bg-slate-100 rounded-md border border-slate-200 text-slate-700 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                {suggestion}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
