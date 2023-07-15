import { responseSuccess } from "../helpers/formatResponse.js";
import UserService from "../services/UsersService.js";

export const loginUsers = async (req, res, next) => {
  try {
    const token = await UserService.login(req.body);
    res.status(200).json({
      status: true,
      code: res.statusCode,
      message: `Berhasil Login User`,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await UserService.list();
    responseSuccess(res, users, `Berhasil Menampilkan Semua User`);
  } catch (error) {
    next(error);
  }
};
