import { InformationSale, SaleForm } from "../index"


export default function CreateSalePage(){


    return(
        <div className="flex absolute w-350 bg-red-800 shadow-2xl m-6">
            <div className="flex flex-row w-full justify-between bg-red-950 gap-6 p-6 px-8">
                <div className="w-200">
                    <SaleForm className="flex justify-items-center rounded-2xl"/>
                </div>
                <div className="w-full">
                    <InformationSale className="flex justify-items-center"/>
                </div>

            </div>
        </div>
    )
}


