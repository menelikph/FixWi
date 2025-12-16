"use client";

import { ADMIN, CODER } from "@/constants/constants";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

/**
 * Home Page - Root route handler
 * Redirects users to appropriate dashboard based on authentication and role
 */
export default function Home() {
  // Get authentication state and user role from context
  const { isAuthenticated, userRole } = useAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    redirect("/login");
  } else {
    // Redirect authenticated users to their role-specific dashboard
    if (userRole === ADMIN) {
      redirect("/dashboard/admin");
    } else if (userRole === CODER) {
      redirect("/dashboard/coder");
    }
  }

  // No UI is rendered - only redirects occur
  return null;
}
