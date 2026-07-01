export const API_PATHS = {
  auth: {
    base: "/auth",
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
  },

  campaign: {
    base: "/campaign",
    byId: (id: string) => `/campaign/${id}`,
  },

  ai: {
    generateEmail: "/ai/generate-email",
  },

  journey: {
    base: "/journey",
    byId: (id: string) => `/journey/${id}`,
  },
} as const;
