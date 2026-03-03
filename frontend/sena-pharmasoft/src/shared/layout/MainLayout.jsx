import Navbar from "./Navbar"
import { Outlet, useLocation } from "react-router-dom"

export default function MainLayout (){
    const location = useLocation();
    const isHome = location.pathname === "/"

    return (
        <div className="min-h-screen text-text-mute">
            {/* Navbar arriba */}
            <Navbar variant={isHome ? "transparent" : "solid"} />

            {/* Contenido debajo */}
            <main className="mx-auto">
                <Outlet/>
            </main>
        </div>
    )
};
