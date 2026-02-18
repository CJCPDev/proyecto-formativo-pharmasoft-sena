import Input from "../../../shared/components/Input"

export default function SuppliersForm (){
    return (
        <div>
            {/* Formulario para crear proveedores */}
            <form className="
            grid grid-cols-1 md:grid-cols-6 gap-x-4
            "
            >   
                <div className=" col-span-3">

                <Input
                    label = "input temporal"
                    >
                </Input>
                </div>
                <div className="col-span-3">
                <Input
                    label = "Documento de identidad"
                    placeholder = "Ingrese el documento"
                    >
                </Input>
                </div>
                <div className=" col-span-6">
                <Input
                    label = "Razón social"
                    placeholder = "Ingrese la razón social"
                    >
                </Input>
                </div>
                <div className=" col-span-2">
                <Input
                    label = "Teléfono de contacto"
                    placeholder = "Ingrese el número de teléfono"
                    type = "tel"
                    >
                </Input>
                </div>
                <div className="col-span-2">
                <Input
                    label = "Ciudad"
                    placeholder = "Ingrese la ciudad"
                    >
                </Input>
                </div>
                <div className="col-span-2">
                <Input
                    label = "input temporal"
                    >
                </Input>
                </div>
                <div className="col-span-6">
                <Input
                    label = "Dirección"
                    placeholder = "Ingrese la dirección del proveedor"
                    >
                </Input>
                </div>
                <div className="col-span-6">
                <Input
                    label = "Correo electrónico"
                    placeholder = "Ingrese el correo del contacto"
                    type = "email"
                    >
                </Input>
                </div>
                <div className="col-span-6">
                <Input
                    label = "Nombre del contacto"
                    placeholder = "Ingrese el nombre del contacto"
                    >
                </Input>
                </div>
            </form>
        </div>
    )
}