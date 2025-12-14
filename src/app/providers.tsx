"use client";

import { HeroUIProvider } from '@heroui/react';
import { AuthProvider } from "@/context/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // 1. Capa visual (HeroUI)
    <HeroUIProvider>
      {/* 2. Capa lógica (AuthContext) - ¡Sin esto no funciona el login! */}
      <AuthProvider>
        {children}
      </AuthProvider>
    </HeroUIProvider>
  );
}