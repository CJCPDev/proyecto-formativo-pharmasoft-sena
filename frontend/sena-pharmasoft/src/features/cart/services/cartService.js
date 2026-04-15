// ─────────────────────────────────────────────
// cartService.js
// Servicio para manejar el módulo de carritos
// para administrador y farmaceuta
// ─────────────────────────────────────────────

import axios from "axios";

const API_URL = "http://localhost:8000/api";

//Obtiene todos los carritos
export const getCarritos = async () => {
  const response = await axios.get(`${API_URL}/carrito/`);
  return response.data;
};

//Obtiene un carrito por ID
export const getCarrito = async (id) => {
  const response = await axios.get(`${API_URL}/carrito/${id}/detalle/`);
  return response.data;
};

//Crea un nuevo carrito
export const createCarrito = async (data) => {
  const response = await axios.post(`${API_URL}/carrito/agregar/`, data);
  return response.data;
};

//Actualiza un carrito
export const updateCarrito = async (id, data) => {
  const response = await axios.patch(
    `${API_URL}/carrito/${id}/actualizar-carrito/`,
    data,
  );
  return response.data;
};
