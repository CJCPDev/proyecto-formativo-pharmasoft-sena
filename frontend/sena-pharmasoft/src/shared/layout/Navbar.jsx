import { Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Navbar = ({variant = "solid"}) => {
    const [isOpen, setIsOpen] = useState(false);
     const navigate = useNavigate();

    const handleClick = ()=> {
        setTimeout(() => {
            navigate('/login')
        }, 100)
        }

  return (
    <nav className= 
      { `w-full border-b transition-colors duration-300 ${
          variant === "transparent"
          ? "bg-transparent border-transparent absolute top-0 left-0 z-30"
          : "bg-brand border-border"
        }`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo de marca */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-brand-hover">
              PHARMASOFT
            </Link>
          </div>


          {/* Links de navegación */}
          <ul className="hidden md:flex items-center gap-14 text-brand-hover font-bold">
            <li>
              <Link to="/usuarios" className="hover:text-primary transition">
                Usuarios
              </Link>
            </li>
            <li>
              <Link to="/proveedores" className="hover:text-primary transition">
                Proveedores
              </Link>
            </li>
            <li>
              <Link to="/medicamentos" className="hover:text-primary transition">
                Medicamentos
              </Link>
            </li>
            <li>
              <Link to="/ventas" className="hover:text-primary transition">
                Ventas
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


            {/* Icono de usuario */}
            {/* <button className="flex items-center justify-center size-10 rounded-full border hover:bg-gray-100 transition">
              <User className="size-5" />
            </button> */}


            {/* Usuario */}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center size-10 rounded-full border hover:bg-surface transition"
              >
                <User className="size-5" />
              </button>


              {isOpen && (
                // <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-background shadow-lg">
                  <div className="
                    absolute right-0 mt-2 w-48
                    bg-white
                    dark:bg-neutral-800/90
                    backdrop-blur-md
                    shadow-xl
                    ring-1
                    rounded-xl
                  ">
                  <ul className="py-2 text-sm">
                    <li>
                      <Link
                        to="/perfil"
                        className="block px-4 py-2 hover:bg-surface transition"
                        onClick={() => setIsOpen(false)}
                      >
                        Perfil
                      </Link>
                    </li>
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-surface transition"
                        onClick={handleClick}
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

