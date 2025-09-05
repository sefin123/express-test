import dotenv from "dotenv";
import express from "express";
import { userRouter } from "./user/user.controller";
import { authMiddleware } from "./middleware/auth";
import cookieParser from "cookie-parser";
import { AuthRouter } from "./auth/auth.controller";

const app = express();
dotenv.config();

async function main() {
  app.use(cookieParser());
  app.use(express.json());
  app.use("/api/v1/auth", AuthRouter);
  app.use(authMiddleware);
  app.use("/api/v1", userRouter);
  app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
  });
}

main();
