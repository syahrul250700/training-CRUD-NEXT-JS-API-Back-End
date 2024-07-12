import { responseSuccess } from "../helpers/formatResponse.js";
import ProductsService from "../services/ProductsService.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await ProductsService.listProduct();
    responseSuccess(res, products, `Berhasil Menampilkan data produk`);
  } catch (error) {
    next(error);
  }
};
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await ProductsService.listProductById(id);
    responseSuccess(res, product, `Berhasil Menampilkan data produk`);
  } catch {
    next(error);
  }
};

export const addProducts = async (req, res, next) => {
  try {
    const products = await ProductsService.addProduct(req.body, req.user);
    responseSuccess(res, products, `Berhasil Menambahkan data produk`);
  } catch (error) {
    next(error);
  }
};

export const editProducts = async (req, res, next) => {
  // console.log(req.date);
  try {
    const products = await ProductsService.updateProduct(
      req.body,
      req.user,
      req.params.id
    );
    responseSuccess(res, products, `Berhasil Merubah data produk`);
  } catch (error) {
    next(error);
  }
};

export const removeProducts = async (req, res, next) => {
  try {
    const products = await ProductsService.deleteProduct(req.params.id);
    responseSuccess(res, products, `Berhasil Menghapus data produk`);
  } catch (error) {
    next(error);
  }
};
