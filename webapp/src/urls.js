const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8100";
console.info("Using API base: ", apiBaseUrl);

export default {
  api: {
    doors: ({ skip, limit }) =>
      `${apiBaseUrl}/doors/?skip=${skip}&limit=${limit}`,

    door: (doorId) => `${apiBaseUrl}/doors/${doorId}/`,

    doorPermissions: (doorId) => `${apiBaseUrl}/doors/${doorId}/permissions/`,

    users: ({ q }) => `${apiBaseUrl}/users/?q=${q}`,
  },

  doorDetails: (doorId) => `/doors/${doorId}`,
};
