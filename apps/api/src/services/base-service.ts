import { Client, QueryResultRow, QueryResult } from "pg";
import { DatabaseConnection } from "../db/postgres";

export class BaseDatabase {
  private database: Client;

  async rawQuery<T extends QueryResultRow>(
    text: string,
    params?: any[],
  ): Promise<T[]> {
    try {
      if (!this.database) {
        this.database = await DatabaseConnection.getInstance().getClient();
      }

      const result: QueryResult<T> = await this.database.query<T>(text, params);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
}
