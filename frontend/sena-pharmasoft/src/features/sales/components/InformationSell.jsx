import {Title, Input, Select, Button} from "@/shared/components"


export default function SaleForm(){



    return(
        <div className="bg-white grid gap-2 w-full h-full p-6 rounded-lg font-main">
            <div>
                <Title
                    title="Productos"
                ></Title>
                    <div className="grid grid-cols-5 w-full text-center bg-amber-700">
                        <span className="border border-l">Producto</span>
                        <span className="border border-l">Cantidad</span>
                        <span className="border border-l">Valor Und</span>
                        <span className="border border-l">Iva</span>
                        <span className="border border-l">Valor Total</span>
                    </div>
                    <div>
                        <span></span>
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