import axios from "axios";

const suppliersApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/suppliers/"
});

export const getAllSuppliers = async () => {
  const response = await suppliersApi.get("/");
  return response.data;
};

export const getSupplierById = async (id) => {
  const response = await suppliersApi.get(`/${id}/`);
  return response.data;
};

export const createSupplier = async (supplier) => {
 
    const response = await suppliersApi.post("/", supplier);
    return response.data;
 
};

export const updateSupplier = async (id, supplier) => {
  
    const response = await suppliersApi.put(`/${id}/`, supplier);
    return response.data;
  
};