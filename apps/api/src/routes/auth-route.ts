import { Router } from "express";
import { schema } from "../schema";
import { controller } from "../controller";
import { bodyValidation } from "../utils/request-body-validation";

const authRouter = Router();

authRouter
  .route("/login")
  .post(
    bodyValidation(schema.loginSchema, ["body"]),
    controller.authController.userLogin,
  );
authRouter.route("/logout").post(controller.authController.userLogin);

export default authRouter;
