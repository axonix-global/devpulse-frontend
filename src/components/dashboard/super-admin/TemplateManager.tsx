'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { templateApi } from '@/services/api';
import { TemplateData } from '@/types';
import { TemplatePreviewModal } from './TemplatePreviewModal';
import { Palette, Plus, Eye, Code, Sparkles, ShieldCheck } from 'lucide-react';

export function TemplateManager() {
  const queryClient = useQueryClient();
  const [previewTemplate, setPreviewTemplate] = useState<TemplateData | null>(null);
  const [form, setForm] = useState<TemplateData>({
    name: '',
    type: 'RESUME_PDF',
    htmlStructure: '<div class="p-8"><h1>Souvik Laha</h1><p>Senior Software Engineer specializing in Java, Spring Boot, and Cloud Architecture.</p></div>',
    cssStyles: 'body { font-family: sans-serif; color: #1e293b; background: #f8fafc; padding: 2rem; } h1 { color: #059669; }',
    isPremium: false,
  });

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: templateApi.getTemplates,
  });

  const createMutation = useMutation({
    mutationFn: templateApi.createTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      // Notification handled by parent dashboard modal
      setForm({
        name: '',
        type: 'RESUME_PDF',
        htmlStructure: '<div class="p-8"><h1>Souvik Laha</h1><p>Senior Software Engineer specializing in Java, Spring Boot, and Cloud Architecture.</p></div>',
        cssStyles: 'body { font-family: sans-serif; color: #1e293b; background: #f8fafc; padding: 2rem; } h1 { color: #059669; }',
        isPremium: false,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(form);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Palette className="w-5 h-5 text-teal-400" />
          Published Global HTML Templates (Swagger /api/v1/templates)
        </h2>
        {isLoading ? (
          <div className="text-xs text-slate-400">Loading templates from backend...</div>
        ) : (
          <div className="space-y-3">
            {templates.map((tpl) => (
              <div key={tpl.id || tpl.name} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">{tpl.name}</h3>
                    {tpl.isPremium ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Premium
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Free Standard
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Type: <span className="text-slate-200 font-mono">{tpl.type}</span> | Premium Flag: <span className="text-amber-400 font-semibold">{tpl.isPremium ? 'Yes (Subscription Required)' : 'No (Free for All Users)'}</span>
                  </p>
                </div>
                <button
                  onClick={() => setPreviewTemplate(tpl)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-emerald-400" /> Live Preview
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <h2 className="text-md font-bold text-white mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-400" />
          Upload New Template
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Template Name</label>
            <input required type="text" placeholder="e.g. Modern ATS Minimalist"
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Category</label>
              <select className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as any })}>
                <option value="RESUME_PDF">Resume PDF</option>
                <option value="FRONTEND_PORTFOLIO">Frontend Portfolio</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Tier Access
              </label>
              <select
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500 font-semibold"
                value={form.isPremium ? 'true' : 'false'}
                onChange={(e) => setForm({ ...form, isPremium: e.target.value === 'true' })}
              >
                <option value="false">Free (Standard Users)</option>
                <option value="true">Premium (Pro Subscription Only)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1">
              <Code className="w-3.5 h-3.5 text-emerald-400" /> HTML Structure
            </label>
            <textarea rows={4} className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-emerald-300 font-mono text-[11px]"
              value={form.htmlStructure} onChange={(e) => setForm({ ...form, htmlStructure: e.target.value })} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">CSS Styles</label>
            <textarea rows={3} className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-indigo-300 font-mono text-[11px]"
              value={form.cssStyles} onChange={(e) => setForm({ ...form, cssStyles: e.target.value })} />
          </div>

          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setPreviewTemplate(form)}
              className="w-1/2 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1">
              <Eye className="w-3.5 h-3.5" /> Preview Draft
            </button>
            <button type="submit" disabled={createMutation.isPending}
              className="w-1/2 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Upload
            </button>
          </div>
        </form>
      </div>

      <TemplatePreviewModal template={previewTemplate} onClose={() => setPreviewTemplate(null)} />
    </div>
  );
}
