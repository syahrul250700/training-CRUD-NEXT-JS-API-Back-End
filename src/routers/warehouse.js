import express from "express";
import { getUsers, loginUsers } from "../controllers/UsersController.js";
import { authentication } from "../middlewares/AuthMiddleware.js";

const product = express.Router();

product.get("/", (req, res) => {
  res.status(200).json({ status: "oke" });
});

product.get("/:id", (req, res) => {
  res.status(200).json({ status: req.params.id });
});

product.post("/", (req, res) => {
  res.status(200).json({ status: req.body.id });
});

export default warehouse;
