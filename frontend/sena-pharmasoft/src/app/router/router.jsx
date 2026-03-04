import { createBrowserRouter } from "react-router-dom"
import SuppliersPage from "../../features/suppliers/pages/SuppliersPage";
import MainLayout from "../../shared//layout/MainLayout";
import AuthLayout from "../../shared/layout/AuthLayout";
import HomePage from "../../features/home/pages/HomePage";
import ProfilePage from "../../features/users/pages/ProfilePage";
import LoginPage from "../../features/auth/pages/LoginPage";
import ForgotPasswordPage from "../../features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from '../../features/auth/pages/ResetPasswordPage'
import Loading from "../../shared/components/Loading";
import ValidationResetPassword from "../../features/auth/pages/ValidationResetPassword";
import CreateProductPage from "../../features/products/pages/CreateProductPage";

const router = createBrowserRouter ([
    {
    
        element: <MainLayout/>,
        children: [
            {
            element: <HomePage/>,
            path: "/",
            },
            {
                path: "Usuarios",
                element: <h1 className="p-4">Usuarios</h1> //Definir pagina
            },
            {
                path: "Proveedores",
                element: <SuppliersPage/> //Definir pagina
            },
            {
                path: "Medicamentos",
                element: <CreateProductPage /> //Definir pagina
            },
            {
                path: "Ventas",
                element: <h1 className="p-4">Ventas</h1> //Definir pagina
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
            {
                path: "validation",
                element: <Loading/>
            },
            {
                path: "validationPassword",
                element: <ValidationResetPassword/>
            },
    ]

    }
]);

export default router;