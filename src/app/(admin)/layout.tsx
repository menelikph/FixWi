"use client";

import Sidebar from "@/components/organisms/Sidebar";
import { Topbar } from "@/components/organisms/Topbar";
import React, { useState } from "react";

type User = {
  email: string;
  name: string;
  role: "coder" | "admin";
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>({
    email: "pedro@riwi.io",
    name: "pedro",
    role: "admin",
  });

  return (
    <div className="flex min-h-screen bg-[#F8F9FF]">
      <Sidebar role={user.role} setUser={setUser} />

      <div className="flex-1 flex flex-col">
        <Topbar userName={user.name} role={user.role} />

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
