// TypeScript type definitions

export interface SiteImage {
  _id: string;
  slot: string;
  url: string;
  publicId: string;
  uploadedAt: Date;
}

export interface Enquiry {
  _id: string;
  category: 'party' | 'assembly' | 'education';
  name: string;
  mobile: string;
  email?: string;
  request: string;
  status: 'pending' | 'in-progress' | 'resolved';
  createdAt: Date;
}

export interface MessageTemplate {
  _id: string;
  category: 'party' | 'assembly' | 'education';
  message: string;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
  message?: string;
}
