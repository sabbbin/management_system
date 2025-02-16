import { Request, Response, NextFunction } from 'express'
import { UserService } from '../services/user-service'
import { decryptedPassword } from '../utils/crypto'

export class UserController {
  constructor(private userService: UserService) {
  }

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const limit=+req.query['limit'];
        const pageNo= +req.query['pageNo'];
        const userList= await  this.userService.get(limit, (pageNo-1) * limit);
        res.status(200).json({
            data:userList,
            status:'success'
        })
    } catch (err) {
        console.log('erro',err)
        next(err.message || 'Error')
    }
}

create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body as any
      
      const hashedPass = await decryptedPassword(data.password)
      if (!hashedPass) {
        next('Error occurs')
      }
      data.password = hashedPass;
      console.log('data',data)

     const newUser=  await this.userService.create(data)
      console.log('new user', newUser)
      res.status(200).json({ msg: 'success' })
    } catch (err) {
         console.log('err',err)
      next('Error')
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body
    const id = req.params.id
    const keys = Object.keys(data)
    let values = Object.values(data)

    if (keys.length === 0) {
      next('No fields to update')
    }
    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ')
    const updatequery = `UPDATE users SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`
    values.push(id)
    await this.userService.update(id, setClause)
    res.json({ msg: 'success' })
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    try {
     const result=  await this.userService.delete(id)
      console.log('result',result);
      res.send('success')
    } catch (err) {
      console.error('Error deleting user:', err)
      throw err
    }
  }
}
