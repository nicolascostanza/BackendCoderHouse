import express from "express";
import * as productControllers from "../controllers/products/index.js";

const routerProducts = express.Router();

routerProducts
  .get("/", productControllers.getAllProducts)
  .get("/:id", productControllers.getById)
  .post("/", productControllers.createProduct)
  .put("/:id", productControllers.putById)
  .delete("/:id", productControllers.deleteProduct);

export default routerProducts;
