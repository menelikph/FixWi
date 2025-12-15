import api from "@/lib/api/axiosInterceptor";
import { User, UserFormRquest } from "@/types/user";

export const userService = {
  createUser: async (form: UserFormRquest): Promise<User> => {
    try {
      const response = await api.post<User>("/auth/register", form);
      return response.data;
    } catch (error) {
      console.error("Error al crear ticket:", error);
      throw error;
    }
  },
  
};
