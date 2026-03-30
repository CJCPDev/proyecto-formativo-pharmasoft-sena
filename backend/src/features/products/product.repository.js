// src/features/product/product.repository.js


import { pool } from "../../config/db.js";


export const productRepository = {
    async create(productData) {
        const {
        name,
        userEmail,
        phone,
        documentType,
        documentNumber,
        password,
        avatarUrl,
        isStaff,
        isActive,
        isSuperuser,
        } = userData;


        const query = `
        INSERT INTO users (
            product_name,
            product_email,
            user_phone,
            document_type,
            document_number,
            password,
            avatar_url,
            is_staff,
            is_active,
            is_superuser
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        RETURNING id;
        `;


        const values = [
        name,
        userEmail,
        phone,
        documentType,
        documentNumber,
        password,
        avatarUrl,
        isStaff,
        isActive,
        isSuperuser,
        ];


        const result = await pool.query(query, values);


        return result.rows[0];
    },
};
