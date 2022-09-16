import express from "express";
import cartControllers from "../controllers/cart/index.js";
const routerProducts = express.Router();
routerProducts
    .get("/:id/productos", cartControllers.getProductsInCart)
    .post("/", cartControllers.createCart)
    .post("/:id/productos/:idProd", cartControllers.addProductToCart)
    .delete("/:id/productos/:idProd", cartControllers.deleteProductFromCart)
    .delete("/:id", cartControllers.deleteCart);
export default routerProducts;
