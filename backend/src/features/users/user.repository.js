// src/features/users/user.repository.js


import { pool } from "../../config/db.js";


export const userRepository = {
  async create(userData) {
    const {
      name,
      userEmail,
      phone,
      phoneAdicional,
      documentType,
      documentNumber,
      userGroup,
      direccion,
      avatarUrl,
      fechaInicio,
      fechaFin,
    } = userData;


    const query = `
      INSERT INTO users (
        name,
        user_email,
        phone,
        phone_adicional,
        document_type,
        document_number,
        user_group,
        direccion,
        avatar_url,
        fecha_inicio,
        fecha_fin
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING id;
    `;


    const values = [
      name,
      userEmail,
      phone,
      phoneAdicional || null,
      documentType,
      documentNumber,
      userGroup,
      direccion,
      avatarUrl || null,
      fechaInicio || null,
      fechaFin || null,
    ];


    const result = await pool.query(query, values);


    return result.rows[0];
  },
};
