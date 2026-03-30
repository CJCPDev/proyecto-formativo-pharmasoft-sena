// src/features/product/product.repository.js

import { pool } from "../../config/db.js";

export const productRepository = {
    async create(productData) {
        const {
            nombre,
            descripcion,
            precio,
            stock
        } = productData;

        const query = `
        INSERT INTO productos (
            nombre,
            descripcion,
            precio,
            stock
        )
        VALUES ($1, $2, $3, $4)
        RETURNING id;
        `;

        const values = [nombre, descripcion, precio, stock];

        const result = await pool.query(query, values);

        return result.rows[0];
    },

    async findAll() {
        const query = `SELECT * FROM productos;`;
        const result = await pool.query(query);
        return result.rows;
    },

    async findById(id) {
        const query = `SELECT * FROM productos WHERE id = $1;`;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
};
