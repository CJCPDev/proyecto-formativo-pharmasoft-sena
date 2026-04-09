import { pool } from "../../config/db.js";


export const supplierRepository = {
  async create(supplierData) {

    const {
      nit,
      nombre,
      razonSocial,
      direccion,
      correo,
      telContacto,
      estado,
      ciudad,
      nombreContacto
    } = supplierData;


    const query = `
      INSERT INTO suppliers (
        nit,
        nombre,
        razon_social,
        direccion,
        correo,
        tel_contacto,
        estado,
        ciudad,
        nombre_contacto
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING id;
    `;


    const values = [
      nit,
      nombre,
      razonSocial,
      direccion,
      correo,
      telContacto,
      estado, 
      ciudad,
      nombreContacto
    ];


    const result = await pool.query(query, values);
    return result.rows[0];

  },
  async getAll() {
    const result = await pool.query("SELECT id, razon_social AS razonSocial, tel_contacto AS telContacto, correo, ciudad, estado FROM suppliers")
    return result.rows;
  },
};