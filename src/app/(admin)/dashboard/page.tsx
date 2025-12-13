"use client";

import { useState } from 'react';
import { AlertCircle, Clock, CheckCircle, Filter, TrendingUp } from 'lucide-react';
import { Ticket, TicketCard } from '@/components/organisms/TicketCard';


interface AdminDashboardProps {
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
}

export default function AdminDashboard({ tickets, onTicketClick }: AdminDashboardProps) {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const stats = {
    total: tickets?.length,
    pending: tickets?.filter(t => t.status === 'pendiente').length,
    inProgress: tickets?.filter(t => t.status === 'en-proceso').length,
    resolved: tickets?.filter(t => t.status === 'resuelto').length,
  };

  const filteredTickets = tickets?.filter(ticket => {
    if (filterStatus !== 'all' && ticket.status !== filterStatus) return false;
    if (filterCategory !== 'all' && ticket.category !== filterCategory) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-[#5C3DFF] to-[#7D5CFF] rounded-xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-3xl font-bold">{stats.total}</span>
          </div>
          <h3 className="font-medium text-white/90">Total Tickets</h3>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-gray-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">{stats.pending}</span>
          </div>
          <h3 className="font-medium text-gray-600">Pendientes</h3>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#FF6A4A]" />
            </div>
            <span className="text-3xl font-bold text-gray-900">{stats.inProgress}</span>
          </div>
          <h3 className="font-medium text-gray-600">En Proceso</h3>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-[#3CC9A0]" />
            </div>
            <span className="text-3xl font-bold text-gray-900">{stats.resolved}</span>
          </div>
          <h3 className="font-medium text-gray-600">Resueltos</h3>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filtros</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C3DFF] focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="en-proceso">En Proceso</option>
              <option value="resuelto">Resuelto</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C3DFF] focus:border-transparent"
            >
              <option value="all">Todas las categorías</option>
              <option value="infraestructura">Infraestructura</option>
              <option value="hardware">Hardware</option>
              <option value="conectividad">Conectividad</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Todos los Tickets
            <span className="ml-3 text-lg font-normal text-gray-500">
              ({filteredTickets?.length})
            </span>
          </h2>
        </div>

        {filteredTickets?.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron tickets
            </h3>
            <p className="text-gray-600">
              No hay tickets que coincidan con los filtros seleccionados
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTickets?.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onClick={() => onTicketClick(ticket)}
                showAssignedTo
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-white rounded-lg hover:shadow-md transition-all text-left">
            <div className="font-medium text-gray-900 mb-1">Exportar Reportes</div>
            <div className="text-sm text-gray-600">Descargar datos en CSV</div>
          </button>
          <button className="p-4 bg-white rounded-lg hover:shadow-md transition-all text-left">
            <div className="font-medium text-gray-900 mb-1">Asignación Masiva</div>
            <div className="text-sm text-gray-600">Asignar múltiples tickets</div>
          </button>
          <button className="p-4 bg-white rounded-lg hover:shadow-md transition-all text-left">
            <div className="font-medium text-gray-900 mb-1">Ver Analíticas</div>
            <div className="text-sm text-gray-600">Estadísticas detalladas</div>
          </button>
        </div>
      </div>
    </div>
  );
}