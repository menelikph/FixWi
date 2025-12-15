"use client";
import { TicketCard } from "@/components/organisms/TicketCard";
import { ticketService } from "@/service/ticket-service";
import { Ticket, TicketCategory, TicketStatus } from "@/types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface TicketListProps {
  page: "all" | "my-tickets" | "none";
  pageSize?: number;
}

export function TicketList({ page, pageSize = 100 }: TicketListProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await ticketService.getTickets(pageSize);
      // Transformar TicketResponse a Ticket
      const transformedTickets: Ticket[] = data.content.map((ticket) => ({
        id: ticket.id.toString(),
        title: ticket.title,
        description: ticket.description,
        category: mapCategoryName(ticket.categoryName),
        status: mapStatus(ticket.status),
        createdBy: `Usuario ${ticket.userId}`,
        creatorId: ticket.userId.toString(),
        createdAt: ticket.createDate,
        updatedAt: ticket.createDate,
      }));

      setTickets(transformedTickets);
    } catch (err) {
      console.error("Error al cargar tickets:", err);
      setError("Error al cargar los tickets. Por favor intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  // Mapear el nombre de categoría del backend a nuestro tipo
  const mapCategoryName = (categoryName: string): TicketCategory => {
    const normalized = categoryName.toLowerCase();
    if (normalized.includes("hardware")) return "hardware";
    if (normalized.includes("software")) return "software";
    if (
      normalized.includes("infraestructura") ||
      normalized.includes("infrastructure")
    )
      return "infraestructura";
    return "software"; // Por defecto
  };

  // Mapear el status del backend a nuestro tipo
  const mapStatus = (status: string): TicketStatus => {
    switch (status) {
      case "OPEN":
        return "pendiente";
      case "IN_PROGRESS":
        return "en-proceso";
      case "CLOSE":
        return "resuelto";
      default:
        return "pendiente";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#5C3DFF] animate-spin" />
          <p className="text-gray-600">Cargando tickets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-700 text-center">{error}</p>
          <button
            onClick={loadTickets}
            className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-2">
            No hay tickets disponibles
          </p>
          <p className="text-gray-400">
            Los tickets aparecerán aquí cuando se creen
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        {page === "all" ? (
          <h2 className="text-2xl font-bold text-gray-900">
            Todos Tickets ({tickets.length})
          </h2>
        ) : page === "my-tickets" ? (
          <h2 className="text-2xl font-bold text-gray-900">
            Mis Tickets ({tickets.length})
          </h2>
        ) : null}
        <button
          onClick={loadTickets}
          className="text-[#5C3DFF] hover:text-[#4a2ecc] font-medium text-sm flex items-center gap-2"
        >
          <Loader2 className="w-4 h-4" />
          Actualizar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onClick={() => console.log("Ticket clicked:", ticket.id)}
          />
        ))}
      </div>
    </div>
  );
}
