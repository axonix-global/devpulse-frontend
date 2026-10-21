'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authApi } from '@/services/api';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ fullName: '', email: '', password: '', role: 'ROLE_USER', subdomain: 'default' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authApi.signup(form);
      localStorage.setItem('devpulse_token', res.token);
      localStorage.setItem('devpulse_user_id', res.userId);
      localStorage.setItem('devpulse_email', res.email);
      if (res.role) {
        localStorage.setItem('devpulse_role', res.role);
      }
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Email might already exist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Header Navigation */}
      <header className="px-6 lg:px-12 py-6 flex items-center justify-between border-b border-slate-900">
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/logo.svg" alt="DevPulse Logo" className="h-8 w-auto group-hover:scale-105 transition-transform" />
          <span className="text-lg font-bold tracking-tight text-white">Dev<span className="text-emerald-400">Pulse</span></span>
        </Link>
        <Link href="/" className="text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1">
          ← Back to Main Screen
        </Link>
      </header>

      {/* Main Registration Form Section */}
      <main className="flex-1 flex items-center justify-center p-6 my-8">
        <div className="w-full max-w-lg p-8 sm:p-10 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500" />
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Create DevPulse Workspace</h1>
            <p className="text-xs text-slate-400 mt-1.5">Join thousands of software engineers & technical teams</p>
          </div>

          {error && (
            <div className="p-3.5 mb-6 text-xs rounded-lg bg-red-950/80 text-red-300 border border-red-800/80 flex items-start gap-2">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
              <input required type="text" placeholder="e.g. John Doe"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-xs transition-colors"
                value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Work Email Address</label>
              <input required type="email" placeholder="name@company.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-xs transition-colors"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
                <input required type="password" placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-xs transition-colors"
                  value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Role Type</label>
                <select className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 text-xs transition-colors"
                  value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                  <option value="ROLE_USER">Standard User</option>
                  <option value="ROLE_ADMIN">Team Admin</option>
                  <option value="ROLE_SUPER_ADMIN">Super Admin</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tenant Subdomain Workspace</label>
              <div className="flex items-center">
                <input required type="text" placeholder="mycompany"
                  className="w-full px-3.5 py-2.5 rounded-l-lg bg-slate-950 border border-r-0 border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-xs font-mono"
                  value={form.subdomain} onChange={(e) => setForm({ ...form, subdomain: e.target.value })} />
                <span className="px-3 py-2.5 bg-slate-900 border border-slate-800 text-slate-400 text-xs rounded-r-lg font-mono">.devpulse.ai</span>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-lg bg-emerald-600 font-semibold text-white hover:bg-emerald-500 transition-all text-xs shadow-lg shadow-emerald-950/60 disabled:opacity-50 mt-2">
              {loading ? 'Creating Workspace...' : 'Create Account & Access Dashboard'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800/80 text-center text-xs text-slate-400">
            Already have an active account?{' '}
            <Link href="/login" className="text-emerald-400 font-semibold hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-[11px] text-slate-500 border-t border-slate-900">
        © {new Date().getFullYear()} DevPulse SaaS Platform. All rights reserved.
      </footer>
    </div>
  );
}
