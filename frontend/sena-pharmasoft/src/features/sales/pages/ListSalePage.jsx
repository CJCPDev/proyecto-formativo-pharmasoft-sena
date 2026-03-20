import { Button, Title } from "@/shared/components"
import { Link } from "react-router-dom"
import ListSellPage from "./ListSellPage"
import { useState } from "react"
import ReportConfigModal from "../reports/components/ReportConfigModal"

export default function ListSalePage (){

    const [ IsReportModalOpen, setIsReportModalOpen] = useState(false)   

    return(
        <div
            className="relative grid gap-6 bg-white rounded-xl shadow-2xl p-2 w-350
        ">
            <Title
                title="Modulo de Ventas"
            />
            <div className="flex justify-end gap-6">
                <div className="border rounded-xl h-12 w-auto px-4 flex items-center">
                    <Link to="/crear-venta" className="hover:text-text-primary transition hover:underline hover:underline-offset-2">
                        Crear Venta
                    </Link>
                </div>
                <div>
                    <Button
                        variant= "secondary"
                        onClick = {() => setIsReportModalOpen(true)}
                    >Generar reporte</Button>

                    <ReportConfigModal
                            isOpen = {IsReportModalOpen}
                            onClose = {() => setIsReportModalOpen(false)}
                        ></ReportConfigModal>

                </div>
            </div>
            <div className="flex gap-6">

                <div className="w-full h-full border-2 border-black rounded-3xl">
                    <ListSellPage/>
                </div>
            </div>
            <div>
                <Button variant = "secondary">Regresar</Button>
            </div>
        </div>
    )
}