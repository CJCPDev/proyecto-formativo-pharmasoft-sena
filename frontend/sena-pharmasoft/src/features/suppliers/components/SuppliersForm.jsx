// Importación de componentes creados anteriormente en la capeta shared
// importación de los estados useState y useEffect de reac
// Importacion de la funcion que contiene el json para los selects

/* import Input from "../../../shared/components/Input"
import Select from "../../../shared/components/Select"
import Button from "../../../shared/components/Button" */
import { useEffect, useState } from "react"
import { getSuppliersState } from "../services/selectService"
import { Title, Input, Select, Button } from "@/shared/components"


export default function SuppliersForm (){

    const [suppliersState, setSuppliersState] = useState ([])

    useEffect (() => {
        getSuppliersState().then(setSuppliersState)
    }, []);


    return (
        // {/* Formulario para crear proveedores */}
        <form className="flex flex-col gap-6 w-175 px-4 py-6 font-main">
            <Title
                title="Crear proveedor"
            />


{/*             <h1 className="w-full text-center text-text-primary font-bold text-3xl">
                Crear Proveedor
            </h1> */}

            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                
                <Input
                label="NIT"
                placeholder="Ingrese el NIT de la empresa"
                />

                <Input
                label="Documento de identidad"
                placeholder="Ingrese el documento"
                />

                <Input
                label="Razón social"
                placeholder="Ingrese la razón social"
                />

                <Input
                label="Dirección"
                placeholder="Ingrese la dirección del proveedor"
                />

                <div className="col-span-2">
                    <Input
                    label="Correo electrónico"
                    placeholder="Ingrese el correo del contacto"
                    type="email"
                    />
                </div>

                <Input
                label="Teléfono de contacto"
                placeholder="Ingrese el número de teléfono"
                type="tel"
                />

                <Select
                label="Estado"
                name="suppliersState"
                options={suppliersState}
                />

                <Input
                label="Ciudad"
                placeholder="Ingrese la ciudad"
                />

                <Input
                label="Nombre del contacto"
                placeholder="Ingrese el nombre del contacto"
                />

            </div>

            <div className="flex gap-6 justify-center items-center">
                <Button variant="secondary" size="sm">
                Regresar
                </Button>
                <Button variant="primary" size="md" type="submit">
                Crear
                </Button>
            </div>

        </form>
    )
}