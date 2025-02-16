import { UserSchemaType } from "../schema/userSchema";
import { BaseDatabase } from "./base-service";


export class UserService extends BaseDatabase {

  get = async (data:UserSchemaType) => {
    return this.rawQuery(`
     select first_name, last_name, email, phone,
  dob, gender, address from users
      `, [data.first_name, data.last_name, data.email, data.phone
        , data.dob, data.gender, data.address
      ])
  }

  create = async (data: any) => {
    const insertUserQuery = `
  INSERT INTO users(first_name, last_name, email, role_id, password, phone,
  dob, gender, address) values ($1,$2,$3,$4,$5, $6, $7,$8, $9)
 `
    const values = [
      data.first_name,
      data.last_name,
      data.email,
      data.role_id,
      data.password,
      data.phone,
      data.dob,
      data.gender,
      data.address,
    ]
   
    return  await this.rawQuery(insertUserQuery, values)
   
  }
  update = async (id: string, data: any) => {
    // const updatequery = `UPDATE users SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`;
    // values.push(id);
    // const result = await baseQuery(updatequery, values);
    // return result[0];
  }
  delete = async (id: string) => {
    const deletequery = 'DELETE FROM users WHERE id = $1 RETURNING *'
    const result = await this.rawQuery(deletequery, [id])
    return result
  }

}