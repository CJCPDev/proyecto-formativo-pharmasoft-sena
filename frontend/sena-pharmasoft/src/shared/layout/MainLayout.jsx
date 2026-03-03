import mainBg from "@/assets/images/background.webp"
import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"


export default function MainLayout (){


    return (

        <div className="min-h-screen flex flex-col">

            {/* componente Nabvar creado anteriormente */}
            <Navbar variant="solid"/>
            
            {/* contenido externo que se inyecta */}
            <main className="relative flex-1 flex items-center justify-center overflow-hidden">
                
                <div className="absolute inset-0 bg-cover bg-center opacity-5"
                    style={
                    {
                        backgroundImage: `url(${mainBg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }
                }>
                </div>
                    <Outlet/>
                
            </main>
        </div>
    )
};