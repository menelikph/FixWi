"use client";

import { useParams } from "next/navigation";
import TicketDetail from "@/components/organisms/TicketDetail";

export default function TicketPage() {
  // 1. Obtenemos los parámetros de la URL
  const params = useParams();

  // 2. Extraemos el ID asegurándonos de que sea un texto (string)
  // useParams puede devolver un array o undefined, así que lo validamos.
  const id = typeof params?.id === "string" ? params.id : "";

  // 3. Renderizamos el detalle pasándole el ID
  return <TicketDetail id={id} />;
}