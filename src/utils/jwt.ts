import { JwtUser } from "@/auth/auth.types";
import jwt from "jsonwebtoken";

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET ?? "dev-secret";

export function signJwt(user: JwtUser) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyJwt<T>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
}
