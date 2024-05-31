import { responseSuccess } from "../helpers/formatResponse.js";

export const getProduk = async (req, res, next) => {
  try {
    let produk =[]
    responseSuccess(res, produk, `Berhasil Menampilkan data produk`);
  } catch (error) {
    next(error);
  }
};