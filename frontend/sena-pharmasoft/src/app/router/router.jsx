import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../shared//layout/MainLayout";
import AuthLayout from "../../shared/layout/AuthLayout";
import { HomePage } from "@/features/home";
import { DashboardPage } from "@/features/dashboard";
import { CarSellHome } from "@/features/home";

import ProfilePage from "../../features/users/pages/ProfilePage";

// Imports de Login

import LoginPage from "../../features/auth/pages/LoginPage";
import ForgotPasswordPage from "../../features/auth/components/ForgotPasswordForm";
import ResetPasswordPage from "../../features/auth/components/ResetPasswordForm";
import Loading from "../../shared/components/Loading";
import AutoricedPage from "../../features/auth/pages/AutoricedPage";

import ConfirmationPassword from "../../features/auth/components/ConfirmationPassword";

import ProtectedRoute from "../../shared/components/ProtectedRoute";

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
import SaleDetailPage from "@/features/sales/pages/SaleDetailPage";
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
import AdminProductDetailPage from "../../features/products/admin/pages/AdminProductDetailPage";
import ProductsEditPage from "../../features/products/admin/pages/ProductsEditPage";
import AdminProductReportPage from "../../features/products/admin/pages/AdminProductReportPage";
import DetailProductPage from "@/features/products/pages/DetailProductPage";

const router = createBrowserRouter([
    {
    path: "/",
    element: <HomePage />,
    },
    {
    path: "/CarSellHome",
    element: <CarSellHome/>,
    },
    {
    path: "ver-card/:id_medicamento",
    element: <DetailProductPage />,
    },
{
    element: <MainLayout />,
    children: [
                //Ruta protegida
                {
                    path: "DashboardMain",
                    element: (
                        <ProtectedRoute>
                                <AutoricedPage/>
                            </ProtectedRoute>
                        ) 
                    },
                    {
                        path: "crear-proveedor",
                        element: (
                            <ProtectedRoute>
                            <SuppliersPage/>
                        </ProtectedRoute> 
                        )
                    },
                    {
                        path: "listar-proveedor",
                        element: (
                            <ProtectedRoute>
                                <SuppliersListPage/>
                            </ProtectedRoute>
                        ) 
                    },
                    {
                        path: "reportar-proveedor",
                        element: (
                            <ProtectedRoute>
                                <SuppliersReportPage/> 
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: "ver-proveedor/:id",
                        element: (
                            <ProtectedRoute>
                                <SuppliersDetailPage/>
                            </ProtectedRoute>
                        ) 
                    },
                    {
                        path: "ver-proveedor/:id/editar",
                        element: (
                            <ProtectedRoute>
                                <SupplierEditPage/>
                            </ProtectedRoute>
                        ) 
                    },
                    {
                        path: "medicamentos",
                        element: (
                            <ProtectedRoute rolesPermitidos={[5, 7]}>
                                <AdminProductListPage />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: "crear-medicamento",
                        element: (
                            <ProtectedRoute>
                                <CreateProductPage/>
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: "ver-medicamento/:id",
                        element: (
                            <ProtectedRoute>
                                <AdminProductDetailPage/>
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: "editar-medicamento/:id",
                        element: (
                            <ProtectedRoute>
                                <ProductsEditPage/>
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: "generar-reporte",
                        element: (
                            <ProtectedRoute>
                                <AdminProductReportPage/>
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: "listar-ventas",
                        element: (
                            <ProtectedRoute>
                                <ListSalePage/>
                            </ProtectedRoute>
                        )
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
        
                    //Ruta protegida y con permiso de ingreso segun roll
                    {
                        path: "usuarios",
                        element: (
                        <ProtectedRoute rolesPermitidos={[5,7]}>
                            <UserListPage/>
                        </ProtectedRoute>
                        )
                    },
                    {
                        path: "crear-usuarios",
                        element: (
                            <ProtectedRoute rolesPermitidos={[5,7]}>
                                <CreateUserPage/> 
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: "generar-reporte",
                        element: (
                            <ProtectedRoute>
                                <UserReportPage/>
                            </ProtectedRoute>
                        ) 
                    },
                    {
                        path: "editar-usuarios/:id",
                        element: (
                            <ProtectedRoute rolesPermitidos={[5,7]}>
                                <EditUserPage/> 
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: "ver-usuarios/:id",
                        element: (
                            <ProtectedRoute rolesPermitidos={[5,7]}>
                                <ProfileUserPage/> 
                            </ProtectedRoute>
                        )
        
                    },
                    {
                        path: "permisos",
                        element: (
                            <ProtectedRoute rolesPermitidos={[5]}>
                                <PermissionsPage/> 
                            </ProtectedRoute>
                        )
                    },
                ],
            },
    {
    //Login con rutas completo
    element: <AuthLayout />,
    children: [
        {
        path: "perfil",
        element: <AuthLayout />,
        },
        {
        path: "login",
        element: <LoginPage />,
        },
        {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
        },
        {
        path: "reset-password",
        element: <ResetPasswordPage />,
        },
        {
        path: "validation",
        element: <Loading />,
        },
        {
        path: "validationPassword",
        element: <ConfirmationPassword />,
        },
    ],
    },

]);

export default router;
