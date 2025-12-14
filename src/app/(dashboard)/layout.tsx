import { Sidebar } from "@/components/organisms/Sidebar";
import { Topbar } from "@/components/organisms/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar fijo (ya maneja su posición fixed internamente si actualizaste el código, 
          pero mantenemos el espaciado aquí) */}
      <div className="hidden md:block w-64"> 
          <Sidebar /> 
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}