import express from "express";
import {
  addProducts,
  editProducts,
  getProductById,
  getProducts,
  removeProducts,
} from "../controllers/ProductsController.js";

const products = express.Router();

products.get("/", getProducts);
products.post("/", addProducts);
products.get("/:id", getProductById);
products.put("/:id", editProducts);
products.delete("/:id", removeProducts);

export default products;
