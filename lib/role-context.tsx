"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Role } from "@/lib/types";

export interface SessionUser {
  role: Role;
  mcoId: string | null;
  label: string;
}

const ROLE_PRESETS: Record<Role, SessionUser> = {
  regulator: { role: "regulator", mcoId: null, label: "State Regulator" },
  mco_admin: { role: "mco_admin", mcoId: "mco-002", label: "MCO Administrator · Horizon Health Partners" },
  mco_analyst: { role: "mco_analyst", mcoId: "mco-002", label: "MCO Analyst · Horizon Health Partners" },
  auditor: { role: "auditor", mcoId: null, label: "Compliance Auditor" },
};

interface RoleContextValue {
  user: SessionUser;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextValue | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser>(ROLE_PRESETS.regulator);
  const setRole = (role: Role) => setUser(ROLE_PRESETS[role]);
  return (
    <RoleContext.Provider value={{ user, setRole }}>{children}</RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
}

export function canViewAllMcos(role: Role) {
  return role === "regulator" || role === "auditor";
}
