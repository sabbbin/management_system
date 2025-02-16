import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { ROLEENUM } from '../types/role-type'
import { service } from '../services';


export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearerToken = req.headers.authorization
  if (!bearerToken?.startsWith('Bearer ')) {
    next( 'Invalid token format' )
  }

  const token = bearerToken.split(' ')[1]
  if (!token) {
     next('No token found' )
  }

  const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_KEY!) as {
    id: string
  }

  if (!decoded || !decoded.id) {
    return next( 'Invalid token' )
  }
  service.authService
    .findUserById(decoded.id)
    .then((res) => {
        console.log(res)
      req.userId = res.id;
      req.roleId = res.role_id;
      next()
    })
    .catch((err) => next(err))
}


