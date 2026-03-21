import { Button, Title, DataTable } from "@/shared/components"
import { Link, useNavigate } from "react-router-dom"
import { SupplierColumns } from "../table/SupplierColumns"
import { suppliers } from "@/data/suppliers/suppliers"
import { useState } from "react"
import  ReportConfigModal  from "../reports/components/ReportConfigModal"

export default function SuppliersListPage (){
    const navigate = useNavigate()
    const [isReportModalOpen, setIsReportModalOpen] = useState(false)
    return(
        <div
            className="relative grid gap-6 bg-white rounded-xl shadow-2xl p-4 w-350
        ">
            <Title
                title="Proveedores"
            />
            <div className="flex justify-end gap-6">
                <div className="border rounded-xl h-12 w-auto px-4 flex items-center">
                    <Link to="/crear-proveedor" className="hover:text-text-primary transition hover:underline hover:underline-offset-2">
                        Crear Proveedor
                    </Link>
                </div>
                <div>
                   <Button
                        variant= "primary"
                        onClick= {() => setIsReportModalOpen(true)}
                    >
                        Generar reporte
                    </Button>

                    <ReportConfigModal
                        isOpen= {isReportModalOpen}
                        onClose= {() => setIsReportModalOpen(false)}
                    />
                </div>
            </div>
            <div className="flex gap-6">
                <div className="w-full h-full  p-4">
                    <DataTable
                        data={suppliers}
                        columns={SupplierColumns}
                    />
                </div>
            </div>
            <div>
                <Button 
                    variant = "secondary"
                    onClick={() => navigate(-1)}
                >
                    Regresar
                </Button>
            </div>
        </div>
    )
}