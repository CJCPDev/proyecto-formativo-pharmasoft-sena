import { addProducto } from "./product.service.js";

export const productController = {
  create: async (req, res) => {
    try {
      const producto = await addProducto(req.body);
      res.status(201).json(producto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
