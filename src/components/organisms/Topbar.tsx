// src/components/organisms/Topbar.tsx

import { Bell, Search, User } from 'lucide-react';
import { UserRole } from '@/types';
import { ADMIN } from '@/constants/constants';

interface TopbarProps {
  userName: string;
  role: UserRole; // Usando el tipo definido
}

export function Topbar({ userName, role }: TopbarProps) {
  return (
    <header className="bg-white border-b sticky top-0 w-full right-0 border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar tickets, categorías..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C3DFF] focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF6A4A] rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500 capitalize">
                {role === ADMIN ? 'Administrador' : 'Coder'}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5C3DFF] to-[#7D5CFF] flex items-center justify-center text-white font-medium">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}