'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { FC } from 'react';

interface ScoreGaugeProps {
  score: number;
}

export const ScoreGauge: FC<ScoreGaugeProps> = ({ score }) => {
  const data = [
    { value: score },
    { value: 100 - score },
  ];

  return (
    <div className="relative w-64 h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={0}
            dataKey="value"
          >
            <Cell fill="#2563eb" />
            <Cell fill="#e5e7eb" />
          </Pie>
          <Label
            value={`${score}%`}
            position="center"
            className="text-4xl font-bold fill-gray-900"
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm text-gray-500 font-medium">
        ATS SCORE
      </div>
    </div>
  );
};
