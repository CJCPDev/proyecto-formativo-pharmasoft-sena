import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../../shared//layout/MainLayout";
import AuthLayout from "../../shared/layout/AuthLayout";
import HomePage from "../../features/home/pages/HomePage";
import ProfilePage from "../../features/users/pages/ProfilePage";

// Imports de Login

import LoginPage from "../../features/auth/pages/LoginPage";
import ForgotPasswordPage from "../../features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from '../../features/auth/pages/ResetPasswordPage'
import Loading from "../../shared/components/Loading";
import ConfirmationPassword from "../../features/auth/components/ConfirmationPassword";
// ------

import CreateUserPage from '../../features/users/pages/CreateUserPage'

// Import Ventas

import CreateSalePage from "../../features/sales/pages/CreateSalePage";
// ------

// Imports de proveedores

import { SuppliersPage } from "@/features/suppliers";
import FormMedicamentos from "../../features/products/pages/CreateProductPage";
import SuppliersListPage from "@/features/suppliers/pages/SupplierListPage";
import SuppliersDetailPage from "@/features/suppliers/pages/SuppliersDetailPage";
// ------

const router = createBrowserRouter ([
    {
        
        element: <MainLayout/>,
        children: [
            {
            
                path: "/",
                element: <HomePage/>,
                
            },
            {
                path: "usuarios",
                element: <CreateUserPage/>
            },
            {
                path: "crear-proveedores",
                element: <SuppliersPage/> 
            },
            {
                path: "lista-proveedores",
                element: <SuppliersListPage/> 
            },
            {
                path: "ver-proveedor",
                element: <SuppliersDetailPage/> 
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
                element: <ConfirmationPassword/>
            },
    ]

    }
]);

export default router;