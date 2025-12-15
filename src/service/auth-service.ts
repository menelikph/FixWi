import api from "@/lib/api/axiosInterceptor";
import { LoginResponse, User } from "@/types/user";
import { jwtDecode } from "jwt-decode";

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    try {
      const response = await api.post<LoginResponse>("/auth/login", {
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
