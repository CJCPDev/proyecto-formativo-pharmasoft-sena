// ─────────────────────────────────────────────
// usuarioService.js (LIMPIO - SOLO EXPRESS)
// ─────────────────────────────────────────────

import axios from "axios";

const API_URL = "http://localhost:4000/api";

// ✔ Obtener usuarios
export const getUsuarios = async () => {
  const response = await axios.get(`${API_URL}/users`);

  return response.data.map((u) => ({
    id: u.id,
    name: u.name,
    userGroup: u.user_group,
    documentType: u.document_type,
    documentNumber: u.document_number,
    userEmail: u.user_email,
    phone: u.phone,
    is_active: u.is_active,
  }));
};

// ✔ Crear usuario
export const createUsuario = async (formData) => {
  const response = await axios.post(`${API_URL}/users`, formData);
  return response.data;
};

export const getUsuario = async (id) => {
  const response = await axios.get(`http://localhost:4000/api/users/${id}`);
  return response.data;
};

