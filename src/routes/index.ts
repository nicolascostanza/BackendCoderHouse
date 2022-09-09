import express from "express";
import productsRoutes from "./products.js";
import cartRoutes from "./cartRoutes.js";

const router = express.Router();

router.use("/products", productsRoutes);
router.use("/carts", cartRoutes);

export default router;
