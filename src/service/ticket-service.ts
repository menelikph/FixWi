/**
 * Ticket Service
 * Handles all ticket-related API operations including CRUD and AI suggestions
 */
import api from "@/lib/api/axiosInterceptor";
import { TicketFormData, TicketListResponse, TicketResponse , TicketMetrics} from "@/types/ticket";

// Ticket service with all API methods
export const ticketService = {
  // Create a new ticket
  createTicket: async (form: TicketFormData): Promise<TicketResponse> => {
    try {
      const response = await api.post<TicketResponse>("/tickets", form);
      return response.data;
    } catch (error) {
      console.error("Error al crear ticket:", error);
      throw error;
    }
  },
  
  // Get paginated list of tickets
  getTickets: async (sizepage?: number): Promise<TicketListResponse> => {
    try {
      const response = await api.get<TicketListResponse>(`/tickets?size=${sizepage}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener tickets:", error);
      throw error;
    }
  },

  // Get ticket by ID
  getById : async (id: string): Promise<TicketResponse> => {    
    try {
      const response = await api.get<TicketResponse>(`/tickets/${id}`);
      return response.data;
    } catch (error) { 
      console.error("Error al obtener ticket por ID:", error);
      throw error;
    }
  },

  // Update ticket status
  updateStatus: async (id: string, status: "OPEN" | "IN_PROGRESS" | "CLOSE"): Promise<TicketResponse> => {
    try {
      const response = await api.patch<TicketResponse>(`/tickets/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      throw error;
    }
  },

  // Get general ticket metrics (pending, in progress, closed)
  getGeneralMetrics: async (): Promise<TicketMetrics> => {
    try {
      const response = await api.get<TicketMetrics>("/metrics");
      return response.data;
    } catch (error) {
      console.error("Error al obtener métricas:", error);
      throw error;
    }
  },

  // Get AI suggestion based on description and category
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
      debugger; // Debug point for AI response
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


