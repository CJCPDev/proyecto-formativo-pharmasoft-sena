import { createProducto } from './product.repository.js';

export async function addProducto(data) {
  return await createProducto(data);
}
