import { Request, Response, Router } from "express";
import { UserService } from "./user.service";
import { ChangeRoleById } from "./user.types";
const router = Router();

const userService = new UserService();

router.get("/users", async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.status(200).json(users);
});

router.get("/user/:id", async (req: Request, res: Response) => {
  try {
    const category = await userService.getUserById({
      id: +req.params.id,
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: "user not found!" });
  }
});

router.post("/user", async (req: Request, res: Response) => {
  try {
    const user = await userService.postUser(req.body);
    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({
      message: "Error while creating user",
      err: err.message,
    });
  }
});

router.delete("/user/:id", async (req: Request, res: Response) => {
  try {
    const user = await userService.deleteUser({ id: +req.params.id });
    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({
      message: "Error while deleting user",
      error: err.message,
    });
  }
});

router.patch("user/role", async (req: Request, res: Response) => {
  try {
    const user: ChangeRoleById = { id: +req.body.id, role: req.body.role };
    const updatedUser = await userService.changeRoleById(user);
    res.status(200).json(updatedUser);
  } catch (err: any) {
    res.status(500).json({
      message: "Error while deleting user",
      error: err.message,
    });
  }
});

export const userRouter = router;
