import { InformationSale, SaleForm } from "../index"
import { Button } from "@/shared/components"
import { useNavigate } from "react-router-dom"

export default function CreateSalePage(){
    const navigate = useNavigate()

    return(
        <div className="flex absolute w-350 shadow-2xl m-6 rounded-lg">
            <div className="flex flex-row w-full justify-between gap-6 p-6 px-8">
                <div className="w-300 border border-brand-hover/20 rounded-lg">
                    <div className="p-2">
                            <Button 
                                variant = "secondary"
                                size = 'sm'
                                onClick = {() => navigate(-1)}
                            >Atras</Button>
                    </div>
                    <SaleForm className="flex justify-items-center rounded-2xl"/>
                </div>
                <div className="w-full border border-brand-hover/20 rounded-lg">
                    <InformationSale className="flex justify-items-center"/> 
                </div>
            </div>
        </div>
    )
}


