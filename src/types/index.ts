export interface UserAuth {
  token: string;
  email: string;
  fullName: string;
  userId: string;
  subdomain: string;
  role: 'ROLE_SUPER_ADMIN' | 'ROLE_ADMIN' | 'ROLE_USER';
}

export interface ProfileData {
  id?: string;
  userId: string;
  headline: string;
  summary: string;
  phone?: string;
  location?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
}

export interface TemplateData {
  id?: string;
  name: string;
  type: 'RESUME_PDF' | 'FRONTEND_PORTFOLIO';
  htmlStructure: string;
  cssStyles: string;
  isPremium: boolean;
  previewImageUrl?: string;
}

export interface TenantData {
  id: string;
  name: string;
  subdomain: string;
  tier: string;
  status: 'Active' | 'Suspended';
  usersCount: number;
}

export interface UserGovernanceData {
  id: string;
  email: string;
  fullName: string;
  role: 'ROLE_SUPER_ADMIN' | 'ROLE_ADMIN' | 'ROLE_USER';
  subdomain: string;
}

export interface CopilotResponse {
  prompt: string;
  aiResponse: string;
  jsonPatch?: any;
}
