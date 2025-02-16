import { Router } from "express"
import { bodyValidation } from "../utils/request-body-validation"
import { schema } from "../schema"
import { controller } from "../controller"
import { isAuthorizedRole } from "../middleware/authorize-middleware"
import { ROLEENUM } from "../types/role-type"
import { authMiddleware } from "../middleware/auth-middleware"
import { paginationSchema } from "../schema/paginationSchema"

const userRouter = Router()

userRouter
  .route('/')
  .post(authMiddleware, isAuthorizedRole(ROLEENUM.SUPER_ADMIN), bodyValidation( schema.userSchema), controller.userController.create);

userRouter.route('/').get(authMiddleware, bodyValidation(paginationSchema, ['pagination']) ,  isAuthorizedRole(ROLEENUM.SUPER_ADMIN),controller.userController.get);

userRouter.route('/').put(controller.userController.update)

userRouter.route('/').delete(controller.userController.delete)



export default userRouter
