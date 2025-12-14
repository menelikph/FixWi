import React from 'react';
import { LoginForm } from '@/components/molecules/LoginForm';

export default function LoginPage() {
  const features = [
    "Reportes rápidos y organizados",
    "Seguimiento en tiempo real",
    "Sugerencias con IA",
  ];

  return (
    <div className="min-h-screen flex">
      {/* Lado Izquierdo - Formulario */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <LoginForm />
      </div>

      {/* Lado Derecho - Ilustración Completa */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#5C3DFF] to-[#4A2FCC] items-center justify-center p-12 relative overflow-hidden">
        {/* Patrones de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 text-white max-w-lg">
          <h2 className="text-4xl font-bold mb-6">Sistema Interno de Gestión de Incidencias</h2>
          <p className="text-lg text-white/90 mb-8">
            Reporta y gestiona problemas técnicos de forma rápida y eficiente. 
            Mantén tu espacio de trabajo funcionando al 100%.
          </p>

          {/* Lista de Features recuperada */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}