import { BaseDatabase } from "./base-service";


export class UserService extends BaseDatabase {

  get = async (limit:number, offset:number) => {

  return this.rawQuery(`
  SELECT first_name, last_name, email, phone,
         dob, gender, address
  FROM users
  LIMIT $1 OFFSET $2
`, [limit,offset]);
  }

  create = async (data: any) => {
    const insertUserQuery = `
  INSERT INTO users(first_name, last_name, email, role_id, password, phone,
  dob, gender, address) values ($1,$2,$3,$4,$5, $6, $7,$8, $9) RETURNING *
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
    const updatequery = `UPDATE users SET first_name=$1, last_name=$2, email=$3, role_id=$4, password=$5, phone=$6,
  dob=$7, gender=$8, address=$9   WHERE id = $10 RETURNING *`;
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
      id
    ]
    
    const result = await this.rawQuery(updatequery, values);
    return result;
  }
  delete = async (id: string) => {
    const deletequery = 'DELETE FROM users WHERE id = $1 RETURNING *'
    const result = await this.rawQuery(deletequery, [id])
    return result
  }

}