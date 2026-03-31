// ─────────────────────────────────────────────
// usuarioService.js
// Servicio que centraliza todas las peticiones
// HTTP a la API de Django para el módulo de usuarios
// ─────────────────────────────────────────────

import axios from "axios";

// URL base de la API de Django
const API_URL = "http://localhost:8000/api";

// Obtiene la lista completa de usuarios
//Si se pasa un idROl, filtra por ese rol
//El farmaceuta usa esto para ver solo clientes
export const getUsuarios = async (idRol = null) => {
  const params = idRol ? `?rol=${idRol}` :  '';
  const response = await axios.get(`${API_URL}/usuarios/${params}`);
  return response.data;
};

// Obtiene un usuario específico por su ID
export const getUsuario = async (id) => {
  const response = await axios.get(`${API_URL}/usuarios/${id}/`);
  return response.data;
};

// Crea un nuevo usuario enviando los datos del formulario
export const createUsuario = async (formData) => {
  const response = await axios.post(`${API_URL}/usuarios/`, formData);
  return response.data;
};

// Actualiza los datos de un usuario existente por su ID
export const updateUsuario = async (id, formData) => {
  const response = await axios.put(`${API_URL}/usuarios/${id}/`, formData);
  return response.data;
};

// Elimina un usuario por su ID
export const deleteUsuario = async (id) => {
  const response = await axios.delete(`${API_URL}/usuarios/${id}/`);
  return response.data;
};

// Obtiene los tipos de documento desde la API para poblar el Select
export const getTiposDocumento = async () => {
  const response = await axios.get(`${API_URL}/tipo-documento/`);
  return response.data;
};

// Obtiene los roles desde la API para poblar el Select de grupo de usuario
export const getRoles = async () => {
  const response = await axios.get(`${API_URL}/roles/`);
  return response.data;
};

// Sube la imagen del avatar al servidor Django
// Retorna la URL de la imagen guardada
export const subirAvatar = async (archivo) => {
  const formData = new FormData();
  formData.append("avatar", archivo);
  const response = await axios.post(`${API_URL}/subir-avatar/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.url;
};

// Cambia el estado de un usuario (activo/inactivo)
export const cambiarEstadoUsuario = async (id, idEstado) => {
  const response = await axios.patch(`${API_URL}/usuarios/${id}/cambiar-estado/`, {
    id_estado_usuario: idEstado
  });
  return response.data;
};