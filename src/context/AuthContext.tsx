"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { UserRole } from "@/types";
import { useRouter } from "next/navigation";
import { ADMIN, CODER, GUEST } from "@/constants/constants";

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  userName: string;
  userId: string;
  login: (role: UserRole, name: string, id: string) => void;
  logout: () => void;
  isLoading: boolean;
}

interface initialValues {
  isAuth: boolean;
  role: UserRole;
  name: string;
  id: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  // Función para obtener valores iniciales de localStorage
  const getInitialAuth = (): initialValues => {
    if (typeof window === "undefined") {
      return { isAuth: false, role: GUEST, name: "", id: "" };
    }
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role") as UserRole;
    const storedName = localStorage.getItem("name");
    const userID = localStorage.getItem("id");

    return {
      isAuth: !!(token && storedRole),
      role: (storedRole || GUEST) as UserRole,
      name: storedName || "",
      id: userID || "",
    };
  };

  const initialValues = getInitialAuth();

  const [isAuthenticated, setIsAuthenticated] = useState(initialValues.isAuth);
  const [userRole, setUserRole] = useState<UserRole>(initialValues.role);
  const [userName, setUserName] = useState(initialValues.name);
  const [userId, setUserId] = useState(initialValues.id);
  const [isLoading, setIsLoading] = useState(true);

  const redirectByRole = (role: UserRole) => {
    if (role === ADMIN) router.push("/admin");
    else if (role === CODER) router.push("/coder");
  };

  useEffect(() => {
    // Solo redirigir según el estado de autenticación
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, []);

  const login = (role: UserRole, name: string, id: string) => {
    localStorage.setItem("role", role);
    localStorage.setItem("name", name);
    localStorage.setItem("id", id);
    setIsAuthenticated(true);
    setUserRole(role);
    setUserName(name);
    setUserId(id);
    // Redirección según el rol
    redirectByRole(role);
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserRole(GUEST);
    setUserName("");
    setUserId("");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        userName,
        userId,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};
