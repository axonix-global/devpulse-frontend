'use client';

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userGovernanceApi } from '@/services/api';
import { Users } from 'lucide-react';

export function UserRoleGovernance() {
  const queryClient = useQueryClient();
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: userGovernanceApi.getUsers,
  });

  const roleMutation = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: string }) => userGovernanceApi.updateRole(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      alert('User role successfully updated!');
    },
  });

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
      <h2 className="text-lg font-bold text-white flex items-center gap-2">
        <Users className="w-5 h-5 text-indigo-400" />
        Global User & Role Governance
      </h2>
      {isLoading ? (
        <div className="text-xs text-slate-400">Loading ecosystem users...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 text-slate-400">
              <tr>
                <th className="pb-3">User Full Name</th>
                <th className="pb-3">Email Address</th>
                <th className="pb-3">Tenant Subdomain</th>
                <th className="pb-3">Assigned Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-800/30">
                  <td className="py-3 font-semibold text-white">{u.fullName}</td>
                  <td className="py-3 text-slate-300">{u.email}</td>
                  <td className="py-3 text-indigo-400 font-mono">{u.subdomain}</td>
                  <td className="py-3">
                    <select
                      value={u.role}
                      onChange={(e) => roleMutation.mutate({ userId: u.id, role: e.target.value })}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="ROLE_USER">ROLE_USER</option>
                      <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                      <option value="ROLE_SUPER_ADMIN">ROLE_SUPER_ADMIN</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
