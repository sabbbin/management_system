import { Router } from "express"
import { bodyValidation } from "../utils/request-body-validation"
import { schema } from "../schema"
import { controller } from "../controller"

const authRouter = Router()

authRouter
  .route('/login')
  .post(bodyValidation(schema.loginSchema), controller.authController.login)
authRouter.route('/logout').post(controller.authController.logout)

export default authRouter
