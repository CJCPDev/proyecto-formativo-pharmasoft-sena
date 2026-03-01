import { Outlet } from "react-router-dom"
import AuthLayout from "../../../shared/layout/AuthLayout"
import Input from "@/shared/components/Input";
import Button from '@/shared/components/Button'

export default function ForgetPassword(){


    return(
        <div className="absolute inset-x-150 z-10 bg-white w-100 h-100 text-center">
            <form>
                <div className="grid gap-6 text-main" >
                    <h1 className="text-brand-hover font-extrabold text-general-title">Recuperar contraseña</h1>
                    <p>Por favor ingrese el correo electrónico registrado para restablecer la contraseña.</p>
                </div>
                <Input
                type='email'
                />
                <Button
                variant = 'secondary'
                size = 'md'
                type='submit'
                >
                    Enviar token
                </Button>
            </form>
        </div>
    )
}