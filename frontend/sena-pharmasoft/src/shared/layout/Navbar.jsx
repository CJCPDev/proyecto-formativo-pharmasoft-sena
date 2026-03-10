import { Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import Logot from "../../assets/images/logo.webp";


const Navbar = ({variant = "solid"}) => {

     const [isOpen, setIsOpen] = useState(false);
     const navigate = useNavigate();


    const handleClick = () => {
        navigate("/login");
    };

  return (
    <nav className= 
      { `w-full border-b transition-colors duration-300 ${
          variant === "transparent"
          ? "bg-transparent border-transparent absolute top-0 left-0 z-30"
          : "bg-white border-border z-20"
        }`}>
      <div className="mx-auto max-w-7xl px-4 font-main">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo de marca */}
          <div className="flex items-center">
            <Link to="/" className="text-xl flex items-center">
              <img className="w-42 h-30" src={Logot} alt="" />
            </Link>
          </div>


          {/* Links de navegación */}
          <ul className="hidden md:flex items-center gap-14 text-brand-hover font-bold">
            <li>
              <Link to="/usuarios" className="hover:text-primary transition hover:underline hover:underline-offset-2">
                Usuarios
              </Link>
            </li>
            <li>
              <Link to="/lista-proveedores" className="hover:text-primary transition hover:underline hover:underline-offset-2">
                Proveedores
              </Link>
            </li>
            <li>
              <Link to="/medicamentos" className="hover:text-primary transition hover:underline hover:underline-offset-2">
                Medicamentos
              </Link>
            </li>
            <li>
              <Link to="/ventas" className="hover:text-primary transition hover:underline hover:underline-offset-2">
                Ventas
              </Link>
            </li>
          </ul>


          {/* Sección derecha: búsqueda + usuario */}
          <div className="flex items-center gap-4">
            
            {/* Buscador pendiente sacar componente a otro nivel para pagina principal */}
{/*             <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
            
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-9 pr-4
                 py-2.5 border rounded-lg text-body focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div> */}


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
                    absolute right-0 mt-2 w-40
                    bg-brand-soft/40
                    backdrop-blur-md
                    shadow-xl
                    rounded-2xl
                  ">
                  <ul className=" text-sm">
                    <li>
                      <Link
                        to="/perfil"
                        className="block px-4 py-2 hover:bg-brand-hover/20 transition rounded-2xl hover:underline hover:underline-offset-2 "
                        onClick={() => setIsOpen(false)}
                      >
                        Perfil
                      </Link>
                    </li>
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-brand-hover/20 transition cursor-pointer rounded-2xl hover:underline hover:underline-offset-2"
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

