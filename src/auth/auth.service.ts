import bcrypt from "bcryptjs";
import type { User } from "@prisma/client";
import { UserRepository } from "@/user/user.repository";
import { signJwt } from "../utils/jwt";
import { Login, Register } from "./auth.types";
import { UserService } from "../user/user.service";
import { UserRole } from "@/user/user.types";

export class AuthService {
  private readonly userRepository = new UserRepository();
  private readonly userService = new UserService();

  async login(credentials: Login): Promise<{ token: string; user: User }> {
    const user = await this.userRepository.findUserByEmail(credentials.email);
    if (!user) throw new Error("Invalid credentials");

    const ok = await bcrypt.compare(credentials.password, user.password);

    if (!ok) throw new Error("Invalid credentials");

    if (!user.is_active) throw new Error("User inactive");

    const token = signJwt({
      id: user.id,
      role: user.role,
      isActive: user.is_active,
    });

    return { token, user };
  }

  async register(user: Register): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const total = await this.userRepository.countUsers();
    let role: UserRole = total === 0 ? "admin" : "user";
    const userData = {
      fullName: user.fullName,
      birthDate: new Date(user.birthDate),
      email: user.email,
      password: hashedPassword,
      role: role,
    };

    const createdUser = await this.userService.postUser(userData);

    if (!createdUser) {
      throw new Error("User creation failed");
    }

    return createdUser;
  }
}
