// Lista de usuarios con opcion de editar, desabilitar o habilitar usuarios
import { Button, Title } from "@/shared/components"
import { Link } from "react-router-dom"
import ReportConfigModal from "../reports/components/ReportConfigModal"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserColumns } from "../table/UserColumns"
import { users } from "@/data/users/users"
import DataTable from "@/shared/components/DataTable"

export default function UserListPage (){

    const [ IsReportModalOpen, setIsReportModalOpen] = useState(false)   
    const navigate = useNavigate();

    return(
        <div className="relative grid gap-6 bg-white rounded-xl shadow-2xl p-4 w-350 h-150">
            <Title title="Modulo de Usuarios"/>
                <div className="flex justify-between gap-6 items-center">
                    <div className="flex px-4">
                        <Button 
                            variant = "secondary"
                            size = 'sm'
                            onClick = {() => navigate(-1)}
                        >Regresar</Button>
                    </div>
                    <div className="flex px-10 gap-6 items-center">
                        <Button
                            variant= "primary"
                            onClick = {() => setIsReportModalOpen(true)}
                            >Generar reporte
                        </Button>
                        <Link
                            to = '/crear-usuarios'
                        >
                            Crear Usuario
                        </Link>
                    </div>
                        <ReportConfigModal
                            isOpen = {IsReportModalOpen}
                            onClose = {() => setIsReportModalOpen(false)}
                        ></ReportConfigModal>
                </div>
                    <div className="flex gap-6">
                        <div className="w-full h-full ">
                            <DataTable
                                data={users}
                                columns={UserColumns}
                            />
                        </div>
                    </div>
            </div>
        )
    }