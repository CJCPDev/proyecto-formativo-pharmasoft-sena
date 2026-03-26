import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../../shared//layout/MainLayout";
import AuthLayout from "../../shared/layout/AuthLayout";
import { HomePage } from "@/features/home";
import { DashboardPage } from "@/features/dashboard"

import ProfilePage from "../../features/users/pages/ProfilePage";   

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
import PermissionsPage from "../../features/users/pages/PermissionsPage";


// Import Ventas

import CreateSalePage from "../../features/sales/pages/CreateSalePage";
import ListSalePage from "@/features/sales/pages/ListSalePage";
import SaleDetailPage from "@/features/sales/pages/SaleDetailPage"
import SalesEditPage from "../../features/sales/pages/SalesEditPage";


// ------

// Imports de proveedores

import { SuppliersPage } from "@/features/suppliers";
import SuppliersListPage from "@/features/suppliers/pages/SupplierListPage";
import SuppliersDetailPage from "@/features/suppliers/pages/SuppliersDetailPage";
import SupplierEditPage from "../../features/suppliers/pages/SupplierEditPage";
import SuppliersReportPage from "../../features/suppliers/pages/SuppliersReportPage";

// ------

// Imports de Productos
import CreateProductPage from "../../features/products/admin/pages/CreateProductPage";
import AdminProductListPage from "../../features/products/admin/pages/AdminProductListPage";
import ProductDetailPage from "../../features/products/admin/pages/ProductDetailPage";
import ProductsEditPage from "../../features/products/admin/pages/ProductsEditPage";
import AdminProductReportPage from "../../features/products/admin/pages/AdminProductReportPage";
import DetailProductPage from "@/features/products/pages/DetailProductPage";



const router = createBrowserRouter ([
    
    {
        path: "/",
        element: <HomePage/>
    },
    {
        path: "ver-card/:id",
        element: <DetailProductPage/>
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
                element: <AdminProductListPage />
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
                element: <ProductsEditPage />
            },
            {
                path: "generar-reporte",
                element: <AdminProductReportPage/>
            },
            {
                path: "listar-ventas",
                element: <ListSalePage/>
            },
            {
                path: "ver-venta/:id/editar",
                element: <CreateSalePage/> 
            },
            {
                path: "ver-venta/:id",
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
            {
                path: "permisos",
                element: <PermissionsPage/> 
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