import { Router } from "express";
import authRouter from "./auth-route";
import userRouter from "./user-route";

const allroute = Router();
allroute.use("/auth", authRouter);
allroute.use("/user", userRouter);
export default allroute;
