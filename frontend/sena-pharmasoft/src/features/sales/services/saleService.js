import axios from "axios";

const API_URL = "http://localhost:8000/api/ventas/";

export const getVentas = async () => {
  const response = await axios.get(API_URL);
  return response.data; 
};

export const updateSaleStatus = async (id, is_active) => {
  const response = await axios.patch(`${API_URL}${id}/`, {
    is_active: is_active,
  });

  return response.data;
};

export const createSale = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error creando venta:", error);
    throw error;
  }
};

