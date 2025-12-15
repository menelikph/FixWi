"use client";
import Sidebar from "@/components/organisms/Sidebar";
import { Topbar } from "@/components/organisms/Topbar";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userRole, userName} = useAuth();



  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={userRole} />

      <div className="flex-1 flex flex-col ">
        <Topbar userName={userName} role={userRole} />
        <main className="flex-1 p-10 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
