import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { UserRole } from "@/user/user.types";

dotenv.config();

type TokenPayload = JwtPayload & {
  id: number;
  role: UserRole;
  isActive: boolean;
};

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ error: "Token missing in cookie" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded === "string" || decoded == null) {
      res.status(401).json({ error: "Invalid token payload" });
    }

    const payload = decoded as TokenPayload;

    if (!payload.isActive) {
      res.status(403).json({ error: "User inactive" });
    }

    (req as any).user = { id: payload.id, role: payload.role };
    return next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
