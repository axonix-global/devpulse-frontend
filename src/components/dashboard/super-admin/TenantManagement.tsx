'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tenantApi } from '@/services/api';
import { Building2, Users, HardDrive, Power } from 'lucide-react';

export function TenantManagement() {
  const queryClient = useQueryClient();
  const { data: tenants = [], isLoading } = useQuery({
    queryKey: ['tenants'],
    queryFn: tenantApi.getTenants,
  });

  const toggleMutation = useMutation({
    mutationFn: tenantApi.toggleStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
      alert('Tenant status updated successfully!');
    },
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex justify-between items-center">
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Tenants</h3>
            <p className="text-3xl font-bold text-white mt-2">{tenants.filter(t => t.status === 'Active').length}</p>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <Building2 className="w-6 h-6 text-emerald-400" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex justify-between items-center">
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ecosystem Users</h3>
            <p className="text-3xl font-bold text-emerald-400 mt-2">527</p>
          </div>
          <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
            <Users className="w-6 h-6 text-indigo-400" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex justify-between items-center">
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cluster Storage</h3>
            <p className="text-3xl font-bold text-indigo-400 mt-2">42.8 GB</p>
          </div>
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
            <HardDrive className="w-6 h-6 text-slate-300" />
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-emerald-400" />
          Tenant Organizations Directory
        </h2>
        {isLoading ? (
          <div className="text-xs text-slate-400">Loading tenants...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 text-slate-400">
                <tr>
                  <th className="pb-3">Organization Name</th>
                  <th className="pb-3">Subdomain</th>
                  <th className="pb-3">Subscription Tier</th>
                  <th className="pb-3">Seats</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {tenants.map(t => (
                  <tr key={t.id} className="hover:bg-slate-800/30">
                    <td className="py-3 font-semibold text-white">{t.name}</td>
                    <td className="py-3 text-emerald-400 font-mono">{t.subdomain}.devpulse.ai</td>
                    <td className="py-3 text-slate-300">{t.tier}</td>
                    <td className="py-3 text-slate-300">{t.usersCount} users</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        t.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => toggleMutation.mutate(t.id)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Power className="w-3 h-3 text-slate-400" />
                        {t.status === 'Active' ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
