import { Router } from "express";
import { AuthController } from "../controller/auth-controller";
import { verfiyValidation } from "../utils/verity-validation";
import { schema } from "../schema";
import { controller } from "../controller";

const authRouter = Router();

authRouter
  .route("/login")
  .post(verfiyValidation(schema.loginSchema), controller.authController.login);
authRouter.route("/logout").post(controller.authController.logout);

export default authRouter;
