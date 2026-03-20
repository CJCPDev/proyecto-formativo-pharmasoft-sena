// Lista de usuarios con opcion de editar, desabilitar o habilitar usuarios
import { Button, Title } from "@/shared/components"
import { Link } from "react-router-dom"
import ListUserPage from "./ListUserPage"
import ReportConfigModal from "../reports/components/ReportConfigModal"
import { useState } from "react"

export default function ListSalePage (){

    const [ IsReportModalOpen, setIsReportModalOpen ] = useState(false)

    return(
        <div
            className="relative grid gap-6 bg-white rounded-xl shadow-2xl p-2 w-350
        ">
            <Title
                title="Lista de Usuarios"
            />

            {/* <Button
                variant="primary"
                onClick={() => setIsReportModalOpen(true)}
            >
                Reportes
            </Button> */}

            <ReportConfigModal
                isOpen={IsReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
            />  


            <div className="flex justify-end gap-6">
                <div className="border rounded-xl h-12 w-auto px-4 flex items-center">
                    <Link to="/crear-usuarios" className="hover:text-text-primary transition hover:underline hover:underline-offset-2">
                        Crear Usuario
                    </Link>
                </div>
            <div className="border rounded-xl h-12 w-auto px-4 flex items-center">
                    {/* <Link to="/generar-reporte" className="hover:text-text-primary transition hover:underline hover:underline-offset-2">
                        Generar reporte
                    </Link> */}
                <Button
                    className="hover:text-text-primary transition hover:underline hover:underline-offset-2"
                    variant="primary"
                    onClick={() => setIsReportModalOpen(true)}
                >
                    Reportes
                </Button>
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
                <Button variant = "secondary">Regresar</Button>
            </div>
        </div>
    )
}