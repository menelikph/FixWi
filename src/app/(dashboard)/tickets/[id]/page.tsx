// src/app/(dashboard)/tickets/[id]/page.tsx

'use client'; // <-- IMPRESCINDIBLE PARA USAR HOOKS y useRouter/useParams

import TicketDetail from "@/components/organisms/TicketDetail";
import { useParams, useRouter } from "next/navigation";
import { useState, useCallback } from "react";
// Importar el tipo de estado de TicketResponse
import { TicketResponse } from "@/types/ticket"; 
// import { ticketService } from "@/service/ticket-service"; // Importa el servicio si lo necesitas

// Definición del tipo de estado para consistencia
type TicketStatus = TicketResponse["status"];

export default function CoderPage() {

  // 1. Obtención del ID y Navegación
  const params = useParams();
  const router = useRouter();
  // Se asume que params.id es un string
  const id = params.id as string; 

  // 2. Definición de props faltantes
  const [isAdmin, setIsAdmin] = useState(true); // Simulación de isAdmin

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  // 3. FUNCIÓN ASÍNCRONA: onUpdateStatus (Resuelve el error de tipo Promise<void>)
  const handleUpdateStatus = useCallback(async (newStatus: TicketStatus) => {
      
      console.log(`Llamada a la API: Actualizando ticket ${id} al estado: ${newStatus}`);
      
      // Aquí iría la llamada asíncrona real:
      /*
      try {
          // await ticketService.updateStatus(id, newStatus); 
      } catch (error) {
          // Manejo de error
      }
      */
  }, [id]);

  // 4. Pasar todas las props requeridas
  return (
    <TicketDetail
        id={id}
        onBack={handleBack}
        isAdmin={isAdmin}
        onUpdateStatus={handleUpdateStatus} // Ahora es una función asíncrona que coincide
    />
  );
}