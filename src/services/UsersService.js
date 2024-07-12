import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as db from "../app/db.js";
import { ErrorResponse } from "../app/error.js";
import {
  addUserValidation,
  loginUserValidation,
} from "../validations/UsersValidation.js";
import { validate } from "../app/validate.js";

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn: "1m",
  });
};

const createRefreshToken = (username) => {
  return jwt.sign({ username: username }, process.env.SECRET_KEY, {
    expiresIn: "24h", //24jam dari waktu refresh token
  });
};

const verify_token = async (access_token) => {
  try {
    const user = await jwt.verify(
      access_token,
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
  if (refreshToken) {
    try {
      const token = await verify_token(refreshToken);
      // console.log(token)
      const [users] = await db.local
        .promise()
        .query("SELECT * FROM users WHERE username = ?", [token.username]);
      if (users.length > 0) {
        const access_token = createAccessToken(users[0]);
        const user = await verify_token(access_token);
        const expires_at = user.exp * 1000;
        const refresh_token = createRefreshToken(users[0].username);
        return { access_token, refresh_token, expires_at };
      } else {
        throw new ErrorResponse(400, "User tidak ditemukan");
      }
    } catch (error) {
      throw new ErrorResponse(error.status, error);
    }
  } else {
    throw new ErrorResponse(401, "Gagal refresh token, Silahkan login kembali");
  }
};

const login = async (req) => {
  const input = validate(loginUserValidation, req); //validasi input
  try {
    const [users] = await db.local
      .promise()
      .query("SELECT * FROM users WHERE username = ?", [input.username]);

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
        const access_token = createAccessToken(users[0]);
        const user = await verify_token(access_token);
        const expires_at = user.exp * 1000;
        const refresh_token = createRefreshToken(users[0].username);

        return { access_token, refresh_token, expires_at };
      }
    } else {
      throw new ErrorResponse(401, "User Tidak ditemukan");
    }
  } catch (error) {
    throw new ErrorResponse(error.status, error);
  }
};

const registrasi = async (req) => {
  const input = validate(addUserValidation, req); //validasi input
  let hashedPassword = bcrypt.hashSync(input.password, 8);
  try {
    const [users] = await db.local
      .promise()
      .query("SELECT * FROM users WHERE username = ?", [input.username]);
    if (users.length > 0) {
      throw new ErrorResponse(400, "User sudah ada");
    } else {
      // jika user belum ada maka insert user
      let data = {
        username: input.username,
        password: hashedPassword,
        created_by: input.username,
      };
      const [addUser] = await db.local
        .promise()
        .query("INSERT INTO users SET ?", [data]);
      return addUser;
    }
  } catch (error) {
    throw new ErrorResponse(error.status, error);
  }
};

const create = async (req, user) => {
  // console.log(user)
  const input = validate(addUserValidation, req); //validasi input
  let hashedPassword = bcrypt.hashSync(input.password, 8);
  try {
    const [users] = await db.local
      .promise()
      .query("SELECT * FROM users WHERE username = ?", [input.username]);
    if (users.length > 0) {
      throw new ErrorResponse(400, "User sudah ada");
    } else {
      // jika user belum ada maka insert user
      let data = {
        username: input.username,
        password: hashedPassword,
        // created_by: user.username,
      };
      const [addUser] = await db.local
        .promise()
        .query("INSERT INTO users SET ?", [data]);
      return addUser;
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

const remove = async (id) => {
  // console.log(user)
  try {
    const [users] = await db.local
      .promise()
      .query("SELECT * FROM users WHERE user_id = ?", [id]);
    if (users.length > 0) {
      const [delUser] = await db.local
        .promise()
        .query("DELETE FROM users WHERE user_id = ?", [id]);
      return delUser;
    } else {
      throw new ErrorResponse(400, "Data user tidak ditemukan");
    }
  } catch (error) {
    throw new ErrorResponse(error.status, error);
  }
};

const update = async (input, id, user) => {
  // console.log(user)
  try {
    const [users] = await db.local
      .promise()
      .query("SELECT * FROM users WHERE user_id = ?", [id]);
    if (users.length > 0) {
      const [updateUser] = await db.local
        .promise()
        .query("UPDATE users SET username=? , created_by=? WHERE user_id=?", [
          input.username,
          user.username,
          id,
        ]);
      return updateUser;
    } else {
      throw new ErrorResponse(400, "Data user tidak ditemukan");
    }
  } catch (error) {
    throw new ErrorResponse(error.status, error);
  }
};

export default {
  verify_token,
  refresh_token,
  login,
  registrasi,
  create,
  list,
  remove,
  update,
};
