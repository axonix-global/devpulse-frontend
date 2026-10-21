'use client';

import React, { useState } from 'react';
import { ingestionApi } from '@/services/api';
import { Upload, FileSpreadsheet, FileText, Sparkles, Database, CheckCircle2 } from 'lucide-react';

interface ImporterProps {
  userId?: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

export function LinkedinCsvImporter({ userId, onSuccess, onError }: ImporterProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('AUTO_DETECT');
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      onError('Please select or drop a valid LinkedIn CSV file before submitting.');
      return;
    }

    setIsUploading(true);
    try {
      const result = await ingestionApi.uploadLinkedinCsv(selectedFile, userId, selectedCategory);
      onSuccess(
        `Successfully uploaded "${result.filename}" (${result.ingestedEntitiesCount} rows parsed)! Your profile experience, skills, and education have been synced.`
      );
      setSelectedFile(null);
    } catch (err: any) {
      onError(err.response?.data?.message || `Failed to ingest file "${selectedFile.name}". Please verify CSV formatting.`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-indigo-400" />
            LinkedIn CSV File Ingestion
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Upload your exported LinkedIn CSV archive files (<span className="text-indigo-300 font-mono">Profile.csv, Skills.csv, Positions.csv, Education.csv</span>) to populate your developer workspace.
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Auto-Parser
        </span>
      </div>

      {/* Drag and Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`p-8 rounded-xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center gap-3 ${
          dragActive
            ? 'border-indigo-500 bg-indigo-500/10'
            : selectedFile
            ? 'border-emerald-500/50 bg-emerald-500/5'
            : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
        }`}
      >
        <div className={`p-3 rounded-2xl ${selectedFile ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-900 text-indigo-400'}`}>
          {selectedFile ? <FileText className="w-8 h-8" /> : <Upload className="w-8 h-8" />}
        </div>

        {selectedFile ? (
          <div className="space-y-1">
            <p className="text-sm font-semibold text-white">{selectedFile.name}</p>
            <p className="text-[11px] text-slate-400 font-mono">{(selectedFile.size / 1024).toFixed(1)} KB • CSV Document</p>
          </div>
        ) : (
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-300">
              Drag & drop your LinkedIn CSV file here, or{' '}
              <label className="text-emerald-400 hover:underline cursor-pointer">
                browse files
                <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
              </label>
            </p>
            <p className="text-[10px] text-slate-500">Supports official LinkedIn profile, position, and skill export CSVs</p>
          </div>
        )}
      </div>

      {/* Category selector & Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <Database className="w-3.5 h-3.5 text-emerald-400" />
          <span>Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
          >
            <option value="AUTO_DETECT">Auto Detect</option>
            <option value="PROFILE">Profile Summary (Profile.csv)</option>
            <option value="POSITIONS">Work Positions (Positions.csv)</option>
            <option value="EDUCATION">Education (Education.csv)</option>
            <option value="SKILLS">Skills Matrix (Skills.csv)</option>
          </select>
        </div>

        <button
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950/50 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
        >
          {isUploading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Ingesting File...
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5" /> Start CSV Upload
            </>
          )}
        </button>
      </div>
    </div>
  );
}