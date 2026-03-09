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
import FormMedicamentos from "../../features/products/pages/CreateProductPage";
// ------

const router = createBrowserRouter ([

    {
    
        
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element: <HomePage/>
            },

            {
                path: "proveedores",
                element: <SuppliersPage/> 
            },
            {
                path: "medicamentos",
                element: <FormMedicamentos/>
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

},
]);

export default router;