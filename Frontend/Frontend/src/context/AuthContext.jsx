import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, getCurrentUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check localStorage on app start
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    console.log('App init - Token:', token ? 'Present' : 'Not present');
    console.log('App init - Stored user:', storedUser);
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing stored user:', e);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const response = await apiLogin(email, password);
      console.log('Login response in AuthContext:', response);
      
      // Check different possible response structures
      const token = response.token || response.accessToken;
      const userId = response.userId || response.id;
      const userName = response.name || response.user?.name;
      const userEmail = response.email || response.user?.email;
      const userRole = response.role || response.user?.role;
      
      if (token && userId) {
        // Store token
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId.toString());
        
        // Create user object
        const userData = {
          id: userId,
          name: userName || 'User',
          email: userEmail || email,
          role: userRole || 'USER'
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        
        console.log('User logged in successfully:', userData);
        return { success: true };
      } else {
        console.error('Invalid response structure:', response);
        return { success: false, error: 'Invalid server response' };
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data || err.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register: apiRegister,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;