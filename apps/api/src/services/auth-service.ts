import { BaseDatabase } from "./base-service";

export class AuthService extends BaseDatabase {
  findUserById = async (id: string) => {
    const loginQuery =
      "Select id, first_name, last_name, role_id , password from users where id=$1";
    const user = (await this.rawQuery(loginQuery, [id])) as any;
    if (!user || user.length == 0) {
      return null;
    }
    return user[0];
  };

    findAdminById = async (id: string) => {
    const loginQuery =
      "Select id, first_name, last_name, role_id , password from users where id=$1  and  role_id=1";
    const user = (await this.rawQuery(loginQuery, [id])) as any;
    if (!user || user.length == 0) {
      return null;
    }
    return user[0];
  };
  findUserByUser = async (username: string) => {
    const loginQuery =
      "Select id, first_name, last_name, role_id , password from users where phone=$1 and role_id=1";
    const user = (await this.rawQuery(loginQuery, [username])) as any;
    if (!user || user.length == 0) {
      return null;
    }
    return user[0];
  };
}
