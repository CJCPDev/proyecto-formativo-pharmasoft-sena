import { Router } from "express";
import { saleController } from "./sales.controller.js";


const router = Router();


router.post("/", saleController.create);
router.get("/", saleController.getAll);

router.get("/:id", saleController.getById);

export default router;