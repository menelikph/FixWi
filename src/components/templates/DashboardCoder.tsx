"use client";
import { redirect } from "next/navigation";
import { TicketList } from "./tickectList";
import { Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function DashboardCoder() {

  const { userName }= useAuth();
  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-[#5C3DFF] to-[#7D5CFF] rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Bienvenido, {userName}! 👋</h1>
        <p className="text-white/80 mb-6">
          Gestiona tus reportes de incidencias desde aquí
        </p>
        <button
          onClick={() => {
            redirect("/tickets/create");
          }}
          className="flex items-center cursor-pointer gap-2 px-6 py-3 bg-white text-[#5C3DFF] font-medium rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Crear Nuevo Ticket
        </button>
      </div>
      {/* <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Mis Reportes</h1>
          <p className="text-gray-500">Historial de tus solicitudes técnicas</p>
        </div>
        <button
          onClick={() => {
            redirect("/tickets/create");
          }}
          className="bg-[#5C3DFF] text-white px-4 py-2  cursor-pointer rounded-lg hover:bg-[#4A2FCC] transition-colors"
        >
          Reportar Incidencia
        </button>
      </div> */}

      <TicketList page="my-tickets" />
    </div>
  );
}
