import Input from '../../../shared/components/Input'
import Select from '../../../shared/components/Select'


export default function FormVentas(){
    return (
        <div className="flex flex-col bg-white rounded-xl h-auto justify-items-center ">
            <h1 className="font-extrabold flex justify-center items-center">Filtros</h1>
            {/* Formulario para crear el usuario*/}
            <form className="grid justify-items-center p-2">
                <div className='grid grid-cols-1 gap-2'>
                    <Input
                    label='Número de factura'
                    placeholder='Número de factura'
                    />
                    <Input 
                    label='Cliente'
                    placeholder='Ingrese el documento'
                    />
                    <div className="grid grid-cols-2 w-80 gap-3">
                    <Input  
                    label='Fecha Inicial'
                    type='date'
                    />
                    <Input
                    label='Fecha Final'
                    type='date'
                    />    
                    </div>
                    <Select/>
                </div>           
            </form>
        </div>
    )
}

