/**
 * DashboardAdmin Component
 * Admin dashboard template displaying ticket metrics and recent tickets
 */
'use client';
import React, { useEffect, useState } from 'react';
import { TicketCard } from '@/components/organisms/TicketCard';
import { TicketList } from './tickectList';
import { ticketService } from '@/service/ticket-service';
import { TicketMetrics } from '@/types/ticket';
import { Loader2 } from 'lucide-react';



export default function DashboardAdmin() {
  const [metrics, setMetrics] = useState<TicketMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load metrics on component mount
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await ticketService.getGeneralMetrics();
        setMetrics(data);
      } catch (error) {
        console.error("Error cargando métricas", error);
        // Optional: Handle error visually if desired
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, []);
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Panel de Administrador</h1>
          <p className="text-gray-500">Gestión general de incidencias</p>
        </div>
      </div>

      {/* Statistics area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Pendientes</h3>
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin text-orange-500 mt-2" />
          ) : (
            <p className="text-3xl font-bold text-orange-500">
              {metrics?.openTickets ?? 0}
            </p>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">En Proceso</h3>
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin text-blue-500 mt-2" />
          ) : (
            <p className="text-3xl font-bold text-blue-500">
              {metrics?.inProgressTickets ?? 0}
            </p>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Resueltos</h3>
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin text-green-500 mt-2" />
          ) : (
            <p className="text-3xl font-bold text-green-500">
              {metrics?.closeTickets ?? 0}
            </p>
          )}
        </div>
      </div>

      {/* Recent tickets section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#1A1A2E]">Tickets Recientes</h2>
        <div className="w-full">
          {/* Reuse existing TicketList component */}
          <TicketList page="all" pageSize={3} />
        </div>
      </div>
    </div>
  );
}