import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../../shared//layout/MainLayout";
import AuthLayout from "../../shared/layout/AuthLayout";
import HomePage from "../../features/home/pages/HomePage";

import ProfilePage from "../../features/users/pages/ProfileUserPage";

// Imports de Login

import LoginPage from "../../features/auth/pages/LoginPage";
import ForgotPasswordPage from "../../features/auth/components/ForgotPasswordForm"
import ResetPasswordPage from "../../features/auth/components/ResetPasswordForm"
import Loading from "../../shared/components/Loading";

import ConfirmationPassword from "../../features/auth/components/ConfirmationPassword";
// ------
import { UserListPage } from "../../features/users";
import CreateUserPage from '../../features/users/pages/CreateUserPage'

// Import Ventas

import CreateSalePage from "../../features/sales/pages/CreateSalePage";
// ------

// Imports de proveedores

import CreateProductPage from "../../features/products/pages/CreateProductPage";
import { SuppliersPage } from "@/features/suppliers";
import FormMedicamentos from "../../features/products/pages/CreateProductPage";
import SuppliersListPage from "@/features/suppliers/pages/SupplierListPage";
import SuppliersDetailPage from "@/features/suppliers/pages/SuppliersDetailPage";
// ------
import ProductDetailPage from "../../features/products/pages/ProductDetailPage";


const router = createBrowserRouter ([
    
    {
        path: "/",
        element: <HomePage/>
    },
    {
        
        
        element: <MainLayout/>,
        children: [
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
                element: <CreateProductPage/>
            },
            {
                path: "medi",
                element: <CreateProductPage/>
            },
            {
                path: "formulario-ver",
                element: <ProductDetailPage/>
            },
            {
                path: "ventas",
                element: <CreateSalePage/>
            },
            {
                path: "perfil",
                element: <ProfilePage/> //Definir pagina
            },
            {
                path: "usuarios",
                element: <UserListPage/>
            },
                        {
                path: "crear-usuarios",
                element: <CreateUserPage/> 
            },
            {
                path: "ver-usuarios",
                element: <ProfileUserPage/> 
            },

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