'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi, copilotApi } from '@/services/api';
import { Building2, Users, Palette, Activity, FileSpreadsheet, UserCheck, Sparkles } from 'lucide-react';

// Modular Super Admin Components
import { SuperAdminHeader } from '@/components/dashboard/super-admin/SuperAdminHeader';
import { TenantManagement } from '@/components/dashboard/super-admin/TenantManagement';
import { UserRoleGovernance } from '@/components/dashboard/super-admin/UserRoleGovernance';
import { TemplateManager } from '@/components/dashboard/super-admin/TemplateManager';
import { SystemHealth } from '@/components/dashboard/super-admin/SystemHealth';

// Modular User Components
import { UserHeader } from '@/components/dashboard/user/UserHeader';
import { UserTemplateGallery } from '@/components/dashboard/user/UserTemplateGallery';
import { LinkedinCsvImporter } from '@/components/dashboard/user/LinkedinCsvImporter';

// Reusable Custom Modal Component
import { NotificationModal, ModalConfig } from '@/components/ui/NotificationModal';

// ==========================================
// SUPER ADMIN DASHBOARD CONTAINER (MODULAR)
// ==========================================
function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState<'tenants' | 'users' | 'themes' | 'system'>('tenants');

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
        <button onClick={() => setActiveTab('tenants')} className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${activeTab === 'tenants' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}>
          <Building2 className="w-4 h-4 text-emerald-400" /> Tenant Management
        </button>
        <button onClick={() => setActiveTab('users')} className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${activeTab === 'users' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}>
          <Users className="w-4 h-4 text-indigo-400" /> Global Users & RBAC
        </button>
        <button onClick={() => setActiveTab('themes')} className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${activeTab === 'themes' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}>
          <Palette className="w-4 h-4 text-teal-400" /> HTML Template & Theme Library
        </button>
        <button onClick={() => setActiveTab('system')} className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${activeTab === 'system' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}>
          <Activity className="w-4 h-4 text-emerald-400" /> System Health & Migrations
        </button>
      </div>

      {activeTab === 'tenants' && <TenantManagement />}
      {activeTab === 'users' && <UserRoleGovernance />}
      {activeTab === 'themes' && <TemplateManager />}
      {activeTab === 'system' && <SystemHealth />}
    </div>
  );
}

// ==========================================
// TEAM ADMIN DASHBOARD COMPONENT
// ==========================================
function TeamAdminDashboard({ onNotify }: { onNotify: (title: string, msg: string, type?: 'success' | 'info') => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Organization Seats Used</h3>
          <p className="text-3xl font-bold text-white mt-2">24 / 50</p>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tenant Subdomain</h3>
          <p className="text-3xl font-bold text-indigo-400 mt-2 font-mono text-xl">techcorp.devpulse.ai</p>
        </div>
      </div>
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <h2 className="text-lg font-bold text-white mb-2">Team Member Management</h2>
        <p className="text-xs text-slate-400 mb-4">Invite engineers, review team portfolios, and audit resume exports.</p>
        <button
          onClick={() => onNotify('Invitation Sent', 'An invitation email has been dispatched to the new team member.', 'success')}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 shadow-lg shadow-indigo-950/50"
        >
          + Invite Team Member
        </button>
      </div>
    </div>
  );
}

