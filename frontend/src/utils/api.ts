// API utility functions for communicating with the backend

const API_BASE_URL = "http://localhost:5000/api";

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

// Generic fetch wrapper with error handling
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.message || "An error occurred",
      };
    }

    return { data };
  } catch (error) {
    return {
      error: "Unable to connect to server",
    };
  }
}

// Bus API functions
export const busApi = {
  getAll: () => apiFetch("/buses"),
  getById: (id: string) => apiFetch(`/buses/${id}`),
  search: (query: string) => apiFetch(`/buses/search?q=${encodeURIComponent(query)}`),
};

// Route API functions
export const routeApi = {
  getAll: () => apiFetch("/routes"),
  getById: (id: string) => apiFetch(`/routes/${id}`),
  search: (query: string) => apiFetch(`/routes/search?q=${encodeURIComponent(query)}`),
};

// Trip API functions
export const tripApi = {
  getAll: () => apiFetch("/trips"),
  getById: (id: string) => apiFetch(`/trips/${id}`),
  search: (params: { from?: string; to?: string; date?: string }) => {
    const queryParams = new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined) as [string, string][]
    );
    return apiFetch(`/trips/search?${queryParams}`);
  },
};

// Auth API functions
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),
  register: (userData: { name: string; email: string; password: string }) =>
    apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),
  logout: () =>
    apiFetch("/auth/logout", {
      method: "POST",
    }),
  getCurrentUser: () => apiFetch("/auth/me"),
};

// Places API functions
export const placesApi = {
  autocomplete: (query: string) => apiFetch(`/places/autocomplete?q=${encodeURIComponent(query)}`),
  details: (placeId: string) => apiFetch(`/places/details?placeId=${encodeURIComponent(placeId)}`),
  searchNearby: (type: string, location?: string, radius?: number) => {
    const params = new URLSearchParams({ type });
    if (location) params.append('location', location);
    if (radius) params.append('radius', radius.toString());
    return apiFetch(`/places/nearby?${params}`);
  },
  search: (query: string, location?: string) => {
    const params = new URLSearchParams({ query });
    if (location) params.append('location', location);
    return apiFetch(`/places/search?${params}`);
  },
};

export default {
  buses: busApi,
  routes: routeApi,
  trips: tripApi,
  auth: authApi,
  places: placesApi,
};
