'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800 px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="DevPulse Logo" className="h-8 w-auto" />
          <span className="text-lg font-bold tracking-tight text-white">Dev<span className="text-emerald-400">Pulse</span></span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
          <a href="#about" className="hover:text-emerald-400 transition-colors">About Us</a>
          <a href="#pricing" className="hover:text-emerald-400 transition-colors">Subscription Pricing</a>
          <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact Us</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all">
            Sign In
          </Link>
          <Link href="/signup" className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/40 transition-all">
            Free Demo
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          DevPulse Enterprise SaaS v1.0 Launch
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-tight">
          AI-Powered Workspaces for <span className="text-emerald-400">Tech Professionals</span>
        </h1>
        <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
          Manage isolated developer tenants, co-pilot bullet points with local Ollama LLMs, enforce enterprise brand themes, and export ATS-ready portfolios.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/signup" className="px-8 py-3.5 rounded-xl bg-emerald-600 font-semibold hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-900/40 text-white text-sm">
            Get Started Free / Demo
          </Link>
          <a href="#pricing" className="px-8 py-3.5 rounded-xl bg-slate-900 font-semibold hover:bg-slate-800 transition-all border border-slate-800 text-slate-200 text-sm">
            View Subscription Plans
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 lg:px-12 bg-slate-900/50 border-t border-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Engineered for Modern Engineering Teams</h2>
            <p className="text-slate-400 mt-2 text-sm">Robust multi-tenant isolation combined with edge AI inference.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold mb-4">01</div>
              <h3 className="text-lg font-semibold text-white mb-2">Local AI Copilot</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Run offline LLMs via Ollama to sanitize, optimize, and elevate your technical impact statements with complete data privacy.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
              <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold mb-4">02</div>
              <h3 className="text-lg font-semibold text-white mb-2">Multi-Tenant Isolation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Segregated Flyway migrations supporting local H2 development and enterprise-grade PostgreSQL clusters with field-level encryption.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold mb-4">03</div>
              <h3 className="text-lg font-semibold text-white mb-2">Brand-Governed Themes</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Super Admins publish global resume and portfolio layouts while Team Admins enforce corporate branding across organization workspaces.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-6 lg:px-12 bg-slate-950 border-t border-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">About DevPulse</h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            DevPulse was built by senior software engineers for high-performing technical teams and professionals. We bridge the gap between individual career storytelling and enterprise talent governance. Whether you are an independent engineer maintaining a personal portfolio or an enterprise engineering leader coordinating hundreds of technical profiles, DevPulse delivers a secure, lightning-fast workspace.
          </p>
        </div>
      </section>

      {/* Subscription Pricing Section */}
      <section id="pricing" className="py-20 px-6 lg:px-12 bg-slate-900/30 border-t border-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Transparent Subscription Tiers</h2>
            <p className="text-slate-400 mt-2 text-sm">Choose the plan that fits your personal career or enterprise organization.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300">Freemium</span>
                <h3 className="text-2xl font-bold text-white mt-4">$0 <span className="text-xs font-normal text-slate-400">/ forever</span></h3>
                <p className="text-xs text-slate-400 mt-2">Essential tools for individual developers starting out.</p>
                <ul className="mt-6 space-y-3 text-xs text-slate-300">
                  <li>✓ Standard resume builder</li>
                  <li>✓ Basic PDF exports</li>
                  <li>✓ Manual profile management</li>
                </ul>
              </div>
              <Link href="/signup" className="mt-8 w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-center text-xs font-semibold transition-all">
                Get Started Free
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900 border-2 border-emerald-500/50 flex flex-col justify-between relative shadow-2xl shadow-emerald-950/50">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400">Pro Developer</span>
                <h3 className="text-2xl font-bold text-white mt-4">$19 <span className="text-xs font-normal text-slate-400">/ month</span></h3>
                <p className="text-xs text-slate-400 mt-2">Advanced features for power professionals.</p>
                <ul className="mt-6 space-y-3 text-xs text-slate-300">
                  <li>✓ Unlimited AI Copilot prompts</li>
                  <li>✓ Custom domain portfolio hosting</li>
                  <li>✓ Advanced ATS templates & themes</li>
                  <li>✓ Priority PDF rendering</li>
                </ul>
              </div>
              <Link href="/signup" className="mt-8 w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-center text-xs font-semibold transition-all shadow-lg shadow-emerald-900/40">
                Start Pro Trial
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400">Team / SMB</span>
                <h3 className="text-2xl font-bold text-white mt-4">$49 <span className="text-xs font-normal text-slate-400">/ user / mo</span></h3>
                <p className="text-xs text-slate-400 mt-2">Enterprise governance for engineering teams.</p>
                <ul className="mt-6 space-y-3 text-xs text-slate-300">
                  <li>✓ Team directory & role management</li>
                  <li>✓ Corporate brand theme enforcement</li>
                  <li>✓ Aggregated proposal generation</li>
                  <li>✓ Dedicated support & SSO</li>
                </ul>
              </div>
              <Link href="/signup" className="mt-8 w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-center text-xs font-semibold transition-all">
                Contact Enterprise Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-20 px-6 lg:px-12 bg-slate-950 border-t border-slate-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get in Touch with Our Team</h2>
          <p className="text-slate-400 text-sm mb-8">Have questions about enterprise deployments, custom themes, or API integration? Reach out to us.</p>
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Your Email</label>
              <input type="email5" placeholder="name@company.com" className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Message</label>
              <textarea rows={4} placeholder="How can we help your engineering team?" className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500" />
            </div>
            <button onClick={() => alert('Thank you! Your message has been sent to the DevPulse team.')} className="w-full py-2.5 rounded-lg bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-500 transition-all">
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-12 px-6 lg:px-12 bg-slate-950 text-slate-500 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="DevPulse Logo" className="h-6 w-auto" />
            <span className="text-slate-300 font-semibold">DevPulse SaaS Platform</span>
          </div>
          <div className="flex gap-6">
            <a href="#features" className="hover:text-slate-300 transition-colors">Features</a>
            <a href="#about" className="hover:text-slate-300 transition-colors">About Us</a>
            <a href="#pricing" className="hover:text-slate-300 transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-slate-300 transition-colors">Contact</a>
          </div>
          <div>
            © {new Date().getFullYear()} DevPulse Global Tech Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
