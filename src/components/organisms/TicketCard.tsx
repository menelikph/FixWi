import { Clock, CheckCircle, Circle } from 'lucide-react';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: 'infraestructura' | 'hardware' | 'conectividad';
  status: 'pendiente' | 'en-proceso' | 'resuelto';
  createdAt: string;
  createdBy: string;
  assignedTo?: string;
  imageUrl?: string;
}

interface TicketCardProps {
  ticket: Ticket;
  onClick: () => void;
  showAssignedTo?: boolean;
}

const categoryColors = {
  infraestructura: 'bg-blue-100 text-blue-700 border-blue-200',
  hardware: 'bg-orange-100 text-orange-700 border-orange-200',
  conectividad: 'bg-purple-100 text-purple-700 border-purple-200',
};

const statusConfig = {
  pendiente: {
    icon: Circle,
    color: 'text-gray-500',
    bg: 'bg-gray-100',
    label: 'Pendiente',
  },
  'en-proceso': {
    icon: Clock,
    color: 'text-[#FF6A4A]',
    bg: 'bg-orange-100',
    label: 'En Proceso',
  },
  resuelto: {
    icon: CheckCircle,
    color: 'text-[#3CC9A0]',
    bg: 'bg-green-100',
    label: 'Resuelto',
  },
};

export function TicketCard({ ticket, onClick, showAssignedTo = false }: TicketCardProps) {
  const status = statusConfig[ticket.status];
  const StatusIcon = status.icon;

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-[#5C3DFF] transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#5C3DFF] transition-colors">
            {ticket.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">{ticket.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[ticket.category]}`}>
          {ticket.category}
        </span>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${status.bg}`}>
          <StatusIcon className={`w-3.5 h-3.5 ${status.color}`} />
          <span className={`text-xs font-medium ${status.color}`}>{status.label}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>{new Date(ticket.createdAt).toLocaleDateString('es-ES')}</span>
        </div>
        {showAssignedTo && ticket.assignedTo && (
          <span className="text-[#5C3DFF] font-medium">Asignado a: {ticket.assignedTo}</span>
        )}
      </div>

      {ticket.imageUrl && (
        <div className="mt-3 rounded-lg overflow-hidden">
          <img 
            src={ticket.imageUrl} 
            alt="Ticket attachment" 
            className="w-full h-32 object-cover"
          />
        </div>
      )}
    </div>
  );
}
