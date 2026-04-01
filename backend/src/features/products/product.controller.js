import { productService } from "./product.service.js";

export const productController = {
  async create(req, res) {
    console.log("BODY RECIBIDO:", req.body); // Para validar lo que llega del formulario

    try {
      const product = await productService.createProduct(req.body);

      res.status(201).json({
        message: "Producto creado correctamente",
        productId: product.id,
      });

    } catch (err) {
      console.error("ERROR BACKEND:", err);

      res.status(500).json({
        error: err.message,
      });
    }
  },

  async list(req, res) {
    try {
      const products = await productService.getProducts();
      res.json(products);
    } catch (err) {
      console.error("ERROR BACKEND:", err);

      res.status(500).json({
        error: err.message,
      });
    }
  }
};
