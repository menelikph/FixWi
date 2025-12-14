export type UserRole = 'coder' | 'admin' | 'guest';

export type TicketStatus = 'pendiente' | 'en-proceso' | 'resuelto';

export type TicketCategory = 'hardware' | 'software' | 'infraestructura';

export interface Ticket {
    id: string;
    title: string;
    description: string;
    category: TicketCategory;
    status: TicketStatus;
    createdBy: string; 
    creatorId: string; 
    createdAt: string; 
    updatedAt: string; 
}

export interface User {
    id: string;
    fullName: string;
    email: string;
    role: UserRole;
}