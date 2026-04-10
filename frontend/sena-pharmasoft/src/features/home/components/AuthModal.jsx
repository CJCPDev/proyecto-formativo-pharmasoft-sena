// ─────────────────────────────────────────────
// AuthModal.jsx
// Modal de autenticación para clientes
// Maneja login y registro
// ─────────────────────────────────────────────

import { useState, useEffect } from "react";
import { InputHome } from "@/features/home";
import { Select } from "@/shared/components";
import axios from "@/shared/services/axiosConfig";

const API_URL = "http://localhost:8000/api";

export default function AuthModal({
  openLogin,
  openRegister,
  setOpenLogin,
  setOpenRegister,
}) {

  // Estados del login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(null);
  const [loadingLogin, setLoadingLogin] = useState(false);

  // Estados del registro
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [formRegistro, setFormRegistro] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    tipoDocumento: "",
    numeroDocumento: "",
    telefono: "",
    direccion: "",
    contrasena: "",
    confirmarContrasena: "",
  });
  const [errorRegistro, setErrorRegistro] = useState(null);
  const [loadingRegistro, setLoadingRegistro] = useState(false);

  // Carga los tipos de documento al abrir el modal de registro
  useEffect(() => {
    if (openRegister) {
      cargarTiposDocumento();
    }
  }, [openRegister]);

  const cargarTiposDocumento = async () => {
    try {
      const response = await axios.get(`${API_URL}/tipo-documento/`);
      setTiposDocumento(response.data);
    } catch (error) {
      console.error("Error al cargar tipos de documento:", error);
    }
  };

  const handleChangeRegistro = (e) => {
    const { name, value } = e.target;
    setFormRegistro((prev) => ({ ...prev, [name]: value }));
  };

  // Login del cliente
