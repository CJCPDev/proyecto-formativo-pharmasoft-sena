import { createBrowserRouter } from "react-router-dom"
import MainLayout from "@/shared/Layout/MainLayout";
import CreateUserPage from "@/features/users/pages/CreateUserPage"
import HomePage from "../../features/home/pages/HomePage";
import AuthLayout from "../../shared/layout/AuthLayout";
import UserForm from "../../features/users/components/UserForm";

const router = createBrowserRouter([
    {
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element: <HomePage />                
            },
            {
                path:"cursos", 
                element: <h1 className="p-4">Cursos</h1>
            },
            {
                path:"contacto", 
                element: <h1 className="p-4">Contactos</h1>
            },
            {
                path:"videos", 
                element: <h1 className="p-4">Videos</h1>
            },
            {
                path:"usuarios", 
                element: <UserForm/>
            },
        ]
    },
])

export default router;