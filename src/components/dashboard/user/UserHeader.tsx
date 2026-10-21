'use client';

import React from 'react';
import { User, LogOut, Sparkles, CreditCard } from 'lucide-react';

interface HeaderProps {
  role: string;
  isSubscribed: boolean;
  onUpgrade: () => void;
  onLogout: () => void;
}

export function UserHeader({ role, isSubscribed, onUpgrade, onLogout }: HeaderProps) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-800 pb-6 gap-4">
      <div className="flex items-center gap-3">
        <img src="/logo.svg" alt="DevPulse Logo" className="h-9 w-auto" />
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">DevPulse Developer Workspace</h1>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${
              isSubscribed ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}>
              <Sparkles className="w-3 h-3 text-amber-400" />
              {isSubscribed ? 'PRO SUBSCRIPTION' : 'FREE TIER'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your developer profile, explore published HTML templates, and export AI-powered resumes
          </p>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        {!isSubscribed && (
          <button
            onClick={onUpgrade}
            className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-amber-950/40"
          >
            <CreditCard className="w-3.5 h-3.5" /> Upgrade to Pro
          </button>
        )}
        <span className="text-xs px-3.5 py-1.5 rounded-lg bg-slate-900 text-emerald-400 font-mono border border-slate-800 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-emerald-400" />
          {role}
        </span>
        <button onClick={onLogout} className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all flex items-center gap-1.5">
          <LogOut className="w-3.5 h-3.5" /> Logout
        </button>
      </div>
    </header>
  );
}
