"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface RateTrendChartProps {
  data: { cycle: string; actualRate: number; targetRate: number }[];
  title?: string;
}

export default function RateTrendChart({ data, title }: RateTrendChartProps) {
  const chartData = data.map((d) => ({
    cycle: d.cycle,
    Actual: Math.round(d.actualRate * 100),
    Target: Math.round(d.targetRate * 100),
  }));

  return (
    <div className="w-full h-64">
      {title && <p className="text-xs text-slate mb-2 font-medium">{title}</p>}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#D7DCE3" />
          <XAxis dataKey="cycle" tick={{ fontSize: 10, fill: "#4A5A70" }} />
          <YAxis tick={{ fontSize: 10, fill: "#4A5A70" }} domain={[0, 100]} unit="%" />
          <Tooltip
            contentStyle={{ fontSize: 12, borderColor: "#D7DCE3" }}
            formatter={(v: number) => [`${v}%`, ""]}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Line type="monotone" dataKey="Actual" stroke="#0E7C7B" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="Target" stroke="#4A5A70" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
