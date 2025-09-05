import { UserRole } from "@/user/user.types";

export interface Login {
  email: string;
  password: string;
}

export interface JwtUser {
  id: number;
  role: UserRole;
}

export interface Register {
  fullName: string;
  birthDate: string; // ISO-строка
  email: string;
  password: string;
  role: UserRole;
}
