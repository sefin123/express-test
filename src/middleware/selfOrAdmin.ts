import { Request, Response, NextFunction } from "express";

export function selfOrAdminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = (req as any).user;
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const parsed = Number(req.params.id);
  if (Number.isNaN(parsed)) {
    return res.status(400).json({ error: "Invalid user id" });
  }

  const targetId = parsed;
  const isSelf = String(user.id) === String(targetId);
  const isAdmin = user.role === "admin";

  if (!isSelf && !isAdmin) {
    return res.status(403).json({ error: "Forbidden: only owner or admin" });
  }

  next();
}
