import { TicketList } from "@/components/templates/tickectList";

// ListTicketPage Component
export default function ListTicketPage() {
  // Render the ticket list component for all tickets
  return (
    <div>
      <TicketList page="all" />
    </div>
  );
}
