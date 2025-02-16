import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();
export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private client: Client;
  private isConnected: boolean = false;

  private constructor() {
    this.client = new Client({
      user: "postgres",
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: "root",
      port: Number(process.env.DB_PORT),
    });
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async getClient(): Promise<Client> {
    if (!this.isConnected) {
      try {
        await this.client.connect();
        this.isConnected = true;
        console.log("Database connected successfully");
      } catch (err) {
        console.error("Database connection error", err);
        throw err;
      }
    }
    return this.client;
  }

  public async disconnect(): Promise<void> {
    if (this.isConnected) {
      try {
        await this.client.end();
        this.isConnected = false;
        console.log("Database disconnected successfully");
      } catch (err) {
        console.error("Database disconnection error", err);
        throw err;
      }
    }
  }
}
