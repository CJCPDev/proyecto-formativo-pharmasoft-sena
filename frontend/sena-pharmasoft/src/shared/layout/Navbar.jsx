// ─────────────────────────────────────────────
// Navbar.jsx
// Barra de navegación principal
// Muestra opciones según el rol del usuario autenticado
// ─────────────────────────────────────────────

import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logot from "../../assets/images/logo-removebg-preview.png";
import { getUsuarioActual, logout } from "@/features/auth/services/authService";
import { CambiarContrasenaModal } from "@/features/users";

const Navbar = ({ variant = "solid" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Obtenemos el usuario actual del localStorage
  const [usuario, setUsuario] = useState(getUsuarioActual());
  const idRol = usuario?.id_rol;

  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  // ID de roles
  const ES_ADMIN = idRol === 5;
  const ES_FARMACEUTA = idRol === 7;

  // Cierra sesión y redirige al login
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      <CambiarContrasenaModal
   isOpen={isChangePasswordOpen}
   onClose={() => setIsChangePasswordOpen(false)}
    />
    <nav
      className={`w-full transition-colors duration-300 ${
        variant === "transparent"
          ? "bg-transparent border-transparent absolute top-0 left-0 z-20"
          : "bg-brand-soft/15 z-20"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div>
            <Link to="/DashboardMain" className="flex items-center">
              <img className="w-44 h-16 object-cover" src={Logot} alt="" />
            </Link>
          </div>

          {/* Links de navegación según el rol */}
          <ul className="hidden md:flex space-x-8 items-center gap-14 text-brand-hover font-bold">
            {/* Solo Administrador ve usuarios */}
            {ES_ADMIN && (
              <li>
                <Link
                  to="/usuarios"
                  className="hover:text-primary transition hover:underline hover:underline-offset-2"
                >
                  Usuarios
                </Link>
              </li>
            )}

            {/* Administrador y farmaceuta ve proveedores */}
            {(ES_ADMIN || ES_FARMACEUTA) && (
              <li>
                <Link
                  to="/listar-proveedor"
                  className="hover:text-primary transition hover:underline hover:underline-offset-2"
                >
                  Proveedores
                </Link>
              </li>
            )}

            {/* Administrador y farmaceuta ven medicamentos y ventas */}
            {(ES_ADMIN || ES_FARMACEUTA) && (
              <>
                <li>
                  <Link
                    to="/medicamentos"
                    className="hover:text-primary transition hover:underline hover:underline-offset-2"
                  >
                    Medicamentos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/listar-ventas"
                    className="hover:text-primary transition hover:underline hover:underline-offset-2"
                  >
                    Ventas
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Sección derecha — usuario */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center size-10 rounded-full border hover:bg-surface transition"
              >
                <User className="size-5" />
              </button>

              {isOpen && (
                <div
                  className="
                  absolute right-0 mt-2 w-48
                  bg-brand-soft/40
                  backdrop-blur-md
                  shadow-xl
                  rounded-2xl
                "
                >
                  <ul className="text-sm">
                    {/* Nombre del usuario */}
                    {usuario && (
                      <li className="px-4 py-2 font-bold text-brand-hover border-b border-brand-soft">
                        {usuario.nombre}
                      </li>
                    )}

                    <li>
                      <Link
                        to="/perfil"
                        className="block px-4 py-2 hover:bg-brand-hover/20 transition rounded-2xl hover:underline hover:underline-offset-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Perfil
                      </Link>
                    </li>

                    {/* Gestión de permisos solo para administrador */}
                    {ES_ADMIN && (
                      <li>
                        <Link
                          to="/permisos"
                          className="block px-4 py-2 hover:bg-brand-hover/20 transition rounded-2xl hover:underline hover:underline-offset-2"
                          onClick={() => setIsOpen(false)}
                        >
                          Gestión de permisos
                        </Link>
                      </li>
                    )}

                    {/* Cambiar contraseña — para admin y farmaceuta */}
                    {(ES_ADMIN || ES_FARMACEUTA) && (
                      <li>
                        <button
                          className="w-full text-left block px-4 py-2 hover:bg-brand-hover/20 transition rounded-2xl hover:underline hover:underline-offset-2"
                          onClick={() => {
                            setIsChangePasswordOpen(true);
                            setIsOpen(false);
                          }}
                        >
                          Cambiar contraseña
                        </button>
                      </li>
                    )}

                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-brand-hover/20 transition cursor-pointer rounded-2xl hover:underline hover:underline-offset-2"
                        onClick={handleLogout}
                      >
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;