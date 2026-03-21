import DataTable from "@/shared/components/DataTable"
import { ProductsColumns } from "../table/ProductsColumns"
import { products } from "@/data/products/products"
import { useState } from "react"

import ReportConfigModal from "../reports/components/ReportConfigModal"

export default function ListProductsPage() {

    const[isReportModalOpen, setIsReportModalOpen] = useState(false)

    return (
        <div className="p-6">

        <h1 className="text-xl font-semibold mb-4">
            Medicamentos
        </h1>
        <Button
            variant="primary"
            onClick={() => setIsReportModalOpen(true)}
        >
            Generar Reporte
        </Button>

        <DataTable
            data={products}
            columns={ProductsColumns}
        />

        <ReportConfigModal
            isOpen={isReportModalOpen}
            onClose={() => setIsReportModalOpen(false)}
        />

        </div>
    )
}
