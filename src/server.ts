import dotenv from "dotenv";
import express from "express";
import { userRouter } from "./user/user.controller";
import { requireAdmin } from "./middleware/role";

const app = express();
dotenv.config();

async function main() {
  app.use(express.json());
  app.use(requireAdmin);
  app.use("/api/v1", userRouter);
  app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
  });
}

main();
