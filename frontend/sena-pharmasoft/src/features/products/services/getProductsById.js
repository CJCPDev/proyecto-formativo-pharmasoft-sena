import { products } from "@/data/products/products.js"

export const getProductsById = (id) => {
    return products.find(product => product.id == id);
}
