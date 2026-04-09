// // ─────────────────────────────────────────────
// // HomeNavbar.jsx
// // Navbar de la página de inicio
// // Muestra el contador de productos en el carrito
// // ─────────────────────────────────────────────

// import { Search, ShoppingCart } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import Logot from "@/assets/images/logo-removebg-preview.png";
// import CartModal from "../../sales/components/CartModal";
// import { useState, useEffect } from "react";
// import { Button } from "../../../shared/components";
// import { getUsuarioActual } from "@/features/auth/services/authService";
// import { obtenerCarrito } from "@/features/home/services/carritoService";

// const Navbar = ({ variant = "solid" }) => {
//   const [openCart, setOpenCart] = useState(false);
//   const [totalProductos, setTotalProductos] = useState(0);
//   const navigate = useNavigate();

//   const usuarioActual = getUsuarioActual();

//   // Carga el contador del carrito al montar el navbar
//   useEffect(() => {
//     if (usuarioActual) {
//       cargarContador();
//     }
//   }, []);

//   // Actualiza el contador del carrito
//   const cargarContador = async () => {
//     try {
//       const data = await obtenerCarrito(usuarioActual.id);
//       // Sumamos las cantidades de todos los items
//       const total = data.reduce((acc, item) => acc + item.cantidad, 0);
//       setTotalProductos(total);
//     } catch (error) {
//       console.error("Error al cargar contador:", error);
//     }
//   };

//   const handleClick = () => {
//     navigate("/create-count");
//   };

//   return (
//     <nav
//       className={`w-full transition-colors duration-300 ${
//         variant === "transparent"
//           ? "bg-transparent border-transparent absolute top-0 left-0 z-20"
//           : "bg-white z-20"
//       }`}
//     >
//       <div className="mx-auto max-w-7xl px-4">
//         <div className="flex h-16 items-center justify-between">

//           <Link to="/" className="flex items-center">
//             <img className="w-44 h-16 object-cover" src={Logot} alt="logo" />
//           </Link>

//           <div className="relative w-full max-w-md hidden md:block">
//             <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4" />
//             <input
//               type="text"
//               placeholder="Buscar productos..."
//               className="w-full pl-4 pr-9 py-2.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
//             />
//           </div>

//           <div className="flex items-center gap-4">
//             <Button onClick={handleClick}>
//               Crear cuenta
//             </Button>

//             <Link to="/login" className="hover:text-primary transition">
//               Ingresar
//             </Link>

//             {/* Icono del carrito con contador */}
//             <button
//               onClick={() => setOpenCart(true)}
//               className="relative"
//             >
//               <ShoppingCart className="stroke-brand-hover" />

//               {/* Contador — solo se muestra si hay productos */}
//               {totalProductos > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                   {totalProductos}
//                 </span>
//               )}
//             </button>

//             {/* Pasamos cargarContador para actualizar el contador cuando se modifica el carrito */}
//             <CartModal
//               isOpen={openCart}
//               onClose={() => {
//                 setOpenCart(false);
//                 cargarContador(); // 👈 actualizamos el contador al cerrar el modal
//               }}
//             />
//           </div>

//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




// ─────────────────────────────────────────────
// HomeNavbar.jsx
// Navbar de la página de inicio
// Muestra el contador de productos en el carrito
// ─────────────────────────────────────────────

import { Search, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/assets/images/logo-removebg-preview.png";
import CartModal from "../../sales/components/CartModal";
import { useState, useEffect } from "react";
import { getUsuarioActual } from "@/features/auth/services/authService";
import { obtenerCarrito } from "@/features/home/services/carritoService";

const Navbar = ({ variant = "solid", onOpenRegister }) => {
  const [openCart, setOpenCart] = useState(false);
  const [totalProductos, setTotalProductos] = useState(0);

  const usuarioActual = getUsuarioActual();

  // Carga el contador del carrito al montar el navbar
  useEffect(() => {
    if (usuarioActual) {
      cargarContador();
    }
  }, []);

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
              onClick={() => setOpenCart(true)}
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
              isOpen={openCart}
              onClose={() => {
                setOpenCart(false);
                cargarContador(); 
              }}
            />

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
