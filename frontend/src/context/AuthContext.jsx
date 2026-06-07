import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) return null;
    const parsed = JSON.parse(savedUser);
    return {
      ...parsed,
      role: parsed.role ? String(parsed.role).toUpperCase() : parsed.role,
    };
  });
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const parseJwt = (jwt) => {
    try {
      const base64Url = jwt.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  };

  const isTokenValid = (jwt) => {
    const payload = parseJwt(jwt);
    return payload?.exp && payload.exp * 1000 > Date.now();
  };

  useEffect(() => {
    if (token && !isTokenValid(token)) {
      setToken(null);
      setUser(null);
      return;
    }

    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [token, user]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const normalizedRole = res.data.role ? String(res.data.role).toUpperCase() : null;
    setToken(res.data.jwt);
    setUser({
      id: res.data.userId,
      name: res.data.name,
      email: res.data.email,
      role: normalizedRole,
    });
    return { ...res.data, role: normalizedRole };
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
