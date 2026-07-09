interface KpiCardProps {
  label: string;
  value: string;
  sublabel?: string;
}

export default function KpiCard({ label, value, sublabel }: KpiCardProps) {
  return (
    <div className="border border-hairline bg-paper-raised rounded px-5 py-4">
      <div className="text-xs uppercase tracking-wide text-slate mb-2">
        {label}
      </div>
      <div className="font-display text-3xl text-ink">{value}</div>
      {sublabel && (
        <div className="text-xs text-slate mt-1 font-mono">{sublabel}</div>
      )}
    </div>
  );
}
