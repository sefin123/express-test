// src/middleware/admin.ts
import { Request, Response, NextFunction } from "express";

export function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = (req as any).user;

  if (!user) {
    return res.status(401).json({ error: "Unauthorized: no user" });
  }

  if (user.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Forbidden: only admin can perform this action" });
  }

  return next();
}
