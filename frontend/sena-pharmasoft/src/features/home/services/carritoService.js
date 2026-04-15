// ─────────────────────────────────────────────
// carritoService.js
// Servicio para manejar el carrito de compras
// Se conecta con la API de Django
// ─────────────────────────────────────────────

import axios from "axios";

const API_URL = "http://localhost:8000/api";

// Obtiene todos los items del carrito de un usuario
export const obtenerCarrito = async (idUsuario) => {
  const response = await axios.get(`${API_URL}/carrito/${idUsuario}/`);
  return response.data;
};

export const agregarAlCarrito = async (
  idUsuario,
  idMedicamento,
  cantidad,
  precioUnitario,
  estado = "activo",
) => {
  const response = await axios.post(`${API_URL}/carrito/agregar/`, {
    id_usuario: idUsuario,
    id_medicamento: idMedicamento,
    cantidad,
    precio_unitario: precioUnitario,
    estado,
  });
  return response.data;
};

// Actualiza la cantidad de un item del carrito
export const actualizarCantidad = async (idCarrito, cantidad) => {
  const response = await axios.patch(
    `${API_URL}/carrito/${idCarrito}/actualizar/`,
    {
      cantidad,
    },
  );
  return response.data;
};

// Elimina un item del carrito
export const eliminarDelCarrito = async (idCarrito) => {
  const response = await axios.delete(
    `${API_URL}/carrito/${idCarrito}/eliminar/`,
  );
  return response.data;
};

// Vacía el carrito de un usuario
export const vaciarCarrito = async (idUsuario) => {
  const response = await axios.delete(
    `${API_URL}/carrito/${idUsuario}/vaciar/`,
  );
  return response.data;
};

//Obtiene todos los carritos - solo para administrador
