import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../../shared//layout/MainLayout";
import AuthLayout from "../../shared/layout/AuthLayout";
import { HomePage } from "@/features/home";
import { DashboardPage } from "@/features/dashboard"

import ProfilePage from "../../features/users/pages/ProfileUserPage";

// Imports de Login

import LoginPage from "../../features/auth/pages/LoginPage";
import ForgotPasswordPage from "../../features/auth/components/ForgotPasswordForm"
import ResetPasswordPage from "../../features/auth/components/ResetPasswordForm"
import Loading from "../../shared/components/Loading";
import AutoricedPage from "../../features/auth/pages/AutoricedPage";

import ConfirmationPassword from "../../features/auth/components/ConfirmationPassword";


//  imports de usuarios
import { UserListPage } from "@/features/users";
import { CreateUserPage } from "@/features/users";
import { ProfileUserPage } from "@/features/users";
import { EditUserPage } from "@/features/users";
import { UserReportPage } from "@/features/users";


// Import Ventas

import CreateSalePage from "../../features/sales/pages/CreateSalePage";
import ListSalePage from "@/features/sales/pages/ListSalePage";
import SaleDetailPage from "@/features/sales/pages/SaleDetailPage"
import ListSellPage from "@/features/sales/pages/ListSellPage"
// ------

// Imports de proveedores

import { SuppliersPage } from "@/features/suppliers";
import SuppliersListPage from "@/features/suppliers/pages/SupplierListPage";
import SuppliersDetailPage from "@/features/suppliers/pages/SuppliersDetailPage";
import SupplierEditPage from "../../features/suppliers/pages/SupplierEditPage";
import SuppliersReportPage from "../../features/suppliers/pages/SuppliersReportPage";

// ------
import CreateProductPage from "../../features/products/pages/CreateProductPage";
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
                path: "DashboardMain",
                element: <AutoricedPage/> 
            },
            {
                path: "crear-proveedor",
                element: <SuppliersPage/> 
            },
            {
                path: "listar-proveedor",
                element: <SuppliersListPage/> 
            },
            {
                path: "reportar-proveedor",
                element: <SuppliersReportPage/> 
            },
            {
                path: "ver-proveedor/:id",
                element: <SuppliersDetailPage/> 
            },
            {
                path: "ver-proveedor/:id/editar",
                element: <SupplierEditPage/> 
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
                path: "listar-ventas",
                element: <ListSalePage/>
            },
            {
                path: "ver-venta",
                element: <SaleDetailPage/>
            },
            {
                path: "crear-venta",
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
                path: "generar-reporte",
                element: <UserReportPage/> 
            },
            {
                path: "editar-usuarios/:id",
                element: <EditUserPage/> 
            },
            {
                path: "ver-usuarios/:id",
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