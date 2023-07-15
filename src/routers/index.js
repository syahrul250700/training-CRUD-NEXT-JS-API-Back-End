import express from "express";
import users from "./users.js";
import product from "./product.js";

const app = express();

app.route("/").get((req, res) => {
  res.status(200).json({
    status: true,
    code: res.statusCode,
    message: `Welcome to the API ${port}`,
  });
});

app.use("/users", users);
app.use("/product", product);

export default app;
