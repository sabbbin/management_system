import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { ROLEENUM } from '../types/role-type'

export const isAuthorizedRole =
  (...roles: ROLEENUM[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (roles.includes(req.userId as unknown as ROLEENUM)) {
      next()
    }
    throw new Error('Forbidden Error')
  }
