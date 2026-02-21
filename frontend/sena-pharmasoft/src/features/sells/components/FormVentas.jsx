import Input from '../../../shared/components/Input'
import Select from '../../../features/sells/components/Select'
import SelectState from '../../../features/sells/components/SelectState'
import Button from '../../../shared/components/Button'
import '@/features/users/services/selectService'
import { useEffect, useState } from 'react'
import { getPharmaUsers } from '../services/selectService'
import { getState } from '../services/selectState'


export default function FormVentas(){

        const [pharmaUsers, setPharmaUsers] = useState([])
        const [states, setStates] = useState([])

    useEffect(() => {
        getPharmaUsers().then(setPharmaUsers)
    },[]);

    useEffect(() => {
    getState().then(setStates)
    },[]);



    return (
        <div className="flex flex-col bg-white rounded-xl h-auto justify-items-center border border-white">
            <h1 className="font-extrabold flex justify-center items-center">Filtros</h1>
            {/* Formulario para crear el usuario*/}
            <form className="grid justify-items-center p-2 w-full">
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
                    <Select
                    disable selected
                    options={pharmaUsers}/>
                    <SelectState
                    disable selected
                    options={states}/>
                    <div className='flex justify-center'>
                    <Button
                    variant='primary'
                    size='sm'>
                        Filtrar
                    </Button>

                    </div>
                </div>           
            </form>
        </div>
    )
}

