import express from "express";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const router = express.Router();

const authService = new AuthService();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };
    const { token, user } = await authService.login({ email, password });

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      })
      .status(200)
      .json({ message: "Login successful", name: user.full_name });
  } catch (e: any) {
    if (e.message === "Invalid credentials")
      res.status(401).json({ error: "Invalid credentials" });
    if (e.message === "User inactive")
      res.status(403).json({ error: "User is inactive" });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    const newUser = await authService.register(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Register error:", err);
    res.status(400).json("Registration failed");
  }
});

router.post("/logout", (req: Request, res: Response) => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ error: "Token missing in cookie" });
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

export const AuthRouter = router;
