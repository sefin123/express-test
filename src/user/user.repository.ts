import { Prisma, PrismaClient, User } from "@prisma/client";
import {
  ChangeRoleById,
  DeleteUserById,
  GetUserById,
  PostUser,
  setActive,
} from "./user.types";
const prisma = new PrismaClient();

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

  createUser(user: PostUser): Promise<User> {
    return prisma.user.create({
      data: {
        full_name: user.fullName,
        birth_date: user.birthDate,
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

  findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  setActive(user: setActive): Promise<User> {
    return prisma.user.update({
      where: { id: user.id },
      data: { is_active: user.isActive },
    });
  }
}
