import { User } from "@prisma/client";
import { UserRepository } from "./user.repository";
import {
  ChangeRoleById,
  DeleteUserById,
  GetUserById,
  PostUser,
  UserRole,
} from "./user.types";
import { hashPassword } from "../utils/password";

export class UserService {
  private userRepository = new UserRepository();

  async getUsers(): Promise<User[] | string> {
    return await this.userRepository.getAllUsers();
  }

  async getUserById(user: GetUserById): Promise<User | null> {
    const foundUser = await this.userRepository.getUserById(user);

    if (!foundUser) {
      throw new Error();
    }

    return foundUser;
  }

  async postUser(user: PostUser): Promise<User> {
    const passwordHash = await hashPassword(user.password);

    const total = await this.userRepository.countUsers();
    let role: UserRole = total === 0 ? "admin" : "user";

    const userData = {
      full_name: user.fullName,
      birth_date: new Date(user.birthDate), // преобразуем строку в Date
      email: user.email,
      password: passwordHash,
      role: role,
    };

    const createdUser = await this.userRepository.createUser(userData);

    if (!createdUser) {
      throw new Error("User creation failed");
    }

    return createdUser;
  }

  async deleteUser(user: DeleteUserById) {
    try {
      const deletedUser = await this.userRepository.deleteUser(user);
      return deletedUser;
    } catch (err) {
      throw new Error("User not found");
    }
  }

  async changeRoleById(user: ChangeRoleById) {
    try {
      const changedUser = await this.userRepository.changeRoleById(user);
      return changedUser;
    } catch (err) {
      throw new Error("User not found");
    }
  }
}
