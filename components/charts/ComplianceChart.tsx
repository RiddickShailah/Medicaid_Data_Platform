"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ComplianceChartProps {
  data: { name: string; value: number; status: string }[];
}

const COLORS: Record<string, string> = {
  compliant: "#2F8558",
  at_risk: "#C97A2B",
  non_compliant: "#B3432B",
  open: "#0E7C7B",
  resolved: "#4A5A70",
};

export default function ComplianceChart({ data }: ComplianceChartProps) {
  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#D7DCE3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#4A5A70" }} />
          <YAxis tick={{ fontSize: 10, fill: "#4A5A70" }} allowDecimals={false} />
          <Tooltip contentStyle={{ fontSize: 12, borderColor: "#D7DCE3" }} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={COLORS[entry.status] ?? "#0E7C7B"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
