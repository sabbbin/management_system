import { Request, Response, NextFunction } from "express";
import { ROLEENUM } from "../types/role-type";

export const isAuthorizedRole =
  (...roles: ROLEENUM[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    console.log("is authorizable role", roles, req.userId, req.roleId);
    if (roles.includes(req.roleId as unknown as ROLEENUM)) {
      next();
    } else {
      next("Forbidden Error");
    }
  };
