import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({}),
    // new winston.transports.File({ level: "error", filename: "logs/error.log" }),
    new DailyRotateFile({
      filename: "logs/all/all-%DATE%.log",
      maxFiles: "14d", //lama file log disimpan 14 hari
      maxSize: "1m", //besar  maksimal file 1m jika lebih maka mebuat file log baru
    }),
    new DailyRotateFile({
      level: "error",
      filename: "logs/error/error-%DATE%.log",
      maxFiles: "14d", //lama file log disimpan
    }),
  ],
});
