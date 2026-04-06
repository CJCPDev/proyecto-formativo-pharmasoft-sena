// src/features/suppliers/supplier.controller.js
// src/features/suppliers/supplier.controller.js


import { supplierService } from "./supplier.service.js";


export const supplierController = {
  async create(req, res) {


    console.log("BODY RECIBIDO:", req.body); // CLAVE


    try {
      const supplier = await supplierService.createSupplier(req.body);


      res.status(201).json({
        message: "Proveedor creado correctamente",
        supplierId: supplier.id,
      });


    } catch (err) {
      console.error("ERROR BACKEND:", err);


      res.status(500).json({
        error: err.message,
      });
    }
  },

    async getAll(req, res) {
    try {
      const suppliers = await supplierService.getAll();

      res.json(suppliers);
    } catch (error) {
      console.error("ERROR BACKEND:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

