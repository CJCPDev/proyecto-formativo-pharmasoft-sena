import { Search, LogIn,ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import Logot from "@/assets/images/logo-removebg-preview.png";
import CartModal from "../../sales/components/CartModal";
import { useState } from "react";

const Navbar = ({ variant = "solid" }) => {
  const [openCart, setOpenCart] = useState(false);
  return (
    <nav
      className={`w-full border-b transition-colors duration-300 ${
        variant === "transparent"
          ? "bg-transparent border-transparent absolute top-0 left-0 z-20"
          : "bg-brand-soft/40 border-border z-20"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">

        <div className="flex h-16 items-center justify-between">
          {/* Logo de marca */}
          <div>
            <Link to="/" className="flex items-center ">
              <img className="w-44 h-16 object-cover " src={Logot} alt="" />
            </Link>
          </div>
          <div className="flex items-center gap-4">

            {/* Buscador */}
            <div className="relative hidden md:block">

              <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4" />
              <input
                type="text"
                placeholder="Buscar..."
                className="w-80 sm:w-120 pl-4 pr-9 py-2.5 border rounded-lg text-body focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div> 
          <button onClick={() => setOpenCart(true)}>
            <ShoppingCart/>
          </button>

          <CartModal
            isOpen={openCart}
            onClose={() => setOpenCart(false)}
          />
          </div>
          {/* Links de navegación */}
          <ul className="hidden md:flex space-x-8 items-center gap-14 text-brand-hover font-bold">
            <li className="flex gap-2">
              <LogIn/>
              <Link to="/login" className="hover:text-primary transition hover:underline hover:underline-offset-2">
                Iniciar Sesión
              </Link>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;