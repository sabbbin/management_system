import { Router } from "express";
import authRouter from "./auth-route";

const allroute = Router();
allroute.use("/auth", authRouter);
export default allroute;
