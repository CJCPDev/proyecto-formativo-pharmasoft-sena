import { productRepository } from "./product.repository.js";

export const productService = {

  async createProduct(data) {
    return await productRepository.create(data);
  },

  async getAll() {
    return await productRepository.getAll();
  },

  async getProductById(id) {
    return await productRepository.getById(id);
  }

};