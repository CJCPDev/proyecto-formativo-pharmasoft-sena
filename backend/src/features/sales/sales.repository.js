import { pool } from "../../config/db.js";

export const saleRepository = {

  // 🔥 CREAR VENTA
  async createSale(saleData) {
    const {
      usuario,
      farmaceuta,
      sellStates,
      paymentStates,
      created_at
    } = saleData;

    const query = `
      INSERT INTO sales (
        usuario,
        farmaceuta,
        sell_state,
        payment_state,
        created_at
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [
      usuario,
      farmaceuta,
      sellStates,
      paymentStates,
      created_at
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },



  async getAll() {
    const result = await pool.query("SELECT * FROM public.sales");
    console.log("VENTAS DB 👉", result.rows);
    return result.rows;
  },

  async getSaleById(id) {
    const result = await pool.query(
      "SELECT * FROM sales WHERE id = $1",
      [id]
    );
    return result.rows[0];
  }
};