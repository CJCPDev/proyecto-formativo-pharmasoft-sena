import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDocumentTypes } from "../services/selectService";

export default function LoginForm(){

    const [documentTypes, setDocumentTypes] = useState([])
    useEffect (() =>{
        getDocumentTypes().then(setDocumentTypes)
    }, []);
    // const hundleNameChange = (e) => {
    //     console.log("Nombre del usuario: ", e.target.value)
    // };
    
    const hundleEmailBlur = (e) => {
        console.log("email del usuario: ", e.target.value)
    };
    const hundleSubmit = (e) => {
        console.log("formulario enviado: ", e.target.value)
    };
    
    // una validación básica
    const hundleNameChange = (e) => {
        console.log("Nombre del usuario: ", e.target.value)
        if (e.target.value === ""){
            console.log(`este campo no puede estar vacio`)
        }
    };

    return(
        <div>
            {/* Formulario para crear el usuario */}
            <form className="
            px-6 py-12 
            grid grid-cols-1 gap-6
            bg-white
            dark:bg-brand-hover/80
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
                    onChange={hundleNameChange}
                >
                </Input>
                <Input
                    label="Contraseña"
                    type='password'
                    placeholder="Ingresa su contraseña"
                    onBlur={hundleEmailBlur}
                >
                </Input>
            <Link to="/forgot-password" className="text-info-regular text-center underline text-secondary text-brand-hover hover:text-info-general">
              ¿Olvidaste tu contraseña?
            </Link>
                {/* Actions */}
                <div className= "flex items-center justify-center gap-12">
                    <Button
                        type="submit"
                        variant = "primary"
                        size = "md"
                        onSubmit={hundleSubmit}
                    >
                        Iniciar sesion
                    </Button>
                </div>
            </form>
        </div>
    )
}