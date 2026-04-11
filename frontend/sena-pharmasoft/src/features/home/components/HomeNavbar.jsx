// ─────────────────────────────────────────────
// HomeNavbar.jsx
// Navbar de la página de inicio
// Muestra el contador de productos en el carrito
// ─────────────────────────────────────────────

import { Search, ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/images/logo-removebg-preview.png";
import CartModal from "../../sales/components/CartModal";
import { useState, useEffect } from "react";
import { getUsuarioActual } from "@/features/auth/services/authService";
import { obtenerCarrito } from "@/features/home/services/carritoService";
import { CambiarContrasenaModal } from "@/features/users";

const Navbar = ({ 
  variant = "solid",
  onSearch,
  showSearch = true,
  onOpenRegister, 
  setOpenLogin,
  shouldOpenCart,
  setShouldOpenCart
}) => {
  
  const [totalProductos, setTotalProductos] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  
  const usuarioActual = getUsuarioActual();
  const navigate = useNavigate();

  useEffect(() => {
    if (usuarioActual) {
      cargarContador();
    }
  }, []);

  useEffect(() => {
    if (shouldOpenCart) {
      setIsCartOpen(true);
      setShouldOpenCart(false);
    }
  }, [shouldOpenCart]);

  const cargarContador = async () => {
    try {
      const data = await obtenerCarrito(usuarioActual.id);
      const total = data.reduce((acc, item) => acc + item.cantidad, 0);
      setTotalProductos(total);
    } catch (error) {
      console.error("Error al cargar contador:", error);
    }
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
            : "bg-white shadow-sm z-20"
        }`}
      >
        <div className="mx-auto max-w-8xl px-16">
          <div className="flex h-18 items-center justify-between">

            {/* LOGO */}
            <Link to="/" className="flex items-center">
              <img className="w-36 object-contain" src={Logo} alt="logo" />
            </Link>

          {/* SEARCH */}
          {showSearch && (  //solo muestra si showSearch es true
            <div className="relative w-full max-w-3xl hidden md:block">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full pl-4 pr-9 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-bg-brand-soft transition"
                />
            </div>
        )}

            {/* ACTIONS */}
            <div className="flex items-center gap-6 font-secondary">

              {/* BOTÓN INICIAR SESIÓN o MENÚ DEL USUARIO */}
              <div className="relative flex items-center px-4 group">
                <User className="size-8 group-hover:stroke-brand-fort stroke-brand-hover group-hover:delay-200" />

                {usuarioActual ? (
                  <>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="text-brand-hover text-xl px-1 py-2.5 font-semibold cursor-pointer"
                    >
                      {usuarioActual.nombre}
                    </button>

                    {isUserMenuOpen && (
                      <div className="absolute top-12 right-0 w-48 bg-white shadow-xl rounded-2xl z-50 border border-gray-100">
                        <ul className="text-sm">
                          <li>
                            <button
                              onClick={() => {
                                setIsUserMenuOpen(false);
                                navigate("/mi-perfil");
                              }}
                              className="w-full text-left px-4 py-3 hover:bg-brand-soft/30 rounded-t-2xl transition"
                            >
                              Mi perfil
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                setIsUserMenuOpen(false);
                                setIsChangePasswordOpen(true);
                              }}
                              className="w-full text-left px-4 py-3 hover:bg-brand-soft/30 transition"
                            >
                              Cambiar contraseña
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={async () => {
                                const { logout } = await import("@/features/auth/services/authService");
                                await logout();
                                window.location.reload();
                              }}
                              className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-500 rounded-b-2xl transition"
                            >
                              Cerrar sesión
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => setOpenLogin(true)}
                    className="text-brand-hover text-xl px-1 py-2.5 cursor-pointer 
                    transition-all duration-200 font-semibold group-hover:text-brand-fort"
                  >
                    Iniciar sesión
                  </button>
                )}
              </div>

              {/* ICONO CARRITO CON CONTADOR */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="size-7 stroke-2 stroke-brand-hover cursor-pointer" />
                {totalProductos > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalProductos}
                  </span>
                )}
              </button>

              <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                setOpenLogin={setOpenLogin}
                setShouldOpenCart={setShouldOpenCart}
              />

            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;