import { useState } from "react";
import {
  ArrowLeft,
  Clock,
  User,
  Tag,
  Calendar,
  Image as ImageIcon,
} from "lucide-react";
import { Ticket } from "@/types";



interface TicketDetailProps {
    id: string;
}

export default function TicketDetail({

}: TicketDetailProps) {
  const [selectedStatus, setSelectedStatus] = useState();

  const handleStatusChange = (newStatus: Ticket["status"]) => {
    setSelectedStatus(newStatus);
    onUpdateStatus?.(newStatus);
  };

  const statusOptions: {
    value: Ticket["status"];
    label: string;
    color: string;
  }[] = [
    {
      value: "pendiente",
      label: "Pendiente",
      color: "bg-gray-100 text-gray-700 border-gray-300",
    },
    {
      value: "en-proceso",
      label: "En Proceso",
      color: "bg-orange-100 text-orange-700 border-orange-300",
    },
    {
      value: "resuelto",
      label: "Resuelto",
      color: "bg-green-100 text-green-700 border-green-300",
    },
  ];

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
                {new Date(ticket.createdAt).toLocaleDateString(
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
              <span>{ticket.createdBy}</span>
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
                    className={`flex-1 px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                      selectedStatus === option.value
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
                {ticket.category}
              </span>
            </div>

            {/* Status */}
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                <Clock className="w-4 h-4" />
                <span>Estado Actual</span>
              </div>
              <span
                className={`inline-block px-4 py-2 rounded-lg font-medium ${
                  statusOptions.find(
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

          {/* Image */}
          {ticket.imageUrl && (
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-3">
                <ImageIcon className="w-4 h-4" />
                <span>Imagen Adjunta</span>
              </div>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={ticket.imageUrl}
                  alt="Ticket attachment"
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}

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
                      {ticket.createdBy} creó este ticket
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(
                        ticket.createdAt,
                      ).toLocaleString("es-ES")}
                    </p>
                  </div>
                </div>
              </div>

              {selectedStatus !== "pendiente" && (
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
  );
}