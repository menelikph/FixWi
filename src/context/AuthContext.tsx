import React, { createContext, useState, useContext, ReactNode } from 'react';
import { UserRole } from '@/types'; // Importamos el tipo de rol

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  userName: string;
  login: (token: string, role: UserRole, name: string) => void;
  logout: () => void;
}

const initialAuthContext: AuthContextType = {
  isAuthenticated: false,
  userRole: 'guest',
  userName: 'Invitado',
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [userName, setUserName] = useState('Invitado');

  const login = (token: string, role: UserRole, name: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserName(name);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole('guest');
    setUserName('Invitado');
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    userRole,
    userName,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};