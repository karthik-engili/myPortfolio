import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Validate session on mount
  useEffect(() => {
    validateSession();
  }, []);

  const validateSession = async () => {
    try {
      const res = await api.get('/auth/validate');
      if (res.data.success) {
        setAdmin(res.data.data);
      }
    } catch {
      localStorage.removeItem('admin_token');
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    const res = await api.post('/auth/login', { username, password });
    if (res.data.success) {
      if (res.data.token) {
        localStorage.setItem('admin_token', res.data.token);
      }
      setAdmin(res.data.data);
    }
    return res.data;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // proceed with logout even if API fails
    }
    localStorage.removeItem('admin_token');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, validateSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
