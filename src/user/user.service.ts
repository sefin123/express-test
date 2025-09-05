import { User } from "@prisma/client";
import { UserRepository } from "./user.repository";
import {
  ChangeRoleById,
  DeleteUserById,
  GetUserById,
  PostUser,
} from "./user.types";

export class UserService {
  private readonly userRepository = new UserRepository();

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
    const createdUser = await this.userRepository.createUser(user);

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

  async blockOrUnblockById(id: number): Promise<User> {
    const exists = await this.userRepository.getUserById({ id });
    if (!exists) throw new Error("UserNotFound");

    return this.userRepository.setActive({ id, isActive: !exists.is_active });
  }
}
