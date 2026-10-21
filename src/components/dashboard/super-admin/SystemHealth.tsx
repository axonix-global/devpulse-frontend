'use client';

import React from 'react';
import { Activity, Database, Server } from 'lucide-react';

export function SystemHealth() {
  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
      <h2 className="text-lg font-bold text-white flex items-center gap-2">
        <Activity className="w-5 h-5 text-emerald-400" />
        System Infrastructure & Database Migrations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
            <Database className="w-4 h-4" /> H2 In-Memory (Local Dev)
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Flyway migration path: <code className="text-emerald-300 font-mono">db/migration/h2/</code><br />
            Status: <span className="text-emerald-400 font-semibold">Synchronized & Active</span><br />
            Console: <code className="text-slate-400 font-mono">http://localhost:8080/h2-console</code>
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
            <Server className="w-4 h-4" /> PostgreSQL (Production)
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Flyway migration path: <code className="text-indigo-300 font-mono">db/migration/postgresql/</code><br />
            Status: <span className="text-indigo-400 font-semibold">Cluster Deployment Ready</span><br />
            Security: <code className="text-slate-400 font-mono">pgcrypto enabled</code>
          </p>
        </div>
      </div>
    </div>
  );
}
