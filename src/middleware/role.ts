import { Request, Response, NextFunction } from "express";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.body) {
    return res.status(401).json({ error: "Unauthorized (no mock user)" });
  }
  if (req.body.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Forbidden: only admin can perform this action" });
  }
  next();
}
