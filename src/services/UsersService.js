import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as db from "../app/db.js";
import { ErrorResponse } from "../app/error.js";
import { loginUserValidation } from "../validations/UsersValidation.js";
import { validate } from "../app/validate.js";

const login = async (req) => {
  const input = validate(loginUserValidation, req); //validasi input
  try {
    const [users] = await db.local
      .promise()
      .query("SELECT * FROM users WHERE user_name = ?", [input.username]);

    if (users.length > 0) {
      //jika data user sudah ada cek password
      var passwordIsValid = bcrypt.compareSync(
        input.password,
        users[0].password
      );
      if (!passwordIsValid) {
        // jika password salah
        throw new ErrorResponse(401, "Password salah");
      } else {
        const token = jwt.sign(users[0], process.env.SECRET_KEY, {
          expiresIn: "1m",
        });

        return token;
      }
    } else {
      throw new ErrorResponse(401, "User Tidak ditemukan");
    }
  } catch (error) {
    throw new ErrorResponse(error.status, error);
  }
};

const list = async () => {
  try {
    let sql = "SELECT * FROM users";
    const [results] = await db.local.promise().query(sql);
    if (results.length == 0) {
      throw new ErrorResponse(404, "Data user tidak ada");
    }
    return results;
  } catch (error) {
    throw new ErrorResponse(error.status, error);
  }
};

export default {
  login,
  list,
};
