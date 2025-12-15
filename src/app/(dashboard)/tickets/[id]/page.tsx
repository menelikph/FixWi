import TicketDetail from "@/components/organisms/TicketDetail";
import { useParams } from "next/navigation";


export default function CoderPage() {

const { id } = useParams();

  return <TicketDetail />;
}