// src/features/product/services/productService.js

const API_URL = "http://localhost:4000/api/productos";

export async function createProduct(productData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Error al crear producto");
    }

    return response.json();
    }

    export async function getProducts() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Error al obtener productos");
    }

    return response.json();
    }

    export async function getProductById(id) {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error("Error al obtener producto");
    }

    return response.json();
}
