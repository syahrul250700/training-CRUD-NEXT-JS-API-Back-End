import express from "express";
import users from "./users.js";
import product from "./product.js";
import warehouse from "./warehouse.js";
import produk from "./produk.js";

const app = express();

app.route("/").get((req, res) => {
  res.status(200).json({
    status: true,
    code: res.statusCode,
    message: `Server API mode ${process.env.MODE} is running on ${process.env.HOST}:${process.env.PORT}`,
  });
});

app.use("/users", users);
app.use("/product", product);
app.use("/warehouse", warehouse);
app.use("/produk", produk);
// tes
//pokayoke
// SASASA

export default app;
