// ─────────────────────────────────────────────
// authService.js
// Servicio que maneja la autenticación de usuarios
// Se conecta con la API de Django para login y logout
// ─────────────────────────────────────────────

import axios from "axios";

const API_URL = "http://localhost:8000/api";

//Inicia sesion y guarda los tokens en localStorage
export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login/`, {
        email,
        password
    });

    //Guardamos el token y los datos del usuario en localStorage
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.access);
    localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
    
    //Guardamos la hora exacta de expiracion según el rol
    localStorage.setItem('expiracion', response.data.expiracion);
    localStorage.setItem('horas_sesion', response.data.horas_sesion);

    return response.data;
};

//Cierra sesión y elimina los tokens
export const logout = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    try {
        await axios.post(`${API_URL}/auth/logout/`, {
            refresh: refreshToken
        });
    } catch (error) {
            console.error("error al cerrar sesión:", error);
        } finally {
            //Siempre limpiamos el localStorage
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('usuario');
            localStorage.removeItem('expiracion');
            localStorage.removeItem('horas_sesion');
    }
};

//Obtiene el usuario guardado en localStorage
export const getUsuarioActual = () => {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
}

//Verifica si hay un usuario autenticado y si su sesion no ha expirado
export const estaAutenticado = () => {
    const token = localStorage.getItem('access_token');
    const expiracion = localStorage.getItem('expiracion');

    if (!token || !expiracion) return false;

    //verificamos si la sesión expiró según el tiempo del rol
    const ahora = new Date();
    //Limpiamos el +00:00 y lo reemplazamos por Z para que JS lo lea bien
    const expiracionLimpia = expiracion.replace('+00:00', 'Z');
    const fechaExpiracion = new Date(expiracionLimpia);

    if (ahora >= fechaExpiracion){
        //La sesión expiró - limpiamos el localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('usuario');
        localStorage.removeItem('expiracion');
        localStorage.removeItem('horas_sesion');
        return false;
    }
    return true;
};

//Obtiene el tiempo restante de sesión en minutos
export const tiempoRestante = () => {
    const expiracion = localStorage.getItem('expiracion');
    if (!expiracion) return 0;

    const ahora = new Date();
    const fechaExpiracion = new Date(expiracion);
    const diferencia = fechaExpiracion - ahora;

    //Convertimos de milisegundos a minutos
    return Math.max(0, Math.floor(diferencia / 60000));
}


