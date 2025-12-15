"use client"

import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  Clock,
  User,
  Tag,
  Calendar,
  Image as ImageIcon,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { Ticket, TicketStatus } from "@/types";
import { TicketResponse } from "@/types/ticket";
import { ticketService } from "@/service/ticket-service";



interface TicketDetailProps {
  id: string;
  onBack: () => void;
  isAdmin: boolean;
  onUpdateStatus?: (newStatus: TicketStatus) => Promise<void>;
}

const initialTicket: TicketResponse = {
  id: 0,
  title: "Cargando...",
  description: "Cargando descripción...",
  categoryName: "software",
  status: "OPEN",
  userId: 0,
  createDate: new Date().toISOString(),
}

export default function TicketDetail({ id, onBack, isAdmin, onUpdateStatus }: TicketDetailProps) {
  // Simulación de datos de ticket para el ejemplo

  const [ticket, setTicket] = useState<TicketResponse>(initialTicket); // Inicializamos con valores por defecto
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado de carga
  const [error, setError] = useState<string | null>(null); // Nuevo estado de error
  const [selectedStatus, setSelectedStatus] = useState<TicketResponse["status"]>(initialTicket.status);
  // Usamos el status del ticket como estado inicial

  const handleStatusChange = (newStatus: TicketResponse["status"]) => {
    setSelectedStatus(newStatus);
    onUpdateStatus?.(newStatus as Ticket["status"]);
  };

  const fetchTicket = useCallback(async (ticketId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await ticketService.getById(ticketId);
      setTicket(data);
      setSelectedStatus(data.status); // Sincronizar el estado del selector con los datos
    } catch (err) {
      console.error("Fallo al cargar el ticket:", err);
      setError("No se pudo cargar la información del ticket. Intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchTicket(id);
    }
  }, [id, fetchTicket]); // Dependencia del 'id' y 'fetchTicket'

  const statusOptions: {
    value: TicketResponse["status"];
    label: string;
    color: string;
  }[] = [
      {
        value: "OPEN", // Corregido de 'pendiente'
        label: "Pendiente",
        color: "bg-gray-100 text-gray-700 border-gray-300",
      },
      {
        value: "IN_PROGRESS", // Corregido de 'en-proceso'
        label: "En Proceso",
        color: "bg-orange-100 text-orange-700 border-orange-300",
      },
      {
        value: "CLOSE", // Corregido de 'resuelto'
        label: "Resuelto",
        color: "bg-green-100 text-green-700 border-green-300",
      },
    ];

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-20 flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl">
        <Loader2 className="w-8 h-8 text-[#5C3DFF] animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Cargando detalles del ticket...</p>
      </div>
    );
  }

  // Pantalla de Error
  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-20 flex flex-col items-center justify-center bg-red-50 border border-red-300 rounded-2xl shadow-xl">
        <AlertTriangle className="w-8 h-8 text-red-600 mb-4" />
        <p className="text-red-700 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-[#5C3DFF] mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Volver</span>
      </button>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Title Section */}
        <div className="bg-gradient-to-r from-[#5C3DFF] to-[#7D5CFF] px-8 py-6 text-white">
          <h1 className="text-3xl font-bold mb-2">
            {ticket.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-white/80">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(ticket.createDate).toLocaleDateString(
                  "es-ES",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  },
                )}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>Usuario ID: {ticket.userId}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Status Update (Admin Only) */}
          {isAdmin && onUpdateStatus && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Actualizar Estado del Ticket
              </label>
              <div className="flex gap-3">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      handleStatusChange(option.value)
                    }
                    className={`flex-1 px-4 py-3 rounded-lg border-2 font-medium transition-all ${selectedStatus === option.value
                      ? option.color
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                <Tag className="w-4 h-4" />
                <span>Categoría</span>
              </div>
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium capitalize">
                {ticket.categoryName}
              </span>
            </div>

            {/* Status */}
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                <Clock className="w-4 h-4" />
                <span>Estado Actual</span>
              </div>
              <span
                className={`inline-block px-4 py-2 rounded-lg font-medium ${statusOptions.find(
                  (s) => s.value === selectedStatus,
                )?.color
                  }`}
              >
                {
                  statusOptions.find(
                    (s) => s.value === selectedStatus,
                  )?.label
                }
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Descripción
            </h3>
            <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
              {ticket.description}
            </p>
          </div>

          {/* History Timeline */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Historial
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-[#5C3DFF]" />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900 mb-1">
                      Ticket Creado
                    </p>
                    <p className="text-sm text-gray-600">
                      {ticket.userId} creó este ticket
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(
                        ticket.createDate,
                      ).toLocaleString("es-ES")}
                    </p>
                  </div>
                </div>
              </div>

              {selectedStatus !== "OPEN" && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#FF6A4A]" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="font-medium text-gray-900 mb-1">
                        Estado Actualizado
                      </p>
                      <p className="text-sm text-gray-600">
                        El ticket pasó a :
                        {
                          statusOptions.find(
                            (s) => s.value === selectedStatus,
                          )?.label
                        }
                        .
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date().toLocaleString("es-ES")}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};