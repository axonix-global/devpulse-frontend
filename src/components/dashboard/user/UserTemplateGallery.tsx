'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { templateApi } from '@/services/api';
import { TemplateData } from '@/types';
import { TemplatePreviewModal } from '../super-admin/TemplatePreviewModal';
import { Palette, Eye, Lock, CheckCircle, Sparkles, Download, FileText, Layout } from 'lucide-react';

interface GalleryProps {
  isSubscribed: boolean;
  onUpgradePrompt: () => void;
}

export function UserTemplateGallery({ isSubscribed, onUpgradePrompt }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'RESUME_PDF' | 'FRONTEND_PORTFOLIO'>('ALL');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateData | null>(null);
  const [activeTemplateId, setActiveTemplateId] = useState<string>('');

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['userTemplates'],
    queryFn: templateApi.getTemplates,
  });

  const filteredTemplates = templates.filter(t => {
    if (selectedCategory === 'ALL') return true;
    return t.type === selectedCategory;
  });

  const handleApplyTemplate = (template: TemplateData) => {
    if (template.isPremium && !isSubscribed) {
      onUpgradePrompt();
      return;
    }
    setActiveTemplateId(template.id || template.name);
    // Handled by callback
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-teal-400" />
            Published Templates & Themes Library
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Explore templates uploaded by Super Admin. {isSubscribed ? 'All premium templates are unlocked.' : 'Subscribe to unlock premium themes.'}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedCategory === 'ALL' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({templates.length})
          </button>
          <button
            onClick={() => setSelectedCategory('RESUME_PDF')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
              selectedCategory === 'RESUME_PDF' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Resume PDF
          </button>
          <button
            onClick={() => setSelectedCategory('FRONTEND_PORTFOLIO')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
              selectedCategory === 'FRONTEND_PORTFOLIO' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layout className="w-3.5 h-3.5" /> Web Portfolio
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-xs text-slate-400">Fetching published templates...</div>
      ) : filteredTemplates.length === 0 ? (
        <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
          No published templates found for this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTemplates.map((tpl) => {
            const isSelected = activeTemplateId === (tpl.id || tpl.name);
            const isLocked = tpl.isPremium && !isSubscribed;

            return (
              <div
                key={tpl.id || tpl.name}
                className={`p-5 rounded-2xl bg-slate-950 border transition-all flex flex-col justify-between relative overflow-hidden ${
                  isSelected ? 'border-emerald-500 ring-1 ring-emerald-500/50' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {tpl.isPremium && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> PRO
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                      tpl.type === 'RESUME_PDF' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                    }`}>
                      {tpl.type === 'RESUME_PDF' ? 'Resume PDF' : 'Web Theme'}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white tracking-tight">{tpl.name}</h3>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400 h-20 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-900 pointer-events-none" />
                    {tpl.htmlStructure}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={() => setPreviewTemplate(tpl)}
                    className="flex-1 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-slate-800"
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-400" /> Preview
                  </button>

                  <button
                    onClick={() => handleApplyTemplate(tpl)}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      isLocked
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20'
                        : isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white'
                    }`}
                  >
                    {isLocked ? (
                      <>
                        <Lock className="w-3.5 h-3.5 text-amber-400" /> Unlock
                      </>
                    ) : isSelected ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" /> Active
                      </>
                    ) : (
                      <>Use Template</>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Preview Modal */}
      <TemplatePreviewModal template={previewTemplate} onClose={() => setPreviewTemplate(null)} />
    </div>
  );
}
