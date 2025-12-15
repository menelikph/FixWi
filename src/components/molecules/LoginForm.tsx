"use client";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/service/auth-service";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await authService.login(email, password);
      login(data.role, data.fullName, data.id);
    } catch (error) {
      toast.error("Credenciales inválidas. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };




  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5C3DFF] to-[#7D5CFF] flex items-center justify-center">
            {/* Icono SVG original del diseño */}
            <svg
              className="w-7 h-7 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 10 12 6.16-1.26 10-6.45 10-12V7l-10-5z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A2E]">FIXWI</h1>
            <p className="text-sm text-gray-500">by Riwi</p>
          </div>
        </div>
        <p className="text-gray-600 mt-4 text-left italic">
          Accede para reportar o gestionar daños del sistema
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Correo Electrónico
        </label>
        <Input
          type="email"
          icon={Mail}
          placeholder="tu-email@riwi.io"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contraseña
        </label>
        <Input
          type={showPassword ? "text" : "password"}
          icon={Lock}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          }
        />
      </div>

      {/* SECCIÓN RECUPERADA: Recordar sesión y Olvidé contraseña */}
      {/* <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-[#5C3DFF] focus:ring-[#5C3DFF]"
          />
          <span className="text-sm text-gray-600">Recordar sesión</span>
        </label>
        <a href="#" className="text-sm text-[#5C3DFF] hover:underline">
          ¿Olvidaste tu contraseña?
        </a>
      </div> */}

      <Button type="submit"  disabled={loading}>
        {loading ? "Iniciando..." : "Iniciar Sesión"}
      </Button>

      {/* Credenciales Demo originales */}
      {/* <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-600 mb-2 font-medium">Credenciales de prueba:</p>
        <div className="space-y-1 text-xs text-gray-500">
          <p><strong>Coder:</strong> coder@riwi.io / password</p>
          <p><strong>Admin:</strong> admin@riwi.io / password</p>
        </div>
      </div> */}
    </form>
  );
}
