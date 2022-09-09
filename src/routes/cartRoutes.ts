import express from "express";
import cartControllers from "../controllers/cart/index.js";

const routerProducts = express.Router();

routerProducts
	.get("/:id/products", cartControllers.getProductsInCart)
  .post("/", cartControllers.createCart)
  .post("/:id/products/:idProd", cartControllers.addProductToCart)
  .delete("/:id/products/:idProd", cartControllers.deleteProductFromCart)
  .delete("/:id", cartControllers.deleteCart);

export default routerProducts;
