'use client';

import React from 'react';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export interface ModalConfig {
  isOpen: boolean;
  type: 'success' | 'error' | 'info' | 'confirm';
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function NotificationModal({ config, onClose }: { config: ModalConfig; onClose: () => void }) {
  if (!config.isOpen) return null;

  const getIcon = () => {
    switch (config.type) {
      case 'success':
        return <CheckCircle2 className="w-10 h-10 text-emerald-400" />;
      case 'error':
        return <XCircle className="w-10 h-10 text-rose-500" />;
      case 'confirm':
        return <AlertTriangle className="w-10 h-10 text-amber-400" />;
      default:
        return <Info className="w-10 h-10 text-indigo-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 relative text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex justify-center pt-2">
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 inline-flex shadow-inner">
            {getIcon()}
          </div>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-white">{config.title}</h3>
          <p className="text-xs text-slate-300 leading-relaxed">{config.message}</p>
        </div>

        <div className="pt-3 flex items-center justify-center gap-3">
          {config.type === 'confirm' ? (
            <>
              <button
                onClick={() => {
                  if (config.onCancel) config.onCancel();
                  onClose();
                }}
                className="w-1/2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
              >
                {config.cancelText || 'Cancel'}
              </button>
              <button
                onClick={() => {
                  if (config.onConfirm) config.onConfirm();
                  onClose();
                }}
                className="w-1/2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-950/50 transition-all"
              >
                {config.confirmText || 'Confirm'}
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-950/50 transition-all"
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
