"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface McoAttainmentChartProps {
  data: { name: string; attainment: number; region: string }[];
}

export default function McoAttainmentChart({ data }: McoAttainmentChartProps) {
  const sorted = [...data].sort((a, b) => b.attainment - a.attainment);
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={sorted} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#D7DCE3" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 10, fill: "#4A5A70" }} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 9, fill: "#12213B" }} width={75} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderColor: "#D7DCE3" }}
            formatter={(v: number) => [`${v}%`, "Attainment"]}
          />
          <ReferenceLine x={85} stroke="#C97A2B" strokeDasharray="4 4" label={{ value: "85% target", fontSize: 10, fill: "#C97A2B" }} />
          <Bar dataKey="attainment" fill="#0E7C7B" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
