import { responseSuccess } from "../helpers/formatResponse.js";
import UserService from "../services/UsersService.js";

export const loginUsers = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await UserService.login(req.body);
    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    res.status(200).json({
      status: true,
      code: res.statusCode,
      message: `Berhasil Login User`,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUsers = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({
      status: true,
      code: res.statusCode,
      message: `Berhasil Logout User`,
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
