import  {Button, Input} from '@/shared/components'
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { login } from "../services/authService";


export default function LoginForm(){

    const navigate = useNavigate();

    //Estado del formulario
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    //Estado para mostrar errores
    const [error, setError] = useState(null);

    //Estado para mostrar el loading mientas inicia sesión
    const [loading, setLoading] = useState(false);

    //Actualiza el estado cuando el usuario escribe
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    //Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try{
            const data = await login(formData.email, formData.password);

            //Redirigimos según el rol del usuario
            if (data.usuario.id_rol === 5) {
                //Administrador va al dashboard principal
                navigate('/DashboardMain');
            } else if (data.usuario.id_rol === 7) {
                //Farmaceuta por definir ruta
                navigate('/medicamentos')
            }
        } catch (error) {
            //Mostramos el mensjde de error que devuelve Django
            const mensaje = error.response?.data.error || "Error al iniciar sesión";
            setError(mensaje);
        } finally {
            setLoading(false);
        }
    };


    return(
        <div className="">
            <form 
            onSubmit={handleSubmit}
            className="
            relative
            px-6 py-12 
            grid grid-cols-1 gap-6
            bg-white
            shadow-2xl
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                >
                </Input>
                <Input
                    label="Contraseña"
                    type='password'
                    placeholder="Ingresa su contraseña"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                >
                </Input>

            {/* Mensaje de error si las credenciales son incorrectas */}
            {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Link to="/forgot-password" className="text-info-regular text-center underline text-secondary text-brand-hover hover:font-extrabold">
              ¿Olvidaste tu contraseña?
            </Link>
                <div className= "flex items-center justify-center gap-12">
                    <Button
                        variant = "secondary"
                        size = "md"
                        type = "submit"
                        disabled = {loading}
                    >
                        {loading ? "Iniciando..." : "Iniciar sesión"}
                        {/* Iniciar sesion */}
                    </Button>
                </div>
            </form>
        </div>
    )
}