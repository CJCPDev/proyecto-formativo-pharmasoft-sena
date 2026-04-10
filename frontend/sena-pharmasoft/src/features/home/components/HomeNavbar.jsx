import { Search, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/assets/images/logo-removebg-preview.png";
import CartModal from "../../sales/components/CartModal";
import { useState, useEffect } from "react";
import { getUsuarioActual } from "@/features/auth/services/authService";
import { obtenerCarrito } from "@/features/home/services/carritoService";

const Navbar = ({ variant = "solid",
  onOpenRegister, 
  setOpenLogin,
  shouldOpenCart,
  setShouldOpenCart}) => {

  const [totalProductos, setTotalProductos] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
const [usuarioActual, setUsuarioActual] = useState(null)


  // Carga el contador del carrito al montar el navbar
useEffect(() => {
  const user = getUsuarioActual();
  setUsuarioActual(user);
}, []);

/*   useEffect(() => {
  if (shouldOpenCart) {
    setIsCartOpen(true);     // 👈 abre carrito
    setShouldOpenCart(false); // 👈 resetea
  }
}, [shouldOpenCart]); */

  // Actualiza el contador del carrito
  const cargarContador = async () => {
    try {
      const data = await obtenerCarrito(usuarioActual.id);
      const total = data.reduce((acc, item) => acc + item.cantidad, 0);
      setTotalProductos(total);
    } catch (error) {
      console.error("Error al cargar contador:", error);
    }
  };
  const handleOpenCart = () => {
  const user = getUsuarioActual();

  if (!user) {
    setOpenLogin(true); // 👈 abre login
    return;
  }

  setIsCartOpen(true); // 👈 abre carrito
};



  return (
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
          <div className="relative w-full max-w-3xl hidden md:block">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full pl-4 pr-9 py-2.5 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-1 focus:ring-bg-brand-soft transition"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-6 font-secondary">

            {/* BOTÓN INICIAR SESIÓN */}
            <div className="flex items-center px-4 group">
              <User className="size-8 group-hover:stroke-brand-fort stroke-brand-hover group-hover:delay-200" />
              <button
                onClick={onOpenRegister}
                className="text-brand-hover text-xl px-1 py-2.5 cursor-pointer 
                transition-all duration-200 font-semibold group-hover:text-brand-fort"
              >
                Iniciar sesion
              </button>
            </div>

            {/* ICONO CARRITO CON CONTADOR */}
            <button
              onClick={handleOpenCart}
              className="relative"
            >
              <ShoppingCart className="size-7 stroke-2 stroke-brand-hover cursor-pointer" />

              {/* Contador — solo se muestra si hay productos */}
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
  );
};

export default Navbar;
