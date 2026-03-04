import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../../shared//layout/MainLayout";
import AuthLayout from "../../shared/layout/AuthLayout";
import HomePage from "../../features/home/pages/HomePage";
import ProfilePage from "../../features/users/pages/ProfilePage";

// Imports de Login

import LoginPage from "../../features/auth/pages/LoginPage";
import ForgotPasswordPage from "../../features/auth/components/ForgotPasswordForm"
import ResetPasswordPage from "../../features/auth/components/ResetPasswordForm"
import Loading from "../../shared/components/Loading";
import ConfirmationPassword from "../../features/auth/components/ConfirmationPassword";
// ------

import CreateUserPage from '../../features/users/pages/CreateUserPage'

// Import Ventas

import CreateSalePage from "../../features/sales/pages/CreateSalePage";
// ------

// Imports de proveedores

import SuppliersPage from "../../features/suppliers/pages/SuppliersPage";
// ------


const router = createBrowserRouter ([
    {
    
        path: "/",
        element: <HomePage/>,
        
    },
    {
    
        element: <MainLayout/>,
        children: [
            {
                path: "usuarios",
                element: <CreateUserPage/>
            },
            {
                path: "proveedores",
                element: <SuppliersPage/> 
            },
            {
                path: "medicamentos",
                element: <h1 className="p-4">Medicamentos</h1> //Definir pagina
            },
            {
                path: "ventas",
                element: <CreateSalePage/>
            },
            {
                path: "perfil",
                element: <ProfilePage/> //Definir pagina
            }
        ]
    },
    {

      //Login con rutas completo
        element: <AuthLayout/>,
        children: [
            {
                path: "perfil",
                element: <AuthLayout/>
            },
            {
                path: "login",
                element: <LoginPage/>

            },
            {
                path: "usuarios",
                element: <CreateUserPage/>

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
                element: <ConfirmationPassword/>
            },
    ]

    }
]);

export default router;