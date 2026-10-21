'use client';

import React from 'react';
import { ShieldCheck, LogOut, Activity } from 'lucide-react';

interface HeaderProps {
  role: string;
  onLogout: () => void;
}

export function SuperAdminHeader({ role, onLogout }: HeaderProps) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-800 pb-6 gap-4">
      <div className="flex items-center gap-3">
        <img src="/logo.svg" alt="DevPulse Logo" className="h-9 w-auto" />
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">DevPulse Control Center</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Enterprise Multi-Tenant
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Global Super Admin system governance, cluster health, and template deployment pipeline
          </p>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <span className="text-xs px-3.5 py-1.5 rounded-lg bg-slate-900 text-emerald-400 font-mono border border-slate-800 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          {role}
        </span>
        <button onClick={onLogout} className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all flex items-center gap-1.5">
          <LogOut className="w-3.5 h-3.5" /> Logout
        </button>
      </div>
    </header>
  );
}
