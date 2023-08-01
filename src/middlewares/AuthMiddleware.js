import { ErrorResponse } from "../app/error.js";
import UsersService from "../services/UsersService.js";

export const authentication = async (req, res, next) => {
  let accessToken = req.cookies.access_token;
  let refreshToken = req.cookies.refresh_token;
  let expiresAt = req.cookies.expires_at;
  try {
    if (!accessToken) {
      throw new ErrorResponse(401, "Anda Belum Login");
    } else if (accessToken && Date.now() < expiresAt) {
      const user = await UsersService.verify_token(accessToken);
      req.user = user;
      next();
    } else {
      const { access_token, refresh_token, expires_at } =
        await UsersService.refresh_token(refreshToken);
      res.cookie("access_token", access_token, { httpOnly: true });
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        maxAge: 120000,
      });
      res.cookie("expires_at", expires_at, { httpOnly: true });
      const user_refresh = await UsersService.verify_token(access_token);
      req.user = user_refresh;
      next();
    }
  } catch (error) {
    next(error);
  }
};
