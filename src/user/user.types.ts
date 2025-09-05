export type UserRole = "admin" | "user";

// ---------- Запросы ----------
export interface GetUserById {
  id: number;
}

export interface PostUser {
  fullName: string;
  birthDate: Date;
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

export interface findUserByEmail {
  email: string;
}

export interface setActive {
  id: number;
  isActive: boolean;
}
