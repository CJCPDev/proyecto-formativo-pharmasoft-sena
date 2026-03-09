import Input from "../../../shared/components/Input"
import Button from "../../../shared/components/Button"
import Select from "../../../shared/components/Select"


export default function SaleForm(){



    return(
        <div className="flex flex-col text-center font-main">
            <div >
                <h1 className=" text-brand-hover font-extrabold text-general-title">Creacion de venta</h1>
                <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="grid gap-4">
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
                            placeholder='Número de factura'
                        />
                        <Select
                        
                        />
                        <Select
                        
                        />
                        <Select
                        
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <Input
                            type='datetime-local'
                            placeholder='Número de factura'
                            />
                        <Select
                        
                        />
                    </div>                    
                </div>
                <div>
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
                <Button>Añadir Producto</Button>
            </div>
        </div>
    )
}