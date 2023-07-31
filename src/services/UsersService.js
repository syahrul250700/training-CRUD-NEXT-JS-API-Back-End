import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as db from "../app/db.js";
import { ErrorResponse } from "../app/error.js";
import { loginUserValidation } from "../validations/UsersValidation.js";
import { validate } from "../app/validate.js";

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn: "1m",
  });
};

const createRefreshToken = (user_name) => {
  return jwt.sign({ username: user_name }, process.env.SECRET_KEY, {
    expiresIn: "10m",
  });
};

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
        const accessToken = createAccessToken(users[0]);
        const refreshToken = createRefreshToken(users[0].user_name);

        return { accessToken, refreshToken };
      }
    } else {
      throw new ErrorResponse(401, "User Tidak ditemukan");
    }
  } catch (error) {
    throw new ErrorResponse(error.status, error);
  }
};

const verify_token = async (accessToken) => {
  try {
    const user = await jwt.verify(
      accessToken,
      process.env.SECRET_KEY,
      (err, decoded) => {
        if (err) {
          let message = "";
          if (err.name == "JsonWebTokenError") {
            message = "Sesi tidak valid";
          } else if (err.name == "TokenExpiredError") {
            message = "Sesi Anda Berakhir, Silahkan Login Kembali";
          }
          throw new ErrorResponse(401, message);
        } else {
          return decoded;
        }
      }
    );
    return user;
  } catch (error) {
    throw new ErrorResponse(error.status, error);
  }
};

const refresh_token = async (refreshToken) => {
  try {
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
  verify_token,
  refresh_token,
  list,
};
