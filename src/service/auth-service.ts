import api from "@/lib/api/axiosInterceptor";
import { LoginResponse, User } from "@/types/user";
import { jwtDecode } from "jwt-decode";

// Authentication service for handling login

export const authService = { // User login function
  login: async (email: string, password: string): Promise<User> => {
    try {
      const response = await api.post<LoginResponse>("/auth/login", {
        // Send login request to API
        email,
        password,
      });

      const { token } = response.data;
      if (!token) {
        throw new Error("No token received from server");
      }
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode<User>(token);

      return decodedToken;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  },
};
