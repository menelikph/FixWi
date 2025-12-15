"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  User,
  Tag,
  Calendar,
  Loader2,
} from "lucide-react";

// Importamos DIRECTAMENTE los tipos del backend
import { TicketResponse } from "@/types/ticket"; 
import { ticketService } from "@/service/ticket-service";
import { useAuth } from "@/context/AuthContext";

interface TicketDetailProps {
  id: string;
}

// Configuración VISUAL según el estado del backend (Sin transformar datos)
const STATUS_CONFIG = {
  OPEN: { 
    label: "Pendiente", 
    color: "bg-gray-100 text-gray-700 border-gray-300" 
  },
  IN_PROGRESS: { 
    label: "En Proceso", 
    color: "bg-orange-100 text-orange-700 border-orange-300" 
  },
  CLOSE: { 
    label: "Resuelto", 
    color: "bg-green-100 text-green-700 border-green-300" 
  },
};

export default function TicketDetail({ id }: TicketDetailProps) {
  const router = useRouter();
  const { userRole } = useAuth();

  // Usamos el tipo directo del Backend (TicketResponse)
  const [ticket, setTicket] = useState<TicketResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (id) loadTicket();
  }, [id]);

  const loadTicket = async () => {
    try {
      setIsLoading(true);
      // Guardamos la respuesta DIRECTA, sin mappers ni transformaciones
      const data = await ticketService.getById(id);
      setTicket(data);
    } catch (error) {
      console.error("Error cargando ticket:", error);
    } finally {
      setIsLoading(false);
    }
  };

 const handleStatusChange = async (newStatus: "OPEN" | "IN_PROGRESS" | "CLOSE") => {
    if (!ticket) return;
    if (ticket.status === newStatus) return;

    try {
      setIsUpdating(true);
      
      const updatedTicket = await ticketService.updateStatus(ticket.id.toString(), newStatus);
      
      // Actualizamos la vista con el resultado de esa llamada
      setTicket(updatedTicket);
      
    } catch (error) {
      console.error("Error actualizando:", error);
    
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-[#5C3DFF]" /></div>;
  if (!ticket) return <div className="p-10 text-center">Ticket no encontrado</div>;

  // Helper para acceder a la config visual actual de forma segura
  const currentStatus = STATUS_CONFIG[ticket.status] || STATUS_CONFIG.OPEN;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Botón Volver */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-[#5C3DFF] mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Volver</span>
      </button>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Encabezado */}
        <div className="bg-gradient-to-r from-[#5C3DFF] to-[#7D5CFF] px-8 py-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{ticket.title}</h1>
          <div className="flex items-center gap-4 text-sm text-white/80">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {/* Usamos createDate directo del backend */}
                {new Date(ticket.createDate).toLocaleDateString("es-ES", {
                  day: "numeric", month: "long", year: "numeric"
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {/* Usamos userId directo */}
              <span>Usuario #{ticket.userId}</span>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Panel de Admin para cambiar estado */}
          {(userRole === "ADMIN") && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Cambiar Estado
              </label>
              <div className="flex gap-3">
                {/* Iteramos sobre las llaves de STATUS_CONFIG (OPEN, IN_PROGRESS, CLOSE) */}
                {(Object.keys(STATUS_CONFIG) as Array<keyof typeof STATUS_CONFIG>).map((statusKey) => (
                  <button
                    key={statusKey}
                    onClick={() => handleStatusChange(statusKey)}
                    disabled={isUpdating || ticket.status === statusKey}
                    className={`flex-1 px-4 py-2 rounded-lg border font-medium transition-all ${
                      ticket.status === statusKey
                        ? STATUS_CONFIG[statusKey].color // Estilo activo
                        : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50" // Estilo inactivo
                    } ${isUpdating ? "opacity-50" : ""}`}
                  >
                    {STATUS_CONFIG[statusKey].label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Grid de Detalles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Categoría */}
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                <Tag className="w-4 h-4" />
                <span>Categoría</span>
              </div>
              {/* Mostramos categoryName directo del backend */}
              <span className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">
                {ticket.categoryName}
              </span>
            </div>

            {/* Estado Actual */}
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                <Clock className="w-4 h-4" />
                <span>Estado</span>
              </div>
              <span className={`inline-block px-4 py-2 rounded-lg font-medium ${currentStatus.color}`}>
                {currentStatus.label}
              </span>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h3>
            <p className="text-gray-600 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
              {ticket.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}