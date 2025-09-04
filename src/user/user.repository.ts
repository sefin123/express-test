import { Prisma, PrismaClient, User } from "@prisma/client";
import { ChangeRoleById, DeleteUserById, GetUserById } from "./user.types";
const prisma = new PrismaClient();

type CreateUserInput = Prisma.UserCreateInput;

export class UserRepository {
  getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  getUserById(user: GetUserById): Promise<User> {
    return prisma.user.findFirstOrThrow({
      where: {
        id: user.id,
      },
    });
  }

  createUser(user: CreateUserInput): Promise<User> {
    return prisma.user.create({
      data: {
        full_name: user.full_name,
        birth_date: user.birth_date,
        email: user.email,
        password: user.password,
        role: user.role,
      },
    });
  }

  deleteUser(user: DeleteUserById): Promise<User> {
    return prisma.user.delete({ where: { id: user.id } });
  }

  countUsers(): Promise<number> {
    return prisma.user.count();
  }

  changeRoleById(user: ChangeRoleById): Promise<User> {
    return prisma.user.update({
      where: { id: user.id },
      data: { role: user.role },
    });
  }
}
