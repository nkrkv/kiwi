
const apiBaseUrl = "http://localhost:8100"

export default {
  api: {
    doors: ({ skip, limit }) =>
      `${apiBaseUrl}/doors/?skip=${skip}&limit=${limit}`,

    door: doorId => `${apiBaseUrl}/doors/${doorId}/`,
  },

  doorDetails: (doorId) => `/doors/${doorId}`,
}
