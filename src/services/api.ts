import { apiClient } from '@/lib/api-client';
import { ProfileData, TemplateData, CopilotResponse, UserAuth, TenantData, UserGovernanceData } from '@/types';

export const authApi = {
  signup: async (data: any): Promise<UserAuth> => {
    const res = await apiClient.post('/auth/signup', data);
    return res.data;
  },
  login: async (data: any): Promise<UserAuth> => {
    const res = await apiClient.post('/auth/login', data);
    return res.data;
  },
};

export const profileApi = {
  getProfile: async (userId: string): Promise<ProfileData> => {
    const res = await apiClient.get(`/profile/${userId}`);
    return res.data;
  },
  updateProfile: async (userId: string, data: ProfileData): Promise<ProfileData> => {
    const res = await apiClient.put(`/profile/${userId}`, data);
    return res.data;
  },
};

export const pdfApi = {
  generatePdf: async (htmlContent: string): Promise<Blob> => {
    const res = await apiClient.post('/pdf/generate', htmlContent, {
      headers: { 'Content-Type': 'text/plain' },
      responseType: 'blob',
    });
    return res.data;
  },
};

export const copilotApi = {
  chat: async (userId: string, prompt: string): Promise<CopilotResponse> => {
    const res = await apiClient.post('/copilot/chat', { userId, prompt });
    return res.data;
  },
};

// Swagger /api/v1/templates integration
export const templateApi = {
  getTemplates: async (): Promise<TemplateData[]> => {
    try {
      const res = await apiClient.get('/templates');
      return res.data;
    } catch {
      // Fallback mock templates if backend table is empty during local H2 development
      return [
        { id: 'th-1', name: 'Enterprise Modern Dark', type: 'FRONTEND_PORTFOLIO', htmlStructure: '<div class="p-8 bg-slate-900 text-white"><h1>{{fullName}}</h1><p>{{summary}}</p></div>', cssStyles: 'body { background: #0f172a; color: #f8fafc; font-family: sans-serif; }', isPremium: true },
        { id: 'th-2', name: 'Minimalist Executive Clean', type: 'RESUME_PDF', htmlStructure: '<div class="p-8"><h2>{{fullName}}</h2><hr/><p>{{summary}}</p></div>', cssStyles: 'body { font-family: serif; color: #1e293b; }', isPremium: false }
      ];
    }
  },
  createTemplate: async (data: TemplateData): Promise<TemplateData> => {
    const res = await apiClient.post('/templates', data);
    return res.data;
  },
  deleteTemplate: async (id: string): Promise<void> => {
    await apiClient.delete(`/templates/${id}`);
  }
};

export const tenantApi = {
  getTenants: async (): Promise<TenantData[]> => {
    try {
      const res = await apiClient.get('/tenants');
      return res.data;
    } catch {
      return [
        { id: 't-1', name: 'TechCorp Inc.', subdomain: 'techcorp', tier: 'Enterprise', status: 'Active', usersCount: 500 },
        { id: 't-2', name: 'Acme Software Ltd.', subdomain: 'acme', tier: 'Pro Team', status: 'Active', usersCount: 24 },
        { id: 't-3', name: 'StartupLab Global', subdomain: 'startuplab', tier: 'Freemium', status: 'Suspended', usersCount: 3 }
      ];
    }
  },
  toggleStatus: async (tenantId: string): Promise<void> => {
    await apiClient.post(`/tenants/${tenantId}/toggle`);
  }
};

export const userGovernanceApi = {
  getUsers: async (): Promise<UserGovernanceData[]> => {
    try {
      const res = await apiClient.get('/admin/users');
      return res.data;
    } catch {
      return [
        { id: 'u-1', email: 'superadmin@devpulse.ai', fullName: 'System Super Admin', role: 'ROLE_SUPER_ADMIN', subdomain: 'platform' },
        { id: 'u-2', email: 'sarah.hr@techcorp.com', fullName: 'Sarah HR Director', role: 'ROLE_ADMIN', subdomain: 'techcorp' },
        { id: 'u-3', email: 'ram.laha@devpulse.ai', fullName: 'Souvik Laha', role: 'ROLE_USER', subdomain: 'techcorp' }
      ];
    }
  },
  updateRole: async (userId: string, role: string): Promise<void> => {
    await apiClient.put(`/admin/users/${userId}/role`, { role });
  }
};

export const ingestionApi = {
  uploadLinkedinCsv: async (file: File, userId?: string, category?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    if (userId) formData.append('userId', userId);
    if (category) formData.append('category', category);

    const res = await apiClient.post('/ingest/linkedin-csv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
};
