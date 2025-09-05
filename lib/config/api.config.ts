export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      REFRESH: '/auth/refresh',
      LOGOUT: '/auth/logout',
      ME: '/auth/me',
      ERROR: '/auth/error',
    },

    TASK_LIST: {
      GET: '/task-list',
      CREATE: '/task-list',
      GET_BY_ID: (id: string) => `/task-list/${id}`,
      UPDATE: (id: string) => `/task-list/${id}`,
      DELETE: (id: string) => `/task-list/${id}`,
      TOGGLE_ACTIVE: (id: string, isActive: boolean) =>
        `/task-list/${id}?isActive=${isActive}`,
    },
  },
};
