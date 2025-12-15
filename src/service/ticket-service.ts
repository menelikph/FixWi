import api from "@/lib/api/axiosInterceptor";
import { TicketFormData, TicketListResponse, TicketResponse , TicketMetrics} from "@/types/ticket";

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

  updateStatus: async (id: string, status: "OPEN" | "IN_PROGRESS" | "CLOSE"): Promise<TicketResponse> => {
    try {
      const response = await api.patch<TicketResponse>(`/tickets/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      throw error;
    }
  },

  getGeneralMetrics: async (): Promise<TicketMetrics> => {
    try {
      const response = await api.get<TicketMetrics>("/metrics");
      return response.data;
    } catch (error) {
      console.error("Error al obtener métricas:", error);
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


