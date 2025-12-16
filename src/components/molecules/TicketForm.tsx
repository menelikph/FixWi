import { CATEGORIES } from "@/constants/constants";
import { useAuth } from "@/context/AuthContext";
import { ticketService } from "@/service/ticket-service";
import { TicketFormData } from "@/types/ticket";
import { Sparkles, X } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

/**
 * TicketForm Component
 * Form for creating new support tickets with AI suggestions
 */
export default function TicketForm() {
  const { createTicket } = ticketService;
  const { userId } = useAuth();

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>("");
  const [showAISuggestion, setShowAISuggestion] = useState(false);
  const [iaSuggestion, setIaSuggestion] = useState("");

  // Handle ticket creation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form: TicketFormData = {
      title,
      description,
      categoryId: category,
      userId: userId,
    };

    try {
      const response = await createTicket(form);

      if (response && response.id) {
        toast.success("Ticket creado exitosamente.");
        setTimeout(() => {
          redirect("/tickets");
        }, 2000);
      }
    } catch (error) {
      toast.error("Error al crear el ticket. Por favor, intenta de nuevo.");
    }
  };

  // Get AI suggestion for Software category
  const GetIaSuggestion = async (categoryName: string) => {
    if (categoryName !== "Software") return;

    try {
      const response = await ticketService.IAsuggestion(
        description,
        categoryName
      );
      debugger;
      console.log(response);
      setShowAISuggestion(true);
      setIaSuggestion(response);
    } catch (error) {
      toast.error("Error al obtener sugerencias de IA.");
    }
  };

  // Clear all form fields
  const clearForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6">
      {/* Title input */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Título del Reporte
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: Monitor sin señal en sala 3"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C3DFF] focus:border-transparent"
        />
      </div>

      {/* Description textarea */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Descripción Detallada
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe el problema con el mayor detalle posible..."
          required
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C3DFF] focus:border-transparent resize-none"
        />
      </div>

      {/* Category selection grid */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categoría
        </label>
        <div className="grid grid-cols-3 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.categoryId}
              type="button"
              onClick={() => {
                setCategory(cat.categoryId);
                GetIaSuggestion(cat.name);
              }}
              className={`p-4 border-2 rounded-lg  cursor-pointer transition-all ${
                category === cat.categoryId
                  ? "border-[#5C3DFF] bg-purple-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="text-2xl mb-2">{cat.icon}</div>
              <div className="text-sm font-medium text-gray-900">
                {cat.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* AI Suggestion box (shown only for Software category) */}
      {showAISuggestion && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#5C3DFF] to-[#7D5CFF] rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1 flex items-center gap-2">
                Sugerencia Automática
              </h4>
              <p className="text-sm text-gray-600">{iaSuggestion}</p>
            </div>
            {/* Close suggestion button */}
            <button
              type="button"
              onClick={() => setShowAISuggestion(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={clearForm}
          className="flex-1 px-6 py-3 border cursor-pointer border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex-1 px-6 py-3  cursor-pointer bg-gradient-to-r from-[#5C3DFF] to-[#7D5CFF] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#5C3DFF]/30 transition-all"
        >
          Crear Ticket
        </button>
      </div>
    </form>
  );
}
