"use client";
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { UserRole } from '@/types';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  userName: string;
  login: (token: string, role: UserRole, name: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar sesión al cargar
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role') as UserRole;
    const storedName = localStorage.getItem('name');

    if (token && storedRole) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
      setUserName(storedName || '');
    }
    setIsLoading(false);
  }, []);

  const login = (token: string, role: UserRole, name: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('name', name);
    setIsAuthenticated(true);
    setUserRole(role);
    setUserName(name);
    
    // Redirección según el rol
    if (role === 'admin') router.push('/admin');
    else if (role === 'coder') router.push('/coder');
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserRole('guest');
    setUserName('');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, userName, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return context;
};