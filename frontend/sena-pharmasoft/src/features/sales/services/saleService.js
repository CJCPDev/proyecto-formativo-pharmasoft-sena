import axios from "axios";

const API_URL = "http://localhost:4000/api";

// ✔ Obtener usuarios
export const getSales = async () => {
  const res = await axios.get(`${API_URL}/sale`);
  return res.data; // ✅ SOLO LOS DATOS
};

// ✔ Crear usuario
export const createSale = async (formData) => {
  const response = await axios.post(`${API_URL}/sale`, formData);
  return response.data;
};

export const getSale = async (id) => {
  const response = await axios.get(`http://localhost:4000/api/sale/${id}`);
  return response.data;
};
