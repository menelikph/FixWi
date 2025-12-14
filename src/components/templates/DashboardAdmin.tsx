import React from 'react';
import { TicketCard } from '@/components/organisms/TicketCard';
// Si tienes un componente de Stats o Filtros, irían aquí

// Datos de prueba (Mocks) para que veas algo en pantalla
const MOCK_TICKETS = [
  {
    id: '1',
    title: 'Fallo en servidor de correos',
    description: 'No salen los correos a dominios externos',
    category: 'infraestructura' as const,
    status: 'pendiente' as const,
    createdBy: 'Juan Perez',
    creatorId: 'u1',
    createdAt: '2023-10-20T10:00:00Z',
    updatedAt: '2023-10-20T10:00:00Z',
  },
  {
    id: '2',
    title: 'Pantalla azul en equipo de HR',
    description: 'El equipo se reinicia constantemente',
    category: 'hardware' as const,
    status: 'en-proceso' as const,
    createdBy: 'Maria Garcia',
    creatorId: 'u2',
    createdAt: '2023-10-21T09:30:00Z',
    updatedAt: '2023-10-21T11:00:00Z',
  },
  {
    id: '3',
    title: 'Licencia de Office caducada',
    description: 'Solicito renovación de licencia',
    category: 'software' as const,
    status: 'resuelto' as const,
    createdBy: 'Carlos Ruiz',
    creatorId: 'u3',
    createdAt: '2023-10-19T14:20:00Z',
    updatedAt: '2023-10-20T16:00:00Z',
  },
];

export default function DashboardAdmin() {
  return (
    <div className="p-6 space-y-6">
      {/* Encabezado del Dashboard */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Panel de Administrador</h1>
          <p className="text-gray-500">Gestión general de incidencias</p>
        </div>
        <button className="bg-[#5C3DFF] text-white px-4 py-2 rounded-lg hover:bg-[#4A2FCC] transition-colors">
          + Nuevo Ticket
        </button>
      </div>

      {/* Área de Estadísticas (Placeholder) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Pendientes</h3>
          <p className="text-3xl font-bold text-orange-500">5</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">En Proceso</h3>
          <p className="text-3xl font-bold text-blue-500">3</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Resueltos</h3>
          <p className="text-3xl font-bold text-green-500">12</p>
        </div>
      </div>

      {/* Grid de Tickets */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#1A1A2E]">Tickets Recientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TICKETS.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>
    </div>
  );
}