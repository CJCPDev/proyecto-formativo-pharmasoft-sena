import DataTable from "@/shared/components/DataTable"
import {SellColumns}  from "@/features/sales"
import { ventas } from "@/data/sells/sells"
import { useState } from "react"
import ReportConfigModal from "../reports/components/ReportConfigModal"
import { Button } from "../../../shared/components"





export default function SalesReportPage (){

        const [ IsReportModalOpen, setIsReportModalOpen] = useState(false)

    return(
        <div className="p-6">

        <h1 className="text-xl font-semibold mb-4">
            Usuarios
        </h1>

            <Button
                variant= "primary"
                onClick = {() => setIsReportModalOpen(true)}
            >generar reporte</Button>

        <DataTable
            data={ventas}
            columns={SellColumns}
        />

        <ReportConfigModal
            isOpen = {IsReportModalOpen}
            onClose = {() => setIsReportModalOpen(false)}
        ></ReportConfigModal>

        </div>
    )
}