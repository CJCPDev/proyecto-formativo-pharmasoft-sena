import { Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = ({variant = "solid"}) => {

    const [isOpen, setIsOpen] = useState(false);

  return (
    // Estos son los estilos del navbar para que quede transparente
    <nav className= {`w-full border-b transition-colors duration-300 ${
      variant === "transparent"
      ? "bg-transparent border-transparent absolute top-0 left-0 z-30"
      : "bg-background border-border" 
    }`}>

      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo de marca */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Pharmasoft
            </Link>
          </div>

          {/* Links de navegación */}
          <ul className="hidden md:flex items-center gap-6">
            <li>
              <Link to="/carrito de compras" className="hover:text-primary transition">
                Carrrito de compra
              </Link>
            </li>
            <li>
              <Link to="/ventas" className="hover:text-primary transition">
                Ventas
              </Link>
            </li>
            <li>
              <Link to="/medicamentos" className="hover:text-primary transition">
                Medicamentos
              </Link>
            </li>
            <li>
              <Link to="/proveedores" className="hover:text-primary transition">
                Proveedores
              </Link>
            </li>
            <li>
              <Link to="/usuarios" className="hover:text-primary transition">
                Usuarios
              </Link>
            </li>
          </ul>


          {/* Sección derecha: búsqueda + usuario */}
          <div className="flex items-center gap-4">
            
            {/* Buscador */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
            
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-9 pr-4
                 py-2.5 border rounded-lg text-body focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Usuario */}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center size-10 rounded-full border hover:bg-surface transition"
              >
                <User className="size-5" />
              </button>


              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-background shadow-lg">
                  <ul className="py-2 text-sm">
                    <li>
                      <Link
                        to="/login"
                        className="px-4 py-2
                        grid grid-cols-1 gap-6
                        bg-white/40
                        dark:bg-neutral-800/15
                        backdrop-blur-sm
                        shadow-xl
                        ring-1
                        rounded-xl
                        "
                        onClick={() => setIsOpen(false)}
                      >
                        Perfil
                      </Link>
                    </li>
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-surface transition"
                        onClick={() => {
                          setIsOpen(false);
                          console.log("Cerrar sesión");
                        }}
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
  );
};


export default Navbar;

// Para dirigirme o navegar a una ruta uso Link
// Para ejecutar logica se utiliza button