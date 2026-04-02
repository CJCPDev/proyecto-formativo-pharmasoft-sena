// Importación de componentes creados anteriormente en la capeta shared
// importación de los estados useState y useEffect de reac
// Importacion de la funcion que contiene el json para los selects
import { getSupplierById } from "../services/getSupplierById"
import { useEffect, useState } from "react"
import { supplierSchema } from "../schemas/supplierSchema"
import { getSuppliersState } from "../services/selectService"
import { createSupplier } from "../services/supplierService"
import { Title, Input, Select, Button } from "@/shared/components"
import { useParams, useNavigate } from "react-router-dom"


export default function SuppliersForm (){
    const navigate = useNavigate()
    const params = useParams()
    const isEdit = Boolean(params.id);
    const supplier = isEdit ? getSupplierById(params.id) : null;

    const [formData, setFormData] = useState({
        nit: supplier?.nit || "",
        nombre: supplier?.nombre || "",
        razonSocial: supplier?.razonSocial || "",
        direccion: supplier?.direccion || "",
        correo: supplier?.correo || "",
        telContacto: supplier?.telContacto || "",
        estado: supplier?.estado || "",
        ciudad: supplier?.ciudad || "",
        nombreContacto: supplier?.nombreContacto || ""
    });


    // Función que se ejecuta cada vez que cambia el valor de un input del formulario 
    const handleChange = (e) => { 
        // Se obtiene el nombre del campo (name) y su valor actual (value) 
        // desde el elemento que disparó el evento 
        const { name, value } = e.target; 
        // Se actualiza el estado del formulario 
        // prev representa el estado anterior del formulario 
        setFormData((prev) => ({ 
            // Se copian todos los valores anteriores del estado 
            ...prev, 
            // Se actualiza únicamente el campo que cambió 
            // [name] permite usar el nombre del input como clave dinámica 
            [name]: value, 
        }));
    };

    //============== HANDLE SUBMIT ============== 
    // Función que se ejecuta cuando se envía el formulario 
    const handleSubmit = async (e) => { 
        // Evita que el formulario recargue la página 
        e.preventDefault(); 
        // Se valida el objeto formData usando el esquema definido con Zod 
        // safeParse devuelve un objeto indicando si la validación fue exitosa o no 
        const result = supplierSchema.safeParse(formData); 
        // Si la validación falla 
        if (!result.success) { 
            // Objeto donde se almacenarán los errores por campo 
            const fieldErrors = {}; 
            // Zod devuelve los errores en un arreglo llamado issues 
            // Se recorren para asociar cada error a su campo correspondiente 
            result.error.issues.forEach((issue) => { 
                // issue.path contiene la ruta del campo que falló 
                const field = issue.path[0]; 
                // Se guarda el mensaje de error en el objeto fieldErrors 
                fieldErrors[field] = issue.message; 
            }); 
            // Se actualiza el estado de errores para mostrarlos en el formulario 
            setErrors(fieldErrors); 
            // Se detiene la ejecución porque el formulario tiene errores 
            return; 
        }
        // Si la validación es exitosa se limpian los errores anteriores 
        setErrors({}); 
        try {
            //AQUÍ SE CONSUME EL SERVICIO
            const dataToSend = {
                ...formData,
                estado: formData.estado === "Activo"
            };
            const data = await createSupplier(dataToSend);

            console.log("Proveedor creado:", data);

            navigate("/listar-proveedor");

        } catch (error) {
            console.error(error.message);

            // mostrar error general
            setErrors({ general: error.message });
        }
    };
    
    //Estados de los errores
    const [error, setErrors] = useState({})

    //estados del select estado
    const [suppliersState, setSuppliersState] = useState ([])
    useEffect (() => {
        getSuppliersState().then(setSuppliersState)
    }, []);


    return (
        // {/* Formulario para crear proveedores */}
        <form
            onSubmit={handleSubmit} 
            className="flex flex-col gap-6 w-175 px-4 py-6 font-main"  
        >
            {isEdit ? <Title title="Editar proveedor"/> : <Title title="Crear proveedor"/> }
            


{/*             <h1 className="w-full text-center text-text-primary font-bold text-3xl">
                Crear Proveedor
            </h1> */}

            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                
                <Input
                label="NIT"
                name="nit"
                placeholder="Ingrese el NIT de la empresa"
                value={formData.nit}
                onChange={handleChange}
                error={error.nit}
                />

                <Input
                label="Nombre"
                name="nombre"
                placeholder="Ingrese el nombre del proveedor"
                value={formData.nombre}
                onChange={handleChange}
                error={error.nombre}
                />

                <Input
                label="Razón social"
                name="razonSocial"
                placeholder="Ingrese la razón social"
                value={formData.razonSocial}
                onChange={handleChange}
                error={error.razonSocial}
                />

                <Input
                label="Dirección"
                name="direccion"
                placeholder="Ingrese la dirección del proveedor"
                value={formData.direccion}
                onChange={handleChange}
                error={error.direccion}
                />

                <div className="col-span-2">
                    <Input
                    label="Correo electrónico"
                    name="correo"
                    placeholder="Ingrese el correo del contacto"
                    value={formData.correo}
                    onChange={handleChange}
                    error={error.correo}
                    />
                </div>

                <Input
                label="Teléfono de contacto"
                name="telContacto"
                placeholder="Ingrese el número de teléfono"
                type="tel"
                value={formData.telContacto}
                onChange={handleChange}
                error={error.telContacto}
                />

                <Select
                label="Estado"
                name="estado"
                options={suppliersState}
                value={formData.estado}
                onChange={handleChange}
                error={error.estado}
                />

                <Input
                label="Ciudad"
                name="ciudad"
                placeholder="Ingrese la ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                error={error.ciudad}
                />

                <Input
                label="Nombre del contacto"
                name= "nombreContacto"
                placeholder="Ingrese el nombre del contacto"
                value={formData.nombreContacto}
                onChange={handleChange}
                error={error.nombreContacto}
                />

            </div>

            <div className="flex gap-6 justify-center items-center">
                {isEdit ? (
                    <>
                    <Button 
                        onClick={() => navigate(-1)}
                        variant="secondary" 
                        size="sm"
                    >
                        Cancelar
                    </Button>
                    <Button variant="primary" size="md" type="submit">
                        Actualizar
                    </Button>
                    </>
                ) : (
                    <>
                    <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => navigate(-1)}
                    >
                        Regresar
                    </Button>
                    <Button variant="primary" size="md" type="submit">
                        Crear
                    </Button>
                    </>
                )}
            </div>

        </form>
    )
}