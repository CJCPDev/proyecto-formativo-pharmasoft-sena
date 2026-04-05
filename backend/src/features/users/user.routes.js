// src/features/users/user.routes.js
import { Router } from "express";
import { userController } from "./user.controller.js";

const router = Router();

router.post("/", userController.create);

// ✅ AGREGADO (esto faltaba)
router.get("/", userController.getAll);

router.get("/:id", userController.getById);

export default router;