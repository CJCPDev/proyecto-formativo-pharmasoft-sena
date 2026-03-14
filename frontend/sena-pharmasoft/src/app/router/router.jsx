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
// ------
import { UserListPage } from "../../features/users";
import CreateUserPage from '../../features/users/pages/CreateUserPage'

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
// ------

// Imports de Productos
import CreateProductPage from "../../features/products/pages/CreateProductPage";
// import FormMedicamentos from "../../features/products/pages/CreateProductPage";
import MedicamentListPage from "../../features/products/pages/MedicamentListPage";
import ProductDetailPage from "../../features/products/pages/ProductDetailPage";
import EditProductPage from "../../features/products/pages/EditProductPage";
import ProductReportPage from "../../features/products/pages/ProductReportsPage";


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
                element: <MedicamentListPage />
            },
            {
                path: "crear-medicamento",
                element: <CreateProductPage/>
            },
            {
                path: "ver-medicamento/:id",
                element: <ProductDetailPage/>
            },
            {
                path: "editar-medicamento/:id",
                element: <EditProductPage/>
            },
            {
                path: "generar-reporte",
                element: <ProductReportPage/>
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
                path: "ver-usuarios",
                // element: <ProfileUserPage/> 
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