"use client";


import { ADMIN } from "@/constants/constants";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";
import {
  Home,
  List,
  LogOut,
  Plus,
  Shield,
  Users
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  role: UserRole;
}

type View =
  | "dashboard"
  | "create"
  | "my-tickets"
  | "all-tickets"
  | "analytics"
  | "users"
  | "detail";

export default function Sidebar({ role }: SidebarProps) {

  const { logout } = useAuth();
  const pathname = usePathname();

  const coderMenuItems = [
    { id: "dashboard", url: "/coder", icon: Home, label: "Dashboard" },
    { id: "create", url: "/tickets/create", icon: Plus, label: "Nuevo Ticket" },
    { id: "my-tickets", url: "/tickets", icon: List, label: "Mis Tickets" },
  ];

  const adminMenuItems = [
    { id: "dashboard", url: "/admin", icon: Home, label: "Dashboard" },
    {
      id: "all-tickets",
      url: "/tickets",
      icon: List,
      label: "Todos los Tickets",
    },

    { id: "users", url: "/users", icon: Users, label: "Usuarios" },
  ];

  useEffect(() => {
    const path = pathname;
    const allMenuItems = [...coderMenuItems, ...adminMenuItems];
    const matchedItem = allMenuItems.find(item => item.url === path);
    
    if (matchedItem) {
      handleViewChange(matchedItem.id);
    }
  }, [pathname]);

  const menuItems = role === ADMIN ? adminMenuItems : coderMenuItems;

  const [currentView, setCurrentView] = useState<View>("dashboard");

  const handleLogout = () => {
    logout()
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view as View);


    // setSelectedTicket(null);
  };




  return (
    <aside className="w-64 sticky top-0 left-0 h-svh z-10 bg-[#1A1A2E] text-white flex flex-col overflow-hidden">
      {/* Logo */}
      <div className="px-6 py-4 my-auto border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#5C3DFF] to-[#7D5CFF] flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">FIXWI</h1>
            <p className="text-xs text-gray-400">Sistema de Reportes</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <Link
                key={item.id}
                href={item.url}
                onClick={() => handleViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-[#5C3DFF] text-white shadow-lg shadow-[#5C3DFF]/30"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Cerrar Sesión</span>
        </button>

        <div className="mt-4 px-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Sistema Activo</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
