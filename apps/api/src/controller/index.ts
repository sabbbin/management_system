import { service } from "../services";
import { AuthController } from "./auth-controller";
import { UserController } from "./user-controller";


export  const controller={
    authController: new AuthController(service.authService),
    userController: new UserController(service.userService)
}