"use client";

import { ADMIN, CODER } from "@/constants/constants";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

export default function Home() {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    redirect("/login");
  } else {
    if (userRole === ADMIN) {
      redirect("/dashboard/admin");
    } else if (userRole === CODER) {
      redirect("/dashboard/coder");
    }
  }

  return null;
}
