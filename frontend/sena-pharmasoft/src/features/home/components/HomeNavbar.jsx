import { Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/assets/images/logo-removebg-preview.png";
import CartModal from "../../sales/components/CartModal";
import { useState } from "react";
import { Button } from "../../../shared/components";

const Navbar = ({ variant = "solid", onOpenRegister }) => {
  const [openCart, setOpenCart] = useState(false);

  return (
    <nav
      className={`w-full transition-colors duration-300 ${
        variant === "transparent"
          ? "bg-transparent border-transparent absolute top-0 left-0 z-20"
          : "bg-white shadow-sm z-20"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img className="w-36 object-contain" src={Logo} alt="logo" />
          </Link>

          {/* SEARCH */}
          <div className="relative w-full max-w-md hidden md:block">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full pl-4 pr-9 py-2.5 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-bg-brand-soft transition"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            
            {/* BOTÓN CREAR CUENTA */}
            <Button
              onClick={onOpenRegister}
              className="bg-brand-hover text-white px-6 py-2.5 rounded-lg shadow-md 
              hover:bg-[#0f3d11] hover:scale-105 active:scale-95 transition-all duration-200 font-semibold"
            >
              Iniciar sesion
            </Button>

            {/* LOGIN */}
            <Link
              to="/login"
              className="text-gray-700 hover:text-brand-hover transition font-medium"
            >
              Empleados
            </Link>

            {/* CARRITO */}
            <button onClick={() => setOpenCart(true)}>
              <ShoppingCart className="text-gray-700 hover:text-brand-hover transition" />
            </button>

            <CartModal isOpen={openCart} onClose={() => setOpenCart(false)} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
