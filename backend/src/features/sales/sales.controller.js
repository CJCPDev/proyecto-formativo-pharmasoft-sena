import {saleService} from "./sales.service.js";

export const saleController = {
  async create(req, res) {
    console.log("BODY RECIBIDO:", req.body);

    try {
      const sale = await saleService.createSale(req.body);

      res.status(201).json({
        message: "venta creada correctamente",
        saleId: sale.id,
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
      const sale = await saleService.getAll();

      res.json(sale);
    } catch (error) {
      console.error("🔥 ERROR BACKEND:", error);
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const sale = await saleService.getById(req.params.id);
      res.json(sale);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};