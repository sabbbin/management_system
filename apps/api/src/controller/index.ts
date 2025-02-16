import { service } from "../services";
import { AuthController } from "./auth-controller";

export const controller = {
  authController: new AuthController(service.authService),
};
