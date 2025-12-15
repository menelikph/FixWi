import { Category } from "@/types/ticket";

export const ADMIN = "ADMIN";
export const CODER = "USER";
export const GUEST = "GUEST";


export const CATEGORIES: Category[] =[
            {
              categoryId: "1" as const,
              name: "Software",
              icon: "🧑‍💻",
            },
            { categoryId: "2" as const, name: "Infraestructura", icon: "🏢" },
            {
              categoryId: "3" as const,
              name: "Hardware",
              icon: "💻",
            },
          ]