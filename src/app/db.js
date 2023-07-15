import mysql from "mysql2";
import path from "path";
import * as dotenv from "dotenv";

dotenv.config({
  path:
    process.env.MODE == "production"
      ? path.resolve(process.cwd(), ".env.production")
      : path.resolve(process.cwd(), ".env.development"),
});

export const local = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_LOCAL_HOST,
  port: process.env.DB_LOCAL_PORT,
  user: process.env.DB_LOCAL_USER,
  password: process.env.DB_LOCAL_PASSWORD,
  database: process.env.DB_LOCAL_DATABASE,
});
export const isea = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_ISEA_HOST,
  port: process.env.DB_ISEA_PORT,
  user: process.env.DB_ISEA_USER,
  password: process.env.DB_ISEA_PASSWORD,
  database: process.env.DB_ISEA_DATABASE,
});
