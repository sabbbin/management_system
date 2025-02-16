import { AuthService } from "./auth-service";
import { UserService } from "./user-service";

export const service = {
  authService: new AuthService(),
  userService: new UserService(),
};
