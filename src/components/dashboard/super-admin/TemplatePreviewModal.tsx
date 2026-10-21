'use client';

import React from 'react';
import { X, Eye } from 'lucide-react';
import { TemplateData } from '@/types';

interface PreviewProps {
  template: TemplateData | null;
  onClose: () => void;
}

export function TemplatePreviewModal({ template, onClose }: PreviewProps) {
  if (!template) return null;

  const combinedSrcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${template.cssStyles}</style>
      </head>
      <body>
        ${template.htmlStructure}
      </body>
    </html>
  `;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Eye className="w-4 h-4 text-emerald-400" />
            Live Preview: {template.name} ({template.type})
          </div>
          <button onClick={onClose} className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 bg-white">
          <iframe
            title="Template Preview"
            srcDoc={combinedSrcDoc}
            className="w-full h-full border-none"
          />
        </div>
      </div>
    </div>
  );
}
