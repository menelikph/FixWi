export type UserRole = 'USER' | 'ADMIN' | 'GUEST';

export type TicketStatus = 'pendiente' | 'en-proceso' | 'resuelto';

export type TicketCategory = 'hardware' | 'software' | 'infraestructura';

export interface Ticket {
    imageUrl: any;
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