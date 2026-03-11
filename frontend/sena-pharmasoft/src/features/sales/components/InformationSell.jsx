import {Title, Input, Select, Button} from "@/shared/components"


export default function SaleForm(){



    return(
        <div className="bg-white grid gap-2 w-full h-full p-6 rounded-lg font-main">
            <div>
                <Title
                    title="Productos"
                ></Title>
                <div className="grid grid-cols-2 gap-6 p-2 w-full">                   
                    <div>
                        <table>
                            <th className="flex- gap-4">
                                <td>Producto</td>
                                <td>Cantidad</td>
                                <td>Valor Und</td>
                                <td>Iva</td>
                                <td>Valor Total</td>
                            </th>
                        </table>
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