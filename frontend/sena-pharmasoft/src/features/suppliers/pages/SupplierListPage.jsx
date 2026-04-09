import { Button, Title, DataTable } from "@/shared/components"
import { Link, useNavigate } from "react-router-dom"
import { SupplierColumns } from "../table/SupplierColumns"
import { useState, useEffect } from "react"
import  ReportConfigModal  from "../reports/components/ReportConfigModal"
import axios from "axios"

export default function SuppliersListPage (){
    const navigate = useNavigate()
    const [isReportModalOpen, setIsReportModalOpen] = useState(false)

    const [suppliers, setSuppliers] = useState([]) // 👈 estado real

useEffect(() => {
    axios.get("http://localhost:4000/api/suppliers")
        .then(res => {

            const dataTransformada = res.data.map(s => ({
                ...s,
                razonSocial: s.razonsocial,
                telContacto: s.telcontacto
            }))
console.log("RESPONSE:", res.data)
            setSuppliers(dataTransformada)
        })
}, [])

    return(
        <div className="relative grid gap-6 bg-white rounded-xl shadow-2xl p-4 w-350 h-150">
            <Title title="Modulo de Proveedores"/>

            <div className="flex justify-between gap-6 items-center">
                <div className="flex px-4"> 
                    <Button 
                        variant="secondary"
                        size='sm'
                        onClick={() => navigate("/DashboardMain")}
                    >
                        Regresar
                    </Button>
                </div>

                <div className="flex px-10 gap-6 items-center">
                    <Button
                        variant="primary"
                        onClick={() => setIsReportModalOpen(true)}
                    >
                        Generar reporte
                    </Button>

                    <Link to="/crear-proveedor" className="w-40 inline-flex items-center justify-center rounded-xl h-10 px-4">
                        Crear Proveedor
                    </Link>
                </div>

                <ReportConfigModal
                    isOpen={isReportModalOpen}
                    onClose={() => setIsReportModalOpen(false)}
                />
            </div>

            <div className="flex gap-6">
                <div className="w-full h-full p-4">
                    <DataTable
                        data={suppliers} // 👈 ahora viene de PostgreSQL
                        columns={SupplierColumns}
                    />
                </div>
            </div>
        </div>
    )
}