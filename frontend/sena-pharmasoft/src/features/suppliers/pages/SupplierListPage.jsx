import { Button, Title, DataTable } from "@/shared/components"
import { Link, useNavigate } from "react-router-dom"
import { SupplierColumns } from "../table/SupplierColumns"
import { getAllSuppliers } from "../services/supplierService"
import { useState, useEffect } from "react"
import  ReportConfigModal  from "../reports/components/ReportConfigModal"

export default function SuppliersListPage (){
    const navigate = useNavigate()
    const [isReportModalOpen, setIsReportModalOpen] = useState(false)
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        getAllSuppliers().then(data => setSuppliers(data));
    }, []);
    return(
        <div
            className="relative grid gap-6 bg-white rounded-xl shadow-2xl p-4 w-350 h-150">
            <Title
                title="Modulo de Proveedores"
            />
            <div className="flex justify-between gap-6 items-center">
            <div className="flex px-4"> 
                <Button 
                    variant = "secondary"
                    size = 'sm'
                    onClick = {() => navigate("/DashboardMain")}
                >
                    Regresar
                </Button>
            </div>
                <div className="flex px-10 gap-6 items-center">
                   <Button
                        variant= "primary"
                        onClick= {() => setIsReportModalOpen(true)}
                    >
                        Generar reporte
                    </Button>
                    <Link to="/crear-proveedor"  className="w-40 relative inline-flex items-center justify-center rounded-xl transition-colors cursor-pointer h-10 px-4 before:absolute before:content-[''] before:-inset-y-[4px] before:-inset-x-[0px] font-main text-brand-soft font-semibold text-base bg-brand-hover hover:bg-brand-soft hover:text-brand-hover">
                    Crear Proveedor
                    </Link>
                </div>
                    <ReportConfigModal
                        isOpen= {isReportModalOpen}
                        onClose= {() => setIsReportModalOpen(false)}
                    />
            </div>
            <div className="flex gap-6">
                <div className="w-full h-full  p-4">
                    <DataTable
                        data={suppliers}
                        columns={SupplierColumns}
                    />
                </div>
            </div>
        </div>
    )
}