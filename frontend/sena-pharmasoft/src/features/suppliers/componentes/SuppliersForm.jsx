// Importación de componentes creados anteriormente en la capeta shared
// importación de los estados useState y useEffect de reac
// Importacion de la funcion que contiene el json para los selects

import Input from "../../../shared/components/Input"
import Select from "../../../shared/components/Select"
import Button from "../../../shared/components/Button"
import { useEffect, useState } from "react"
import { getSuppliersState } from "../services/selectService"


export default function SuppliersForm (){

    const [suppliersState, setSuppliersState] = useState ([])

    useEffect (() => {
        getSuppliersState().then(setSuppliersState)
    }, []);


    return (
        // {/* Formulario para crear proveedores */}
        <form className="flex flex-col gap-6 w-175 px-4 py-6 ">
                {/* Contenedor de inputs y selects */}
                <div className="flex flex-col gap-3 w-full">  
                    <div className="flex gap-4">   {/*fila 1 (contenedor de 2 input)*/}
                        <Input
                            label = "NIT"
                            placeholder = "Ingrese el NIT de la empresa"
                            >
                        </Input>
                    
                        <Input
                            label = "Documento de identidad"
                            placeholder = "Ingrese el documento"
                            >
                        </Input>
                    </div>
                    <div className="flex gap-4"> {/*fila 2 (contenedor de 1 input)*/}
                        <Input
                            label = "Razón social"
                            placeholder = "Ingrese la razón social"
                            >
                        </Input>
                        <Input
                            label = "Dirección"
                            placeholder = "Ingrese la dirección del proveedor"
                            >
                        </Input>
                    </div>
                    <div className="flex "> {/*fila 3 (contenedor de 2 input y 1 select)*/}
                        <Input
                            label = "Teléfono de contacto"
                            placeholder = "Ingrese el número de teléfono"
                            type = "tel"
                            >
                        </Input>
                     
                        <Input
                            label = "Ciudad"
                            placeholder = "Ingrese la ciudad"
                            >
                        </Input>
        
                        <Select
                            label= "Estado"
                            name = "suppliersState"
                            options = {suppliersState}
                        >
                        </Select>
                    </div>
                    <div className="flex gap-4">   {/*fila 5 (contenedor de 1 input)*/}
                        <Input
                            label = "Correo electrónico"
                            placeholder = "Ingrese el correo del contacto"
                            type = "email"
                            >
                        </Input>
                        <Input
                            label = "Nombre del contacto"
                            placeholder = "Ingrese el nombre del contacto"
                            >
                        </Input>
                    </div>
                </div> 
                <div className="flex gap-6 justify-center items-center"> {/*contenedor de los 2 botones*/}
                    <Button
                        variant = "secondary"
                        size = "sm"

                    >
                        Regresar
                    </Button>
                    <Button
                        variant = "primary"
                        size = "md"
                        type = "submit"
                    >
                        Crear
                    </Button>
                </div>
            </form>
    )
}