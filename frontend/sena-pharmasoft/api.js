import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

export const getLaboratorios = () => axios.get(`${API_URL}laboratorios/`);
export const getProveedores = () => axios.get(`${API_URL}proveedores/`);
export const getMedicamentos = () => axios.get(`${API_URL}medicamentos/`);
export const createMedicamento = (data) =>
  axios.post(`${API_URL}medicamentos/`, data);
