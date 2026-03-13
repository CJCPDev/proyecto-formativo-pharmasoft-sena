import { Button, Title } from "@/shared/components"
import { Link } from "react-router-dom"
export default function SuppliersListPage (){
    return(
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
                <div className="border rounded-xl h-12 w-auto px-4 flex items-center">
                    <Link to="/ver-medicamento" className="hover:text-text-primary transition hover:underline hover:underline-offset-2">
                        Ver Medicamento
                    </Link>
                </div>
            </div>
            <div className="flex gap-12">
                <div className="w-100 h-52 border-2 border-black rounded-3xl">
                    <table> 

                    </table>
                </div>
                <div className="w-xl h-80 border-2 border-black rounded-3xl">
                    <table> 

                    </table>
                </div>
            </div>
            <div>
                <Button variant = "secondary">Regresar</Button>
            </div>
        </div>
    )
}