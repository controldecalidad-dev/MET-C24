"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COLORS: Record<string, string> = {
  whatsapp: "#22c55e",
  instagram: "#ec4899",
  link: "#6366f1",
  image: "#94a3b8",
};

interface Props {
  data: Record<string, number>;
}

export function ClicksChart({ data }: Props) {
  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }));

  if (chartData.length === 0) {
    return <p className="text-sm text-gray-400 text-center py-8">Sin datos de clicks aún</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={chartData} barSize={36}>
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} width={24} />
        <Tooltip
          contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
          cursor={{ fill: "#f3f4f6" }}
        />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {chartData.map((entry) => (
            <Cell key={entry.name} fill={COLORS[entry.name] ?? "#6366f1"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
