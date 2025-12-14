import { UserRole } from "@/types";

export const authService = {
  login: async (email: string, password: string) => {
    // Ejemplo de fetch real:
    /*
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) throw new Error('Error en credenciales');
    return response.json(); // Debería retornar { token: "...", role: "...", user: ... }
    */
    // MOCK: Simulación de respuesta del backend
    return new Promise<{ token: string; role: UserRole; name: string }>((resolve, reject) => {
      setTimeout(() => {
        if (password === 'error') {
            reject(new Error('Credenciales inválidas'));
            return;
        }
        
        // Lógica simple para simular roles según el email
        const role: UserRole = email.includes('admin') ? 'admin' : 'coder';
        
        resolve({
          token: 'fake-jwt-token-123456',
          role: role,
          name: email.split('@')[0], // Usa la parte del correo antes del @ como nombre
        });
      }, 1000);
    });
  },
};