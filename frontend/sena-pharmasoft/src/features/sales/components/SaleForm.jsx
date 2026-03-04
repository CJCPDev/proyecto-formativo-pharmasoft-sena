import Input from "../../../shared/components/Input"
import Button from "../../../shared/components/Button"
import Select from "../../../shared/components/Select"


export default function SaleForm(){



    return(
        <div>
            <div>
                <h1>Creacion de venta</h1>
                <div>
                    <div>
                        <Input
                            disabled
                            placeholder='Número de factura'
                        />
                        <Input/>
                        <Input/>
                        <Input/>
                    </div>
                    <div>
                        <Input
                            type='datetime-local'
                            placeholder='Número de factura'
                        />
                        <Input/>
                    </div>                    
                </div>
                <div>
                    <Input/>
                </div>
                <Button></Button>
            </div>
        </div>
    )
}