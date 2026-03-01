// import Navbar from "@/shared/Layout/Navbar";
import { Outlet } from "react-router-dom";
import backbg from "@/assets/images/background.webp"
import UserForm from "./../../features/users/components/UserForm"

export default function AuthLayout(){
    return(
        <div className="relative min-h-screen w-full flex items-center justify-center text-black"
                style={
                    {
                        backgroundImage: `url(${backbg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }
                }
                >
                {/* <div className="absolute inset-0 bg-black/50"></div> */}

            {/* Contenido externo que se inyecta */}
            <main className="mx-auto">
                <Outlet />
                <UserForm />
            </main>

        </div>
    );
};