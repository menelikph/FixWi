export interface Ticket {
  title: string;
  description: string;
  categoryId: string;
  userId: string;
}


export interface TicketFormData {
  title: string;
  description: string;
  categoryId: string;
  userId: string;

}


export interface Category {
  categoryId: string;
  name: string;
  icon: string;
}

export interface TicketResponse {
  id: number;
  title: string;
  description: string;
  status: "OPEN" | "CLOSE" | "IN_PROGRESS";
  categoryName: string;
  userId: number;
  createDate: string;
}


export interface TicketListResponse {
  content: TicketResponse[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}

export type TicketStatus = "OPEN" | "CLOSE" | "IN_PROGRESS";