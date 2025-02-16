import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { ROLEENUM } from '../types/role-type'
import { service } from '../services'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearerToken = req.headers.authorization
  if (!bearerToken?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid token format' })
  }

  const token = bearerToken.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'No token found' })
  }

  const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY!) as {
    id: string
    roleId:ROLEENUM
  }

  if (!decoded || !decoded.id) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  service.authService
    .findUserById(decoded.id)
    .then((res) => {
      req.userId = res[0].user_id
      req.roleId = res[0].role_id
      next()
    })
    .catch((err) => next(err))
}


