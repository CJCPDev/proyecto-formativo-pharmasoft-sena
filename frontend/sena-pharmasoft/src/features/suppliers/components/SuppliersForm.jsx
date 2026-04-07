import { useEffect, useState } from "react"
import { supplierSchema } from "../schemas/supplierSchema"
import { getSuppliersState, getDepartamentos, getMunicipios} from "../services/selectService"
import { Title, Input, Select, Button, Modal } from "@/shared/components"
import { useParams, useNavigate } from "react-router-dom"
import { createSupplier, updateSupplier, getSupplierById } from "../services/supplierService";

export default function SuppliersForm (){
    const navigate = useNavigate()
    const params = useParams()
    const isEdit = Boolean(params.id);
    const [serverError, setServerError] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        nit: "",
        nombre: "",
        razonSocial: "",
        direccion: "",
        correo: "",
        telefonoContacto: "",
        estado: "",
        ciudad: "",
        departamento: "",
        nombreContacto: ""
   });

    useEffect(() => {
        const fetchSupplier = async () => {
            if (isEdit) {
                try {
                    const data = await getSupplierById(params.id);
                    setFormData({
                        ...data,
                        estado: data.estado ? "Activo" : "Inactivo"
                    });
                } catch (error) {
                    console.error("Error cargando proveedor:", error);
                }
            }
        };

    fetchSupplier();
    }, [isEdit, params.id]);


    // Función que se ejecuta cada vez que cambia el valor de un input del formulario 
    const handleChange = (e) => { 
        // Se obtiene el nombre del campo (name) y su valor actual (value) 
        // desde el elemento que disparó el evento 
        const { name, value } = e.target; 
        if (name === "departamento") {
            setMunicipios([]);         // limpia municipios al cambiar departamento
            setFormData((prev) => ({
                ...prev,
                ciudad: "",            // también limpia la ciudad seleccionada
                departamento: value,
            }));
            return;
        }
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
        // result.data contiene los datos ya validados por Zod 
        try {
            const dataToSend = {
                ...formData,
                estado: formData.estado === "Activo"
            };
            if (isEdit) {
                await updateSupplier(params.id, dataToSend);
             
            } else {
                await createSupplier(dataToSend);
            
            }
            navigate("/listar-proveedor");

        } catch (error) {
            const data = error.response?.data;
            if (data?.nit) setServerError("Ya existe un proveedor con este NIT.");
            else if (data?.razon_social) setServerError("Ya existe un proveedor con esta Razón Social.");
            else setServerError("Error al guardar el proveedor. Probablemente existe uno con los mismos datos.");
            setShowModal(true);
        }
    };
    //Estados de los errores
    const [error, setErrors] = useState({})

    //estados del select estado
    const [suppliersState, setSuppliersState] = useState ([])
    useEffect (() => {
        getSuppliersState().then(setSuppliersState)
    }, []);
    const [departamentos, setDepartamentos] = useState ([])
    useEffect (() => {
        getDepartamentos().then(setDepartamentos)
    }, []);

    const [municipios, setMunicipios] = useState([]);
    // se ejecuta cada vez que cambia el departamento
    useEffect(() => {
        if (formData.departamento) {
            getMunicipios(formData.departamento).then(setMunicipios);
        }
    }, [formData.departamento]);


    return (
        <div>

            {/* Formulario para crear proveedores */}
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

                    
                    <Input
                    label="Correo electrónico"
                    name="correo"
                    placeholder="Ingrese el correo del contacto"
                    value={formData.correo}
                    onChange={handleChange}
                    error={error.correo}
                    />
                

                    <Input
                    label="Teléfono de contacto"
                    name="telefonoContacto"
                    placeholder="Ingrese el número de teléfono"
                    type="tel"
                    value={formData.telefonoContacto}
                    onChange={handleChange}
                    error={error.telefonoContacto}
                    />

                    <Select
                    label="Departamento"
                    name="departamento"
                    options={departamentos}
                    value={formData.departamento}
                    onChange={handleChange}
                    error={error.ciudad}
                    />

                    <Select
                    label="Estado"
                    name="estado"
                    options={suppliersState}
                    value={formData.estado}
                    onChange={handleChange}
                    error={error.estado}
                    />

                    <Select
                    label="Ciudad"
                    name="ciudad"
                    options={municipios}
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
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                {serverError}
            </Modal>
)}
        </div>
    )
}