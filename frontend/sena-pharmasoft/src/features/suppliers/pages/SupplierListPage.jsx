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

    return (
        <div className="relative grid gap-6 bg-white rounded-xl shadow-2xl p-4 w-full max-w-7xl mx-auto min-h-screen md:min-h-0">
            <Title title="Modulo de Proveedores" />

            <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                <div className="px-4">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate("/DashboardMain")}
                    >
                        Regresar
                    </Button>
                </div>
                <div className="flex sm:flex-row px-4 sm:px-10 gap-4 items-start sm:items-center w-full sm:w-auto">
                    <Button
                        variant="primary"
                        onClick={() => setIsReportModalOpen(true)}
                    >
                        Generar reporte
                    </Button>
                    <Button
                        onClick={() => navigate("/crear-proveedor")}
                        variant="primary"
                    >
                        Crear Proveedor
                    </Button>
                </div>
                <ReportConfigModal
                    isOpen={isReportModalOpen}
                    onClose={() => setIsReportModalOpen(false)}
                />
            </div>
            <div className="w-full overflow-x-auto p-4">
                <DataTable
                    data={suppliers}
                    columns={SupplierColumns}
                />
            </div>
        </div>
    );
}