import MainLayout from "../../shared//layout/MainLayout";
import AuthLayout from "../../shared/layout/AuthLayout";
import HomePage from "../../features/home/pages/HomePage";
import ProfilePage from "../../features/users/pages/ProfilePage";
import LoginForm from "../../features/users/components/LoginForm";
import ForgetPassword from "../../features/users/components/ForgetPassword";
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter ([
    {
    
        
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element: <HomePage/>
            },
            {
                path: "Usuarios",
                element: <h1 className="p-4">Cursos</h1>
            },
            {
                path: "contacto",
                element: <h1 className="p-4">Contacto</h1>
            },
            {
                path: "videos",
                element: <h1 className="p-4">Videos</h1>
            },
            {
                path: "perfil",
                element: <ProfilePage/>
            }
        ]
    },
    {
        element: <AuthLayout/>,
        children: [
            {
                path: "login",
                element: <LoginForm/>
            },
            {
                path: "forgot-password",
                element: <ForgetPassword/>
            },
            {
                path: "reset-password",
                element: <h1 className="p-4">Cambiar contraseña</h1>
            },
    ]

}
]);

export default router;