const handleLogin = async (e) => {
    e.preventDefault();
    setErrorLogin(null);
    setLoadingLogin(true);

    try {
      const response = await axios.post(`${API_URL}/auth/login/`, {
        email,
        password
      });

      // Verificamos que sea un cliente (rol 2)
      if (response.data.usuario.id_rol !== 2) {
        setErrorLogin("Este acceso es solo para clientes. Por favor usa el login de administradores.");
        return;
      }

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
      localStorage.setItem('expiracion', response.data.expiracion);
      localStorage.setItem('horas_sesion', response.data.horas_sesion);

      try {
        const permisosResponse = await axios.get(
          `${API_URL}/usuarios/${response.data.usuario.id}/permisos-combinados/`
        );
        const permisos = permisosResponse.data.map(p => p.codigo);
        localStorage.setItem('permisos', JSON.stringify(permisos));
      } catch (error) {
        localStorage.setItem('permisos', JSON.stringify([]));
      }

      setOpenLogin(false);
      window.location.reload();

    } catch (err) {
      setErrorLogin(err.response?.data?.error || "Credenciales inválidas");
    } finally {
      setLoadingLogin(false);
    }
  };

  // Registro del cliente
  const handleRegistro = async (e) => {
    e.preventDefault();
    setErrorRegistro(null);

    // Validamos que las contraseñas coincidan
    if (formRegistro.contrasena !== formRegistro.confirmarContrasena) {
      setErrorRegistro("Las contraseñas no coinciden");
      return;
    }

    if (formRegistro.contrasena.length < 6) {
      setErrorRegistro("La contraseña debe tener mínimo 8 caracteres");
      return;
    }

    setLoadingRegistro(true);

    try {
      await axios.post(`${API_URL}/usuarios/`, {
        name: `${formRegistro.nombre} ${formRegistro.apellidos}`,
        userEmail: formRegistro.email,
        phone: formRegistro.telefono,
        documentNumber: formRegistro.numeroDocumento,
        documentType: formRegistro.tipoDocumento,
        userGroup: 2, // rol cliente
        direccion: formRegistro.direccion,
        contrasena: formRegistro.contrasena,
      });

      // Después de registrarse abrimos el login
      setOpenRegister(false);
      setOpenLogin(true);
      alert("Cuenta creada correctamente. Ahora puedes iniciar sesión.");

    } catch (err) {
      setErrorRegistro(err.response?.data?.error || "Error al crear la cuenta");
    } finally {
      setLoadingRegistro(false);
    }
  };

  return (
    <>
      {/* REGISTER */}
      {openRegister && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl w-7xl p-6 relative">

            <button
              onClick={() => setOpenRegister(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 gap-4">
              <h1 className="text-brand-hover text-big-title text-center font-bold">
                Crear cuenta
              </h1>
              <span className="text-center text-2xl">
                Al crear tu cuenta accedes a muchos descuentos y beneficios
              </span>
            </div>

            <form onSubmit={handleRegistro} className="grid grid-cols-3 gap-6 m-6 p-6">
              <div className="grid grid-cols-1 gap-6">
                <Select
                  label="Tipo de documento"
                  name="tipoDocumento"
                  value={formRegistro.tipoDocumento}
                  onChange={handleChangeRegistro}
                  options={tiposDocumento}
                />
                <InputHome
                  type="text"
                  label="Nombre"
                  name="nombre"
                  value={formRegistro.nombre}
                  onChange={handleChangeRegistro}
                />
                <InputHome
                  type="text"
                  label="Apellidos"
                  name="apellidos"
                  value={formRegistro.apellidos}
                  onChange={handleChangeRegistro}
                />
                <InputHome
                  type="email"
                  label="Correo electrónico"
                  name="email"
                  value={formRegistro.email}
                  onChange={handleChangeRegistro}
                />
              </div>

              <div className="grid grid-cols-1 gap-6">
                <InputHome
                  type="text"
                  label="No. de documento"
                  name="numeroDocumento"
                  value={formRegistro.numeroDocumento}
                  onChange={handleChangeRegistro}
                />
                <InputHome
                  type="text"
                  label="Teléfono"
                  name="telefono"
                  value={formRegistro.telefono}
                  onChange={handleChangeRegistro}
                />
                <InputHome
                  type="text"
                  label="Dirección"
                  name="direccion"
                  value={formRegistro.direccion}
                  onChange={handleChangeRegistro}
                />
              </div>

              <div className="grid grid-cols-1 gap-6">
                <InputHome
                  type="password"
                  label="Contraseña"
                  name="contrasena"
                  value={formRegistro.contrasena}
                  onChange={handleChangeRegistro}
                />
                <InputHome
                  type="password"
                  label="Confirmar contraseña"
                  name="confirmarContrasena"
                  value={formRegistro.confirmarContrasena}
                  onChange={handleChangeRegistro}
                />

                {/* Mensaje de error */}
                {errorRegistro && (
                  <p className="text-red-500 text-sm text-center">{errorRegistro}</p>
                )}

                <button
                  type="submit"
                  disabled={loadingRegistro}
                  className="bg-green-600 text-white py-2 rounded-2xl h-12 font-bold cursor-pointer hover:bg-green-500"
                >
                  {loadingRegistro ? "Creando cuenta..." : "Guardar"}
                </button>
              </div>
            </form>
              <div className="flex text-center w-full gap-6 justify-center">
            <Button
                onClick={() => {
                  setOpenRegister(false);
                  setOpenLogin(true);
                }}
                variant="secondary"
              >
                Regresar
              
            </Button>
              <Button 
                variant= "primary"
              >
                Guardar
              </Button>
          </div>
          </div>
        </div>
      )}

      {/* LOGIN */}
      {openLogin && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl w-95 p-6 relative">
            <button
              onClick={() => setOpenLogin(false)}
              className="absolute top-3 right-3"
            >
              ✕
            </button>

            <h2 className="text-center text-brand-hover text-general-title font-bold mb-8">
              Iniciar sesión
            </h2>

            <form onSubmit={handleLogin} className="grid gap-8">
              <InputHome
                type="email"
                label="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputHome
                type="password"
                label="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {errorLogin && (
                <p className="text-red-500 text-sm text-center">{errorLogin}</p>
              )}

              <button
                type="submit"
                disabled={loadingLogin}
                className="bg-green-600 hover:bg-green-500 font-bold text-white py-2 rounded-2xl h-12 cursor-pointer"
              >
                {loadingLogin ? "Ingresando..." : "Ingresar"}
              </button>
            </form>

            <p className="text-center mt-4">
              ¿No tienes cuenta?{" "}
              <span
                onClick={() => {
                  setOpenLogin(false);
                  setOpenRegister(true);
                }}
                className="text-green-600 hover:text-green-700 hover:font-bold cursor-pointer"
              >
                Crear cuenta
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
