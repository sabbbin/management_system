import { BaseDatabase } from "./base-service";

export class AuthService extends BaseDatabase {
  findUserById = async (username: string) => {
    console.log("user", username);
    const loginQuery =
      "Select id, first_name, last_name, role_id , password from users where phone=$1";
    const user = (await this.rawQuery(loginQuery, ["0000000000"])) as any;
    if (!user || user.length == 0) {
      return null;
    }
    return user[0];
  };
}
