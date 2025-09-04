export type UserRole = "admin" | "user";

// ---------- Запросы ----------
export interface GetUserById {
  id: number;
}

export interface PostUser {
  fullName: string;
  birthDate: string; // ISO-строка
  email: string;
  password: string;
  role: UserRole;
}

export interface ChangeRoleById {
  id: number;
  role: UserRole;
}

export interface DeleteUserById {
  id: number;
}
