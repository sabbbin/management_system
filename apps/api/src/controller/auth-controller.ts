import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth-service";
import { AdminSchemaType, UserSchemaType } from "../schema/userSchema";

export class AuthController {
  constructor(private authService: AuthService) {}


   adminLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, password } = req.body;
      const getUserDetail = await this.authService.findAdminById(user);
    let options = {
      maxAge: +process.env.JWT_ACCESS_TOKEN_EXPIRES!,
      httpOnly: true,
    };
    const result=  await this.login(getUserDetail, password)
    res
    .status(200)
    .cookie("token", result.token, options)
    .json({
      msg: "successful",
      data:result,
      success: true,
    });
  } catch(err) {
    next(err)
  }
  };

  userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, password } = req.body;
      const getUserDetail = await this.authService.findUserByUser(user);
    let options = {
      maxAge: +process.env.JWT_ACCESS_TOKEN_EXPIRES!,
      httpOnly: true,
    };
    const result=  await this.login(getUserDetail, password)
    res
    .status(200)
    .cookie("token", result.token, options)
    .json({
      msg: "successful",
      data:result,
      success: true,
    });
  } catch(err) {
    next(err)
  }
  };

    login = async (getUserDetail: UserSchemaType& {id:string}, password:string) => { 
    const isPasswordMatch = await argon2.verify(
      getUserDetail.password,
      password,
    );
    if (!isPasswordMatch) {
      throw new Error ("Invalid Credentials");
    }

    const jwtPayload = {
      id: getUserDetail.id,
    };
    const token = jwt.sign(jwtPayload, process.env.JWT_ACCESS_TOKEN_KEY!, {
      expiresIn: +process.env.JWT_ACCESS_TOKEN_EXPIRES!,
    });
   
    return {
      token : token ,
      role_id: getUserDetail.role_id,
      
    }
   
  };
  logout = (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", null, {
      maxAge: 0,
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      msg: "Logged out",
    });
  };
}
