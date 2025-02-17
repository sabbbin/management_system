import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user-service";
import { decryptedPassword } from "../utils/crypto";

export class UserController {
  constructor(private userService: UserService) {}

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = +req.query["limit"];
      const pageNo = +req.query["pageNo"];
      const userList = await this.userService.get(limit, (pageNo - 1) * limit);
      res.status(200).json({
        data: userList,
        status: "success",
      });
    } catch (err) {
      console.log("erro", err);
      next(err.message || "Error");
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body as any;

      const hashedPass = await decryptedPassword(data.password);
      if (!hashedPass) {
        next("Error occurs");
      }
      data.password = hashedPass;

      const newUser = await this.userService.create(data);
      if (newUser.length > 0) {
        res.status(200).json({ msg: "success" });
      } else {
        res.status(200).json({ msg: "failure" });
      }
    } catch (err) {
      next(err);
    }
  };

    createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
       console.log('admin schema')
      const data = req.body as any;

      const hashedPass = await decryptedPassword(data.password);
      if (!hashedPass) {
        next("Error occurs");
      }
      data.password = hashedPass;
      data.role_id=1;

      const newUser = await this.userService.create(data);
      if (newUser.length > 0) {
        res.status(200).json({ msg: "successful", success:true });
      } else {
        res.status(200).json({ msg: "failure", success:false });
      }
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const id = req.params.id;

      const result = await this.userService.update(id, data);
      console.log("rsult", result);
      if (result.length > 0) {
        res.json({ msg: "success" });
      } else {
        res.json({ msg: "failure" });
      }
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (id != req.userId) {
      try {
        const result = await this.userService.delete(id);
        if (result.length > 0) {
          res.json({ status: "success", msg: "User delete successfully" });
        } else {
          res.json({ status: "failure", msg: "User does not exit" });
        }
      } catch (err) {
        next(err);
      }
    } else {
      next("You are not allowed to delete yourself");
    }
  };
}
