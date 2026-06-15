import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);

  // Set the base URL for backend API requests
const BACKEND_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // In a production app, you could add a route to verify the token here
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
    setLoading(false);
  }, [token]);

  // Login handler
  const login = async (email, password) => {
    const response = await axios.post(`${BACKEND_URL}/auth/login`, { email, password });
    setUser(response.data);
    setToken(response.data.token);
    localStorage.setItem('token', response.data.token);
    return response.data;
  };

  // Register handler
  const register = async (name, email, password) => {
    const response = await axios.post(`${BACKEND_URL}/auth/register`, { name, email, password });
    setUser(response.data);
    setToken(response.data.token);
    localStorage.setItem('token', response.data.token);
    return response.data;
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
