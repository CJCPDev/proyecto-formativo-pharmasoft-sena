import { InformationSale, SaleForm } from "../index"
import { Card } from "@/shared/components"
import { products } from "@/features/home/services/products.js"

export default function CreateSalePage(){

    const product = products.find(prod => prod.id === 1)
    return(
        <div className="flex absolute w-350 shadow-2xl m-6 rounded-lg">
            <div className="flex flex-row w-full justify-between gap-6 p-6 px-8">
                <div className="w-200 border border-brand-hover/20 rounded-lg">
                    <SaleForm className="flex justify-items-center rounded-2xl"/>
                </div>
                <div className="w-full border border-brand-hover/20 rounded-lg">
                {/*     <InformationSale className="flex justify-items-center"/> */}
            <div className=" m-4 relative z-10 text-center text-text-inverse">

                    {/* se renderiza la lista qie contiene todas las card */}
                    { <Card product = {product}/>}
                </div>

                </div>

            </div>
        </div>
    )
}


