import express from "express";
import productControllers from "../controllers/products/index.js";
const routerProducts = express.Router();
routerProducts
    .get("/:id?", productControllers.getProducts)
    .post("/", productControllers.addProduct)
    .put("/:id", productControllers.updateProduct)
    .delete("/:id", productControllers.deleteProduct);
export default routerProducts;
