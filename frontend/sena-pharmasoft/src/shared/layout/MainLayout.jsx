import Navbar from "@/shared/Layout/Navbar";
import { Outlet, useLocation } from "react-router-dom";


export default function MainLayout(){
    /**
     * useLocation es un hook de react router que te da acceso al objeto locatio, el cual contiene informacion de la URL actual:
     * pathNmae = La ruta actual (/about, etc)
     */
    const location = useLocation();

    const isHome = location.pathname === "/"



    return(
        /**
         * Navbar transparente solo en el home
         * Si la ruta es exactamente / => transparente
         * Si es cualquier otra ruta es solido
         */
        <div className="min-h-screen text-text-primary">


            {/* Navbar */}
                <Navbar variant={isHome ? "transparent" : "solid"}/>

            
            {/* Contenido externo que se inyecta */}
            <main className="mx-auto">
                <Outlet />
            </main>

        </div>


    );
};