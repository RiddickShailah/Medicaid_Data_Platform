// TODO (Cursor prompt 7): replace the static role label below with a real
// role-switcher wired to lib/role-context.tsx, per SECURITY.md and CURSOR_PROMPTS.md.

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-hairline bg-paper-raised px-6 py-3 md:px-10">
      <div className="text-sm text-slate font-body">
        Signed in as{" "}
        <span className="font-medium text-ink">State Regulator</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-slate font-mono">
        <span className="inline-block h-2 w-2 rounded-full bg-verified-green" />
        Secure session · TLS
      </div>
    </header>
  );
}
