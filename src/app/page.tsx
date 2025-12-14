"use client";

import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

export default function Home() {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    redirect("/login");
  } else {
    if (userRole === "admin") {
      redirect("/dashboard/admin");
    } else if (userRole === "coder") {
      redirect("/dashboard/coder");
    }
  }

  return null;
}