// ==========================================
// STANDARD USER DASHBOARD COMPONENT
// ==========================================
function StandardUserDashboard({
  userId,
  isSubscribed,
  onNotify,
  onPromptUpgrade
}: {
  userId: string;
  isSubscribed: boolean;
  onNotify: (title: string, msg: string, type?: 'success' | 'error' | 'info') => void;
  onPromptUpgrade: () => void;
}) {
  const queryClient = useQueryClient();
  const [copilotPrompt, setCopilotPrompt] = useState('');
  const [copilotReply, setCopilotReply] = useState('');
  const [copilotLoading, setCopilotLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'templates' | 'ingest'>('profile');

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => profileApi.getProfile(userId),
    enabled: !!userId,
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => profileApi.updateProfile(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
      onNotify('Profile Saved', 'Your developer profile and summary have been successfully saved.', 'success');
    },
    onError: (err: any) => {
      onNotify('Update Failed', err.response?.data?.message || 'Failed to save profile changes.', 'error');
    }
  });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile) updateMutation.mutate(profile);
  };

  if (isLoading) return <div className="p-8 text-center text-slate-400">Loading Workspace...</div>;

  return (
    <div className="space-y-6">
      {/* Sub-Navigation Tabs for User Role */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${
            activeTab === 'profile' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <UserCheck className="w-4 h-4 text-emerald-400" />
          Profile & AI Copilot
        </button>

        <button
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${
            activeTab === 'templates' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <Palette className="w-4 h-4 text-teal-400" />
          Template & Theme Library
        </button>

        <button
          onClick={() => setActiveTab('ingest')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${
            activeTab === 'ingest' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/50' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4 text-indigo-400" />
          LinkedIn CSV Import
        </button>
      </div>

      {/* Tab 1: Profile & Local AI Copilot */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <h2 className="text-lg font-bold text-white mb-4">Profile & Resume Overview</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Professional Headline</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                  value={profile?.headline || ''}
                  onChange={(e) => queryClient.setQueryData(['profile', userId], { ...profile, headline: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Summary</label>
                <textarea
                  rows={6}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs leading-relaxed focus:outline-none focus:border-emerald-500"
                  value={profile?.summary || ''}
                  onChange={(e) => queryClient.setQueryData(['profile', userId], { ...profile, summary: e.target.value })}
                />
              </div>
              <button
                type="submit"
                disabled={updateMutation.isPending}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold text-xs text-white shadow-lg shadow-emerald-950/50 transition-all disabled:opacity-50"
              >
                {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <h2 className="text-md font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Local Ollama AI Copilot
              </h2>
              <textarea
                placeholder="e.g. Optimize my summary for resume for Senior Java Developer..."
                rows={4}
                className="w-full p-3 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white mb-3 focus:outline-none focus:border-indigo-500"
                value={copilotPrompt}
                onChange={(e) => setCopilotPrompt(e.target.value)}
              />
              <button
                onClick={async () => {
                  if (!copilotPrompt) {
                    onNotify('Prompt Empty', 'Please enter a copilot prompt before generating suggestions.', 'info');
                    return;
                  }
                  setCopilotLoading(true);
                  try {
                    const res = await copilotApi.chat(userId, copilotPrompt);
                    setCopilotReply(res.aiResponse);
                  } catch {
                    onNotify('Copilot Error', 'Failed to connect to local Ollama AI model. Ensure Ollama service is active.', 'error');
                  } finally {
                    setCopilotLoading(false);
                  }
                }}
                disabled={copilotLoading}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950/50 transition-all disabled:opacity-50"
              >
                {copilotLoading ? 'Thinking...' : 'Generate Suggestions'}
              </button>
              {copilotReply && (
                <div className="mt-4 p-3 rounded-xl bg-slate-950 text-xs text-emerald-400 border border-slate-800 leading-relaxed font-mono">
                  {copilotReply}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Published Templates & Themes Gallery */}
      {activeTab === 'templates' && (
        <UserTemplateGallery
          isSubscribed={isSubscribed}
          onUpgradePrompt={onPromptUpgrade}
        />
      )}

      {/* Tab 3: LinkedIn CSV Data Ingestion */}
      {activeTab === 'ingest' && (
        <LinkedinCsvImporter
          onSuccess={(msg) => onNotify('Import Successful', msg, 'success')}
          onError={(msg) => onNotify('Import Complete', msg, 'info')}
        />
      )}
    </div>
  );
}

// ==========================================
// MAIN DASHBOARD PAGE (ROOT)
// ==========================================
export default function DashboardPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>('');
  const [role, setRole] = useState<string>('ROLE_USER');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Global Notification Modal Config
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    isOpen: false,
    type: 'info',
    title: '',
    message: ''
  });

  const showNotification = (title: string, message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setModalConfig({
      isOpen: true,
      type,
      title,
      message
    });
  };

  const showConfirmation = (title: string, message: string, onConfirm: () => void) => {
    setModalConfig({
      isOpen: true,
      type: 'confirm',
      title,
      message,
      confirmText: 'Upgrade Now',
      cancelText: 'Cancel',
      onConfirm
    });
  };

  useEffect(() => {
    const id = localStorage.getItem('devpulse_user_id');
    const storedRole = localStorage.getItem('devpulse_role');

    if (!id) {
      router.push('/login');
    } else {
      setUserId(id);
      const cleanRole = storedRole ? storedRole.trim().toUpperCase() : 'ROLE_USER';
      setRole(cleanRole);
      setIsLoaded(true);
    }
  }, [router]);

  if (!isLoaded) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-xs">Loading Workspace...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6 lg:p-10 text-slate-100 flex flex-col">
      {role === 'ROLE_SUPER_ADMIN' ? (
        <SuperAdminHeader role={role} onLogout={() => { localStorage.clear(); router.push('/login'); }} />
      ) : (
        <UserHeader
          role={role}
          isSubscribed={isSubscribed}
          onUpgrade={() => {
            showConfirmation(
              'Upgrade to DevPulse Pro',
              'Unlock all premium resume & portfolio templates with DevPulse Pro ($12/mo). Proceed with subscription?',
              () => {
                setIsSubscribed(true);
                showNotification('Pro Subscription Unlocked', 'Your workspace has been upgraded to Pro. All premium templates are now available!', 'success');
              }
            );
          }}
          onLogout={() => { localStorage.clear(); router.push('/login'); }}
        />
      )}

      {role === 'ROLE_SUPER_ADMIN' ? (
        <SuperAdminDashboard />
      ) : role === 'ROLE_ADMIN' ? (
        <TeamAdminDashboard onNotify={showNotification} />
      ) : (
        <StandardUserDashboard
          userId={userId}
          isSubscribed={isSubscribed}
          onNotify={showNotification}
          onPromptUpgrade={() => {
            showConfirmation(
              'Premium Template Locked',
              'This template requires an active DevPulse Pro subscription ($12/mo). Would you like to upgrade now?',
              () => {
                setIsSubscribed(true);
                showNotification('Pro Subscription Unlocked', 'Congratulations! You have upgraded to DevPulse Pro.', 'success');
              }
            );
          }}
        />
      )}

      {/* Global Notification & Custom Modal replacing default JS alerts */}
      <NotificationModal config={modalConfig} onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))} />
    </div>
  );
}
