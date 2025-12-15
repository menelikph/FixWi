
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: "USER" | "ADMIN";
};

export interface UserFormRquest {
  email: string;
  fullName: string;
  password: string;
  role: "USER" | "ADMIN";
} 


export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;

}