import { NextFunction, Request, Response } from "express";
import { ZodRawShape, ZodObject } from "zod";

export const verfiyValidation = <T extends ZodRawShape>(
  validationSchema: ZodObject<T>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const isParsedSuccess = validationSchema.safeParse(data);
    if (isParsedSuccess.success) {
      next();
    } else {
      next({ data: isParsedSuccess.error.errors.map((val) => val.message) });
    }
  };
};
