import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../../shared//layout/MainLayout";
import AuthLayout from "../../shared/layout/AuthLayout";
import HomePage from "../../features/home/pages/HomePage";
import LoginPage from "../../features/auth/pages/LoginPage";
import ForgotPasswordPage from "../../features/auth/components/ForgotPasswordForm"
import ResetPasswordPage from "../../features/auth/components/ResetPasswordForm"
import Loading from "../../shared/components/Loading";
import ValidationResetPassword from "../../features/auth/pages/ValidationResetPassword"
// import UserForm from "../../features/users/components/UserForm";
import ProfilePage from "../../features/users/pages/ProfilePage";
import CreateUserPage from "../../features/users/pages/CreateUserPage";


const router = createBrowserRouter ([
    {
    
        
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element: <HomePage/>
            },
            
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
                element: <ValidationResetPassword/>
            },
    ]

},
]);

export default router;