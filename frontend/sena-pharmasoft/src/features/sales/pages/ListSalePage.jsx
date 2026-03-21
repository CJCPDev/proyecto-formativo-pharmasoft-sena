import { Button, Title } from "@/shared/components"
import { Link } from "react-router-dom"
import { useState } from "react"
import ReportConfigModal from "../reports/components/ReportConfigModal"
import DataTable from "@/shared/components/DataTable"
import {SellColumns}  from "@/features/sales"
import { ventas } from "@/data/sells/sells"

export default function ListSalePage (){

    const [ IsReportModalOpen, setIsReportModalOpen] = useState(false)   

    return(
        <div className="relative grid gap-6 bg-white rounded-xl shadow-2xl p-4 w-350 mt-2">
            <Title title="Modulo de Ventas"/>
            <div className="flex justify-end gap-6">
                    <Button
                        variant= "primary"
                        onClick = {() => setIsReportModalOpen(true)}
                        >Generar reporte
                    </Button>
                <div className="border rounded-xl h-12 w-auto px-4 flex items-center">
                    <Link to="/crear-venta" className="hover:text-text-primary transition hover:underline hover:underline-offset-2">
                        Crear Venta
                    </Link>
                </div>
                <div>
                    <div>
                        <Button variant = "secondary">Regresar</Button>
                    </div>

                </div>
                    <ReportConfigModal
                            isOpen = {IsReportModalOpen}
                            onClose = {() => setIsReportModalOpen(false)}
                        ></ReportConfigModal>
            </div>
                    <div className="p-4">
                        <DataTable
                            data={ventas}
                            columns={SellColumns}
                        />
                    </div>
        </div>
    )
}