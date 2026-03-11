import {Title, Input, Select, Button} from "@/shared/components"
import userGroups from "../../../data/selects/userGroups.json"
import sellStates from "../../../data/selects/sellStates.json"
import paymentStates from "../../../data/selects/paymenStates.json"


export default function SaleForm(){



    return(
        <div className="font-main bg-white grid gap-2 w-full h-full p-6 rounded-lg">
            <div>
                <Title
                    title="Creacion de venta"
                ></Title>
                <div className="grid grid-cols-2 gap-6  w-full">
                    <div className="flex flex-col gap-3">
                        <Input
                            className="                    
                            w-full
                            h-10
                            relative
                            text-black/20
                            rounded-xl
                            bg-brand-soft/60
                            border
                            border-background
                            px-4
                            text-base"
                            placeholder='Número de factura'
                            disabled
                        />
                        <Select
                            label="Usuario"
                            name="userGroup"
                            options={userGroups}
                        />
                        <Select
                            label="Farmaceuta"
                            name="userGroup"
                            options={userGroups}
                        />
                        <Select
                            label="Estado"
                            name="sellStates"
                            options={sellStates}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Input
                            type='datetime-local'
                            placeholder='Número de factura'
                            />
                            <Select
                                label="Tipo de pago"
                                name="paymentStates"
                                options={paymentStates} 
                            />
                    </div>                    

                </div>
                <div className="pt-5">
                    <Input
                    className="  
                    w-full
                    h-10
                    relative
                    text-black
                    rounded-xl
                    bg-brand-soft/60
                    border
                    border-background
                    px-4
                    text-base"
                    disabled
                    placeholder='Producto'
                    />
                </div>
                <div className="grid text-center justify-items-center pt-2 ">
                    <Button>Añadir Producto</Button>
                </div>
            </div>
        </div>
    )
}