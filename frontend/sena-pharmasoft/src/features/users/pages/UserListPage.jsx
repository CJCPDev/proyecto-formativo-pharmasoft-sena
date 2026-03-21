// Lista de usuarios con opcion de editar, desabilitar o habilitar usuarios
import { Button, Title } from "@/shared/components"
import { Link } from "react-router-dom"
import ListUserPage from "./ListUserPage"
import { useNavigate } from "react-router-dom"

export default function ListSalePage (){

    const navigate = useNavigate();

    return(
        <div
            className="relative grid gap-6 bg-white rounded-xl shadow-2xl p-2 w-350 h-150
        ">
            <Title
                title="Lista de Usuarios"
            />
            <div className="flex justify-end gap-6">
                <div className="border rounded-xl h-12 w-auto px-4 flex items-center">
                    <Link to="/crear-usuarios" className="hover:text-text-primary transition hover:underline hover:underline-offset-2">
                        Crear Usuario
                    </Link>
                </div>
                <div className="border rounded-xl h-12 w-auto px-4 flex items-center">
                    <Link to="/generar-reporte" className="hover:text-text-primary transition hover:underline hover:underline-offset-2">
                        Generar reporte
                    </Link>
                </div>
            </div>
            <div className="flex gap-6">
                {/* <div className="w-100 h-full border-2 border-black rounded-3xl">
                    <table> 

                    </table>
                </div> */}
                <div className="w-full h-full border-2 border-black rounded-3xl">
                    <ListUserPage/>
                </div>
            </div>
            <div>
                <Button
                variant = "secondary"
                onClick = {( ) => navigate(-1)}
                >Regresar</Button>
            </div>
        </div>
    )
}