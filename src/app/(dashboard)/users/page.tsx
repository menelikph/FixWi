"use client";
import UserForm from "@/components/molecules/UserForm";

export default function CreateUserPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#5C3DFF] to-[#7D5CFF] px-8 py-6 text-white">
          <h2 className="text-2xl font-bold">Crear Nuevo Usuario</h2>
        </div>

        {/* Form */}
        <UserForm />
      </div>
    </div>
  );
}
