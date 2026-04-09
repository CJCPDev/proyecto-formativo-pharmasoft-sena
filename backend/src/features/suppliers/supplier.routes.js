import { Router } from "express";
import { supplierController } from "./supplier.controller.js";


const router = Router();


router.post("/", supplierController.create);
router.get("/", supplierController.getAll);

export default router;