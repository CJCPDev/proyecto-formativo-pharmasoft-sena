
import CardSale from "../components/CardSale"
import CartModal from "../components/CartModal"

export default function SaleDetailPage (){

    return(
            <div>
                <div className="relative bg-white rounded-xl shadow-2xl">
                    <CardSale/>
                    <CartModal/>
                </div>
            </div>
    )
}