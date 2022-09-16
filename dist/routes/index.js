import express from "express";
import productsRoutes from "./products.js";
import cartRoutes from "./cartRoutes.js";
const router = express.Router();
router.use("/productos", productsRoutes);
router.use("/carrito", cartRoutes);
export default router;
