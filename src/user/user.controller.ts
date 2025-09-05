import { Request, Response, Router } from "express";
import { UserService } from "./user.service";
import { ChangeRoleById } from "./user.types";
import { adminMiddleware } from "../middleware/role";
import { selfOrAdminMiddleware } from "../middleware/selfOrAdmin";

const router = Router();

const userService = new UserService();

router.get("/users", adminMiddleware, async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.status(200).json(users);
});

router.get(
  "/user/:id",
  selfOrAdminMiddleware,
  async (req: Request, res: Response) => {
    try {
      const category = await userService.getUserById({
        id: +req.params.id,
      });
      res.status(200).json(category);
    } catch (err) {
      res.status(500).json({ message: "user not found!" });
    }
  }
);

router.delete(
  "/user/:id",
  adminMiddleware,
  async (req: Request, res: Response) => {
    try {
      const user = await userService.deleteUser({ id: +req.params.id });
      res.status(200).json(user);
    } catch (err: any) {
      res.status(500).json({
        message: "Error while deleting user",
        error: err.message,
      });
    }
  }
);

router.patch(
  "user/role",
  adminMiddleware,
  async (req: Request, res: Response) => {
    try {
      const user: ChangeRoleById = { id: +req.body.id, role: req.body.role };
      const updatedUser = await userService.changeRoleById(user);
      res.status(200).json(updatedUser);
    } catch (err: any) {
      res.status(500).json({
        message: "Error while update user`s role",
        error: err.message,
      });
    }
  }
);

router.post(
  "/user/block/:id",
  selfOrAdminMiddleware,
  async (req, res, next) => {
    try {
      const id = +req.params.id;
      const user = await userService.blockOrUnblockById(id);
      res.status(200).json(user);
    } catch (e: any) {
      if (e.message === "UserNotFound") {
        return res.status(404).json({ error: "User not found" });
      }
      next(e);
    }
  }
);

export const userRouter = router;
