import { Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import Logot from "@/assets/images/logo-removebg-preview.png";
import CartModal from "../../sales/components/CartModal";
import { useState } from "react";

const Navbar = ({ variant = "solid" }) => {
  const [openCart, setOpenCart] = useState(false);

  return (
    <nav
      className={`w-full transition-colors duration-300 ${
        variant === "transparent"
          ? "bg-transparent border-transparent absolute top-0 left-0 z-20"
          : "bg-white  z-20"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">


          <Link to="/" className="flex items-center">
            <img className="w-44 h-16 object-cover" src={Logot} alt="logo" />
          </Link>


          <div className="relative w-full max-w-md hidden md:block">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4" />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full pl-4 pr-9 py-2.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-4">

            <Link
              to="/create-count"
              className="hover:text-primary transition"
            >
              Crear cuenta
            </Link>

            <Link
              to="/login"
              className="hover:text-primary transition"
            >
              Ingresar
            </Link>

            <button onClick={() => setOpenCart(true)}>
              <ShoppingCart className="stroke-brand-hover" />
            </button>

            <CartModal isOpen={openCart} onClose={() => setOpenCart(false)} />
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;