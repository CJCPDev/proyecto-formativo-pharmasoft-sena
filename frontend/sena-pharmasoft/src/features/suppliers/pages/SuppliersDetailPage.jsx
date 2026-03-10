import { suppliers } from "@/data/suppliers/suppliers.js"
import CardSupplier from "../components/CardSupplier"

export default function SuppliersDetailPage (){
    {/* se renderiza una card por id */}
    const supplier = suppliers.find(prod => prod.id === 1)
    return(
            <div>
                <div className="relative bg-white rounded-xl shadow-2xl">
                    {supplier && <CardSupplier supplier = {supplier}/>}
                </div>
            </div>
    )
}