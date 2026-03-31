import pool from '../../config/db.js';

export async function createProducto(data) {
  const query = `
    INSERT INTO productos 
    (nombre_medicamento, lote, forma_farmaceutica, fecha_fabricacion, fecha_vencimiento,
     via_administracion, laboratorio, concentracion, proveedor, stock,
     precio_costo, precio_venta, requiere_formula, estado, descripcion, fecha_creacion)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,NOW())
    RETURNING *;
  `;
  const values = [
    data.nombre_medicamento, data.lote, data.forma_farmaceutica, data.fecha_fabricacion,
    data.fecha_vencimiento, data.via_administracion, data.laboratorio,
    data.concentracion, data.proveedor, data.stock, data.precio_costo,
    data.precio_venta, data.requiere_formula, data.estado, data.descripcion
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
}
