import express from "express";
import { getProduk } from "../controllers/ProdukController.js";

const produk = express.Router();

produk.get("/", getProduk);

export default produk;