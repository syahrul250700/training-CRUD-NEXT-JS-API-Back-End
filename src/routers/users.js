import express from "express";
import {
  getUsers,
  loginUsers,
  logoutUsers,
} from "../controllers/UsersController.js";
import { authentication } from "../middlewares/AuthMiddleware.js";

const users = express.Router();

users.get("/", authentication, getUsers);
users.post("/login", loginUsers);
users.post("/logout", logoutUsers);

export default users;
