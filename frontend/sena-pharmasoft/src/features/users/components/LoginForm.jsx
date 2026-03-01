import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import { Link } from "react-router-dom";


export default function LoginForm(){


    return(
        <div>
            {/* Formulario para crear el usuario */}
            <form className="
            px-6 py-12 
            grid grid-cols-1 gap-6
            bg-white
            dark:bg-brand-soft/40
            ring-1
            ring-brand-soft/80
            rounded-xl
            font-main
            w-90
            h-100
            "
            >
            <h1 className="text-general-title text-brand-hover font-extrabold text-center">Iniciar sesion</h1>
                <Input
                    label="Email"
                    placeholder="Ingresa tu correo"
                >
                </Input>
                <Input
                    label="Contraseña"
                    type='password'
                    placeholder="Ingresa su contraseña"
                >
                </Input>
            <Link to="/forgot-password" className="text-info-regular text-center underline text-secondary text-brand-hover hover:font-extrabold">
              ¿Olvidaste tu contraseña?
            </Link>
                {/* Actions */}
                <div className= "flex items-center justify-center gap-12">
                    <Button
                        type="submit"
                        variant = "secondary"
                        size = "md"
                    >
                        Iniciar sesion
                    </Button>
                </div>
            </form>
        </div>
    )
}