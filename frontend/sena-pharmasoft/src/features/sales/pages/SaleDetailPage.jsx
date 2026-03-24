import { ventas } from "@/data/sells/sells.js"
import CardSale from "../components/CardSale"

export default function SaleDetailPage (){
    {/* se renderiza una card por id */}
    const sale = ventas.find(prod => prod.id === 1)
    return(
            <div>
                <div className="relative bg-white rounded-xl shadow-2xl">
                    {sale && <CardSale sale = {sale}/>}
                </div>
            </div>
    )
}