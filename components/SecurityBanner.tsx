import { Lock, Shield, FileKey2, Eye } from "lucide-react";

export default function SecurityBanner() {
  return (
    <div className="rounded-lg border border-signal-teal/30 bg-signal-teal/5 px-4 py-3 mb-6 flex flex-wrap items-center gap-4 text-xs">
      <div className="flex items-center gap-2 text-signal-teal font-medium">
        <Shield size={14} />
        Federally Regulated Health Data Environment
      </div>
      <div className="flex flex-wrap gap-4 text-slate">
        <span className="flex items-center gap-1">
          <Lock size={12} /> TLS 1.3 in transit
        </span>
        <span className="flex items-center gap-1">
          <FileKey2 size={12} /> AES-256 at rest
        </span>
        <span className="flex items-center gap-1">
          <Eye size={12} /> Immutable audit logging
        </span>
      </div>
    </div>
  );
}
