import api from "@/lib/api/axiosInterceptor";
import { TicketFormData, TicketListResponse, TicketResponse } from "@/types/ticket";

export const ticketService = {
  createTicket: async (form: TicketFormData): Promise<TicketResponse> => {
    try {
      const response = await api.post<TicketResponse>("/tickets", form);
      return response.data;
    } catch (error) {
      console.error("Error al crear ticket:", error);
      throw error;
    }
  },
  getTickets: async (sizepage?: number): Promise<TicketListResponse> => {
    try {
      const response = await api.get<TicketListResponse>(`/tickets?size=${sizepage}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener tickets:", error);
      throw error;
    }
  },

  getById : async (id: string): Promise<TicketResponse> => {    
    try {
      const response = await api.get<TicketResponse>(`/tickets/${id}`);
      return response.data;
    } catch (error) { 
      console.error("Error al obtener ticket por ID:", error);
      throw error;
    }
  },

  IAsuggestion: async (
    description: string,
    categoryId: string
  ): Promise<string> => {
    try {
      const response = await api.get<string>("/suggestions", {
        params: {
          category: categoryId,
          description: description,
        },
      });
      debugger;
      if (response.status === 204) {
        return "No hay sugerencias disponibles.";
      }

      return response.data;
    } catch (error) {
      console.error("Error al obtener sugerencia AI:", error);
      throw error;
    }
  
  },



};


