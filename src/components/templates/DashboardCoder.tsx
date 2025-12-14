import React from 'react';
import { TicketCard } from '@/components/organisms/TicketCard';

// Mock data ligeramente diferente
const MY_TICKETS = [
  {
    id: '101',
    title: 'Mi monitor parpadea',
    description: 'Solicito cambio de pantalla',
    category: 'hardware' as const,
    status: 'pendiente' as const,
    createdBy: 'Yo Mismo',
    creatorId: 'me',
    createdAt: '2023-10-22T08:00:00Z',
    updatedAt: '2023-10-22T08:00:00Z',
  }
];

export default function DashboardCoder() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Mis Reportes</h1>
          <p className="text-gray-500">Historial de tus solicitudes técnicas</p>
        </div>
        <button className="bg-[#5C3DFF] text-white px-4 py-2 rounded-lg hover:bg-[#4A2FCC] transition-colors">
          Reportar Incidencia
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MY_TICKETS.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
      
      {MY_TICKETS.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">No tienes tickets reportados actualmente.</p>
        </div>
      )}
    </div>
  );
}