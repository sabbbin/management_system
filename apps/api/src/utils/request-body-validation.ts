import { NextFunction, Request, Response } from "express";
import { ZodRawShape, ZodObject } from "zod";

export const bodyValidation = <T extends ZodRawShape>(
  validationSchema: ZodObject<T>,
  parameter: ("body" | "pagination")[] = ["body"],
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    console.log('data',data)
    if (parameter.includes("body")) {
      const isParsedSuccess = validationSchema.safeParse(data);
      if (!isParsedSuccess.success) {
        next({ data: isParsedSuccess.error.errors.map((val) => val.message) });
      }
    }
    if (parameter.includes("pagination")) {
      const data = {
        limit: req.query["limit"],
        pageNo: req.query["pageNo"],
      };
      const isParsedSuccess = validationSchema.safeParse(data);
      if (!isParsedSuccess.success) {
        req.query.limit = "0";
        req.query.pageNo = "0";
      }
    }
    next();
  };
};
