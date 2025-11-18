export interface User {
  id: string;
  name: string;
  email: string;
}

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('authToken');
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem('userData');
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
  return null;
};

export const logout = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
  // Optionally redirect to login page
  window.location.href = '/login';
};
