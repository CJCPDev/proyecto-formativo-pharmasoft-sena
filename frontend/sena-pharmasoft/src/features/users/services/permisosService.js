// ─────────────────────────────────────────────
// permisosService.js
// Servicio que centraliza todas las peticiones
// HTTP a la API de Django para el módulo de permisos
// ─────────────────────────────────────────────

import axios from "axios";

const API_URL = "http://localhost:8000/api";

// Obtiene todos los permisos disponibles en el sistema
export const getPermisos = async () => {
  const response = await axios.get(`${API_URL}/permisos/`);
  return response.data;
};

// Obtiene los permisos asignados a un rol específico
export const getPermisosPorRol = async (idRol) => {
  const response = await axios.get(`${API_URL}/rol-permisos/?rol=${idRol}`);
  return response.data;
};

// Guarda todos los permisos de un rol de una sola vez
export const guardarPermisosRol = async (idRol, permisos) => {
  const response = await axios.post(
    `${API_URL}/rol-permisos/guardar_permisos/`,
    {
      id_rol: idRol,
      permisos: permisos, // array de IDs de permisos
    },
  );
  return response.data;
};

// Obtiene los permisos asignados a un usuario individual
export const getPermisosPorUsuario = async (idUsuario) => {
  const response = await axios.get(
    `${API_URL}/usuario-permisos/?usuario=${idUsuario}`,
  );
  return response.data;
};

// Busca un usuario por número de documento
export const buscarUsuarioPorDocumento = async (numeroDocumento) => {
  const response = await axios.get(
    `${API_URL}/usuarios/?documento=${numeroDocumento}`,
  );
  return response.data;
};

// Guarda todos los permisos de un usuario de una sola vez
export const guardarPermisosUsuario = async (idUsuario, permisos) => {
  const response = await axios.post(
    `${API_URL}/usuario-permisos/guardar_permisos/`,
    {
      id_usuario: idUsuario,
      permisos: permisos, // array de IDs de permisos
    },
  );
  return response.data;
};

//Obtiene los permisos combiandos de un usuario (rol + extras individuales)
export const getPermisosCombinados = async (idUsuario) => {
  const response = await axios.get(
    `${API_URL}/usuarios/${idUsuario}/permisos-combinados`,
  );
  return response.data;
};
