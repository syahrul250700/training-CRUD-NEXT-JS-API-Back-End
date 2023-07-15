import express from "express";
import { getUsers, loginUsers } from "../controllers/UsersController.js";
import { authentication } from "../middlewares/AuthMiddleware.js";

const users = express.Router();

users.get("/", getUsers);
users.post("/login", loginUsers);

export default users;
