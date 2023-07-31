import { ErrorResponse } from "../app/error.js";
import UsersService from "../services/UsersService.js";

export const authentication = async (req, res, next) => {
  let accessToken = req.cookies.accessToken;
  try {
    if (!accessToken) {
      throw new ErrorResponse(401, "Anda Belum Login");
    } else {
      const user = await UsersService.verify_token(accessToken);
      req.user = user;
      next();
    }
  } catch (error) {
    next(error);
  }
};
