import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../../shared//layout/MainLayout";
import AuthLayout from "../../shared/layout/AuthLayout";
import HomePage from "../../features/home/pages/HomePage";
import ProfilePage from "../../features/users/pages/ProfilePage";
import LoginPage from "../../features/auth/pages/LoginPage";
import ForgotPasswordPage from "../../features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from '../../features/auth/pages/ResetPasswordPage'

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
                element: <h1 className="p-4">Cursos</h1> //Definir pagina
            },
            {
                path: "Proveedores",
                element: <h1 className="p-4">Contacto</h1> //Definir pagina
            },
            {
                path: "Medicamentos",
                element: <h1 className="p-4">Videos</h1> //Definir pagina
            },
            {
                path: "Ventas",
                element: <h1 className="p-4">Videos</h1> //Definir pagina
            },
            {
                path: "perfil",
                element: <ProfilePage/> //Definir pagina
            }
        ]
    },
    {
        element: <AuthLayout/>,
        children: [
            {
                path: "login",
                element: <LoginPage/>
            },
            {
                path: "forgot-password",
                element: <ForgotPasswordPage/>
            },
            {
                path: "reset-password",
                element: <ResetPasswordPage/>
            },
    ]

}
]);

export default router;