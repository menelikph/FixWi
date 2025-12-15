"use client";
import TicketForm from "@/components/molecules/TicketForm";

export default function CreateTicketPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#5C3DFF] to-[#7D5CFF] px-8 py-6 text-white">
          <h2 className="text-2xl font-bold">Crear Nuevo Ticket</h2>
          <p className="text-white/80 mt-1">
            Describe el problema que estás experimentando
          </p>
        </div>

        {/* Form */}
        <TicketForm />
      </div>
    </div>
  );
}
