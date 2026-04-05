import { pool } from "../../config/db.js";

export const productRepository = {
  async create(productData) {
    const {
      nombreMedicamento,
      lote,
      forma_farmaceutica,
      fecha_fabricacion,
      fecha_vencimiento,
      via_administracion,
      laboratorio,
      concentracion,
      proveedor,
      stock,
      precio_costo,
      precio_venta,
      requiere_formula,
      estado,
      descripcion
    } = productData;

    const query = `
      INSERT INTO productos (
        nombreMedicamento,
        lote,
        forma_farmaceutica,
        fecha_fabricacion,
        fecha_vencimiento,
        via_administracion,
        laboratorio,
        concentracion,
        proveedor,
        stock,
        precio_costo,
        precio_venta,
        requiere_formula,
        estado,
        descripcion
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
      RETURNING id;
    `;

    const values = [
      nombreMedicamento,
      lote,
      forma_farmaceutica,
      fecha_fabricacion,
      fecha_vencimiento,
      via_administracion,
      laboratorio,
      concentracion,
      proveedor,
      stock,
      precio_costo,
      precio_venta,
      requiere_formula,
      estado,
      descripcion
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async getAll() {
    const result = await pool.query("SELECT * FROM public.productos");
    return result.rows;
  },

  
async getById(id) {
  const result = await pool.query(
    "SELECT * FROM productos WHERE id = $1",
    [id]
  );
  return result.rows[0];
}
};
