"use client";

import { useParams } from "next/navigation";
import TicketDetail from "@/components/organisms/TicketDetail";

/**
 * TicketPage Component
 * 
 * Dynamic route page that displays detailed information for a specific ticket.
 * The ticket ID is extracted from the URL parameters using Next.js dynamic routing.
 * 
 * Route pattern: /tickets/[id]
 * Example: /tickets/123 will display details for ticket with ID 123
 */
export default function TicketPage() {
  // Extract route parameters from the URL
  const params = useParams();

  // Extract and validate the ticket ID parameter
  // useParams can return an array or undefined, so we validate the type
  // to ensure we always have a valid string ID
  const id = typeof params?.id === "string" ? params.id : "";

  // Render the ticket detail component with the extracted ID
  return <TicketDetail id={id} />;
}