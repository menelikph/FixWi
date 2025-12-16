"use client";

import { AuthProvider } from "@/context/AuthContext";
import { HeroUIProvider } from "@heroui/react";
// Providers Component
// Wraps application with necessary context providers
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <AuthProvider>{children}</AuthProvider>
    </HeroUIProvider>
  );
}
