// API Configuration

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5050',
  ENDPOINTS: {
    IMAGES: '/api/public/images',
    ENQUIRIES: '/api/public/enquiries',
    TEMPLATES: '/api/admin/templates',
  },
  TIMEOUT: 10000, // 10 seconds
};

export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
