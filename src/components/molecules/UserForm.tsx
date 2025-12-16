import { userService } from "@/service/user-service";
import { UserFormRquest } from "@/types/user";
import { useState } from "react";
import { toast } from "react-toastify";

/**
 * UserForm Component
 * Form for creating new users (admin functionality)
 */
export default function UserForm() {
  const { createUser } = userService;
  
  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<string>("");

  // Handle user creation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form: UserFormRquest = {
      fullName,
      email,
      password,
      role: "USER",
    };

    try {
      const response = await createUser(form);

      if (response && response.id) {
        toast.success("Usuario creado exitosamente.");
        clearForm();
      }
    } catch (error) {
      toast.error("Error al crear el usuario. Por favor, intenta de nuevo.");
    }
  };

  // Clear all form fields
  const clearForm = () => {
    setFullName("");
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6">
      {/* Full name input */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Nombre de usuario
        </label>
        <input
          id="username"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="pedro lopez"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C3DFF] focus:border-transparent"
        />
      </div>
      
      {/* Email input */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          email de usuario
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@example.com"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C3DFF] focus:border-transparent"
        />
      </div>
      
      {/* Password input */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          contraseña de usuario
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C3DFF] focus:border-transparent"
        />
      </div>

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
          Crear Usuario
        </button>
      </div>
    </form>
  );
}
