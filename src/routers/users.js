import express from "express";
import {
  addUsers,
  deleteUsers,
  getUsers,
  loginUsers,
  logoutUsers,
  registrasiUsers,
  updateUsers,
} from "../controllers/UsersController.js";
import { authentication } from "../middlewares/AuthMiddleware.js";

const users = express.Router();

users.get("/", getUsers);
users.post("/", addUsers);
users.delete("/:id", deleteUsers);
users.put("/:id", updateUsers);
users.post("/login", loginUsers);
users.post("/logout", logoutUsers);
users.post("/registrasi", registrasiUsers);

export default users;
