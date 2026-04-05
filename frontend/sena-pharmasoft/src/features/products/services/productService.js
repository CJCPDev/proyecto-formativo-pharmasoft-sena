import axios from "axios";

const API_URL = "http://localhost:4000/api/productos";

// CREATE
export const createProduct = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

// GET ALL
export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// GET BY ID
export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// UPDATE
export const updateMedicamento = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};