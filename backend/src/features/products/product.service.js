// src/features/products/product.service.js
import { productRepository } from "./product.repository.js";


export const productService = {
    async createProduct(data) {
        return await productRepository.create(data);
    },
};
