import express from "express";
import productsRoutes from "./products";

const router = express.Router();

router.use("/products", productsRoutes);

export default router;
