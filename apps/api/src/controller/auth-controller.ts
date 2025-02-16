import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth-service";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth-service";

export class AuthController {
  constructor(private authService: AuthService) {}
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { user, password } = req.body;
    const { user, password } = req.body;

    const getUserDetail = await this.authService.findUserByUser(user);
    if (!getUserDetail) {
      next("Invalid Credentials");
      next("Invalid Credentials");
    }
    console.log("user detail", getUserDetail);
    const isPasswordMatch = await argon2.verify(
      getUserDetail.password,
      password,
    );
    if (!isPasswordMatch) {
      next("Invalid Credentials");
    }

    const jwtPayload = {
      id: getUserDetail.id,
    };
    const token = jwt.sign(jwtPayload, process.env.JWT_ACCESS_TOKEN_KEY!, {
      expiresIn: +process.env.JWT_ACCESS_TOKEN_EXPIRES!,
    });
    });
    let options = {
      maxAge: +process.env.JWT_ACCESS_TOKEN_EXPIRES!,
      httpOnly: true,
    };
    res
      .status(200)
      .cookie("token", token, options)
      .json({
        msg: "successful",
        data: {
          token,
          role_id: getUserDetail.role_id,
        },
        success: "true",
      });
  };
    };
    res
      .status(200)
      .cookie("token", token, options)
      .json({
        msg: "successful",
        data: {
          token,
          role_id: getUserDetail.role_id,
        },
        success: "true",
      });
  };
  logout = (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", null, {
    res.cookie("token", null, {
      maxAge: 0,
      httpOnly: true,
    });
    });
    res.status(200).json({
      success: true,
      msg: "Logged out",
    });
  };
      msg: "Logged out",
    });
  };
}
