import { responseSuccess } from "../helpers/formatResponse.js";
import UsersService from "../services/UsersService.js";

export const loginUsers = async (req, res, next) => {
  try {
    const { access_token, refresh_token, expires_at } =
      await UsersService.login(req.body);
    res.cookie("access_token", access_token, { httpOnly: true });
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: 86400000, //24jam
    });
    res.cookie("expires_at", expires_at, { httpOnly: true });
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
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.clearCookie("expires_at");
    res.status(200).json({
      status: true,
      code: res.statusCode,
      message: `Berhasil Logout User`,
    });
  } catch (error) {
    next(error);
  }
};

export const registrasiUsers = async (req, res, next) => {
  try {
    const users = await UsersService.registrasi(req.body);
    responseSuccess(res, users, "Berhasil Registrasi");
  } catch (error) {
    next(error);
  }
};

export const addUsers = async (req, res, next) => {
  try {
    const users = await UsersService.create(req.body, req.user);
    responseSuccess(res, users, "Berhasil Tambah User");
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await UsersService.list();
    responseSuccess(res, users, `Berhasil Menampilkan Semua User`);
  } catch (error) {
    next(error);
  }
};

export const deleteUsers = async (req, res, next) => {
  try {
    const users = await UsersService.remove(req.params.id);
    responseSuccess(res, users, "Berhasil Hapus User");
  } catch (error) {
    next(error);
  }
};

export const updateUsers = async (req, res, next) => {
  try {
    const users = await UsersService.update(req.body, req.params.id, req.user);
    responseSuccess(res, users, "Berhasil Update User");
  } catch (error) {
    next(error);
  }
};
