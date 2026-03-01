import Navbar from "./Navbar"
import { Outlet, useLocation } from "react-router-dom"


export default function MainLayout (){

    const location = useLocation();
    const isHome = location.pathname === "/"

    return (

        <div className="min-h-screen text-text-mute ">

            {/* componente Nabvar creado anteriormente */}
            <Navbar variant={isHome ? "transparent" : "solid"} />
            
            {/* contenido externo que se inyecta */}
            <main className="mx-auto">
                <Outlet/>
            </main>
        </div>
    )
};