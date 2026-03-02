import MainLayout from "../../shared//layout/MainLayout";
import AuthLayout from "../../shared/layout/AuthLayout";
import AuthLayoutUser from "../../shared/layout/AuthLayoutUser";
import HomePage from "../../features/home/pages/HomePage";
import ProfilePage from "../../features/users/pages/ProfilePage";
import LoginForm from "../../features/users/components/LoginForm";
import ForgetPassword from "../../features/users/components/ForgetPassword";
import UserForm from "../../features/users/components/UserForm";
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter ([
    {
    
        
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element: <HomePage/>
            },
            {
                path: "usuarios",
                element: <AuthLayoutUser/>
            },
            {
                path: "proveedores",
                element: <h1 className="p-4">Proveedores</h1>
            },
            {
                path: "medicamentos",
                element: <h1 className="p-4">Medicamentos</h1>
            },
            {
                path: "ventas",
                element: <h1 className="p-4">Ventas</h1>
            },
            {
                path: "carrito",
                element: <h1 className="p-4">Carrito de ventas</h1>
            },
            {
                path: "perfil",
                element: <AuthLayout/>
            }
        ]
    },
    {
        element: <AuthLayout/>,
        children: [
            {
                path: "perfil",
                element: <AuthLayout/>
            },
            {
                path: "forgot-password",
                element: <ForgetPassword/>
            },
            {
                path: "reset-password",
                element: <h1 className="p-4">Cambiar contraseña</h1>
            },
    ]

},
    {
        element: <AuthLayoutUser/>,
        children: [
            {
                path: "usuarios",
                element: <UserForm/>
            },
    ]
    }
]);

export default router;