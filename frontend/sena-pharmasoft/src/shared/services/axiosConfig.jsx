// ─────────────────────────────────────────────
// axiosConfig.js
// Configura axios para enviar el token JWT
// en cada petición y detectar cuando expira
// ─────────────────────────────────────────────

import axios from "axios";

// Verifica si la sesión ha expirado según el tiempo del rol
const sesionExpirada = () => {
    const expiracion = localStorage.getItem('expiracion');
    if (!expiracion) return true;

    const ahora = new Date();
    const fechaExpiracion = new Date(expiracion);
    
    return ahora >= fechaExpiracion;
};

//Limpia el localStorage y redirege al login
const cerrarSesion = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('expiracion');
    localStorage.removeItem('horas_sesion');
    window.location.href = '/login';
}

//Interceptor de peticiones - verifica la sesión antes de cada request
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');

        if (token) {
            //Si la sesión expirá cerramos antes de hacer la petición
            if(sesionExpirada()) {
                cerrarSesion();
                return Promise.reject(new Error ('Sesion expirada'));
            }
            //Agregamos el token al header
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

//Interceptor de respuestas - detetcta errores de autentificació
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            cerrarSesion();
        }
        return Promise.reject(error);
    }
);

export default axios;
