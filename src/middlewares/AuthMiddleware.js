import jwt from "jsonwebtoken";
import { ErrorResponse } from "../app/error.js";

export const authentication = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    throw new ErrorResponse(401, "Anda Belum Login");
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        let message = "";
        if (err.name == "JsonWebTokenError") {
          message = "Sesi tidak valid";
        } else if (err.name == "TokenExpiredError") {
          message = "Sesi Anda Berakhir, Silahkan Login Kembali";
        }
        throw new ErrorResponse(401, message);
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};
