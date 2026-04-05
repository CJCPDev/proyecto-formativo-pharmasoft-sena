import { Search, ShoppingCart, User } from "lucide-react";
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
            {/* BOTÓN CREAR CUENTA */}
            <div className="flex items-center px-4 group">
              <User className="size-8 group-hover:stroke-brand-fort stroke-brand-hover group-hover:delay-200"/>
              <button
                onClick={onOpenRegister}
                className="text-brand-hover text-xl px-1 py-2.5 cursor-pointer 
                transition-all duration-200 font-semibold group-hover:text-brand-fort "
              >
                Iniciar sesion
              </button>

            </div>
            <button onClick={() => setOpenCart(true)}>
              <ShoppingCart className="  size-7 stroke-2 stroke-brand-hover cursor-pointer" />
            </button>
{/*             <div className="text-brand-fort group hover:text-brand-hover transition font-medium hover:shadow-2xl hover:shadow-brand-hover hover:rounded-lg px-20">
              <Link
                to="/login"
                className="text-brand-fort font-secondary"
                >
              Empleados
                </Link>

            </div> */}

            <CartModal isOpen={openCart} onClose={() => setOpenCart(false)} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
