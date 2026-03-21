import DataTable from "@/shared/components/DataTable"
import { ProductsColumns } from "../table/ProductsColumns"
import { Button, Title } from "@/shared/components"
import { Link } from "react-router-dom"
import { products } from "@/data/products/products"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import ReportConfigModal from "../reports/components/ReportConfigModal"

export default function ListProductsPage() {

    const[isReportModalOpen, setIsReportModalOpen] = useState(false)
    
    const Navigate = useNavigate ()

    return (
        <div
            className="relative grid gap-6 bg-white rounded-xl shadow-2xl p-4
        ">
            <Title
                title="Lista de Medicamentos"
            />
        <div className="flex justify-end gap-6">
                <div className="border rounded-xl h-12 w-auto px-4 flex items-center">
                    <Link to="/crear-medicamento" className="hover:text-text-primary transition hover:underline hover:underline-offset-2">
                        Crear Medicamento
                    </Link>
                </div>
                <div>
                    <Button
                        variant="primary"
                        onClick={() => setIsReportModalOpen(true)}
                    >
                        Generar Reporte
                    </Button>
                    <ReportConfigModal
                        isOpen={isReportModalOpen}
                        onClose={() => setIsReportModalOpen(false)}
                    />
                </div>
            </div>
        <DataTable
            data={products}
            columns={ProductsColumns}
        />
        <div>
                <Button 
                    variant = "secondary"
                    onClick = {() => Navigate(-1)}
                    >Regresar</Button>
        </div>


        </div>
    )
}
