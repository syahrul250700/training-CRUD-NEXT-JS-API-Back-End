import { api } from "./app/api.js";
import { logger } from "./app/log.js";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(process.cwd(), ".env." + process.env.MODE),
});

api.listen(process.env.PORT, () => {
  logger.info(
    `Server API mode ${process.env.MODE} is running on ${process.env.HOST}:${process.env.PORT} `
  );
});
