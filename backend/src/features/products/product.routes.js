// src/features/products/product.routes.js
import { Router } from "express";
import { productController } from "./product.controller.js";


const router = Router();


router.post("/", productController.create);


export default router;
