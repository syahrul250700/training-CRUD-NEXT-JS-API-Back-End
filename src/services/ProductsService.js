import * as db from "../app/db.js";
import { ErrorResponse } from "../app/error.js";

const listProduct = async () => {
  try {
    let sql = "SELECT * FROM products";
    let [result] = await db.local.promise().query(sql);
    if (result.length == 0) {
      throw new ErrorResponse(404, "Data Prouk Tidak ada");
    }
    return result;
  } catch (error) {
    throw new ErrorResponse(error.status, error);
  }
};
const listProductById = async (id) => {
  try {
    const [products] = await db.local
      .promise()
      .query("SELECT * FROM products WHERE product_id=?", [id]);
    if (products.length == 0) {
      throw new ErrorResponse(404, "Data Prouk Tidak ada");
    } else {
      return products;
    }
  } catch {
    throw new ErrorResponse(error.status, error);
  }
};
const addProduct = async (req, user) => {
  const input = req;
  console.log(req);
  try {
    const [products] = await db.local
      .promise()
      .query("SELECT * FROM products WHERE name_Product=?", [
        input.name_Product,
      ]);
    if (products.length > 0) {
      throw new ErrorResponse(400, " Data Produk Sudah Ada");
    } else {
      let data = {
        name_Product: input.name_Product,
        description: input.description,
        price: input.price,
        quantity: input.quantity,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const [createProduct] = await db.local
        .promise()
        .query("INSERT INTO products SET ?", [data]);
      return createProduct;
    }
  } catch (error) {
    throw new ErrorResponse(error.status, error);
  }
};
const updateProduct = async (input, user, id) => {
  // console.log(input);
  try {
    const [products] = await db.local
      .promise()
      .query("SELECT * FROM products WHERE product_id=?", [id]);
    // console.log(products);
    if (products.length > 0) {
      let date = new Date();
      const [editProduct] = await db.local
        .promise()
        .query(
          "UPDATE products SET name_Product=?, description=?, price=?, quantity=?, updatedAt=? WHERE product_id=?",
          [
            input.name_Product,
            input.description,
            input.price,
            input.quantity,
            date,
            id,
          ]
        );
      return editProduct;
    }
  } catch (error) {
    throw new ErrorResponse(400, " Data Produk Tidak Ditemukan");
  }
};
const deleteProduct = async (id) => {
  try {
    const [products] = await db.local
      .promise()
      .query("SELECT * FROM products WHERE product_id=?", [id]);
    if (products.length > 0) {
      const [removeProduct] = await db.local
        .promise()
        .query("DELETE FROM products WHERE product_id=?", [id]);
      return removeProduct;
    }
  } catch (error) {
    throw new ErrorResponse(error.status, error);
  }
};

export default {
  listProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  listProductById,
};
