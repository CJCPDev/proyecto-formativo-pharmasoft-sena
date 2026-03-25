import {Title, Input, Select, Button} from "@/shared/components"
import sellStates from "../../../data/selects/sellStates.json"
import paymentStates from "../../../data/selects/paymenStates.json"
import { useState } from "react"
import { saleSchema } from "../schemas/saleSchema"
import { useParams } from "react-router-dom"
import { getSalesById } from "../services/getSalesById"


export default function SaleForm(){
    const params = useParams()
    const isEdit = Boolean(params.id);
    const sales = isEdit ? getSalesById(params.id) : null;

        const [formData, setFormData] = useState({
        numeroFactura: sales?.numeroFactura || "",
        fecha: sales?.fechaHora || "",
        usuario: sales?.usuario || "",
        farmaceuta: sales?.farmaceuta || "",
        sellStates: sales?.sellStates || "",
        paymentStates: sales?.paymentStates || "",
      });
      
    //==================HANDLE=========================
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

  //==================================================================

    //============== HANDLE SUBMIT ==============
  // Función que se ejecuta cuando se envía el formulario
  const handleSubmit = (e) => {
    // Evita que el formulario recargue la página
    e.preventDefault();
    // Se valida el objeto formData usando el esquema definido con Zod
    // safeParse devuelve un objeto indicando si la validación fue exitosa o no
    const result = saleSchema.safeParse(formData);
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
    console.log("Venta válida:", result.data);
  };

  //======================================================================

    //Estado de los errores
      const [errors, setErrors] = useState({});



      const [isEditing, setIsEditing] = useState(!isEdit);

  // //Estado de los tipos de documento
  // const [getDocumentTypes, setDocumentTypes] = useState([]);

  // useEffect(() => {
  //   getDocumentTypes().then(setDocumentTypes);
  // }, []);


    return(
        <div className="font-main bg-white grid gap-2 w-full h-full p-6 rounded-lg">
            
            <form 
            onSubmit={handleSubmit}
            className="w-full px-6 rounded-xl">
                {isEdit ? <Title title="Editar venta"/> : <Title title="Crear venta"/> }
                <div className="grid grid-cols-2 gap-6  w-full">
                    <div className="flex flex-col gap-3">
                        <Input
                            className="                    
                            w-full
                            h-10
                            relative
                            text-black/20
                            rounded-xl
                            bg-brand-soft/60
                            border
                            border-background
                            px-4
                            text-base"
                            label = 'Numero de factura'
                            disabled
                            value = {formData.numeroFactura}
                        />
                        <Input
                        label="Usuario"
                        name="usuario"
                        disabled={!isEditing}
                        value={formData.usuario}
                        onChange={handleChange}
                        error={errors.usuario}
                        />
                        <Input
                        label="Farmaceuta"
                        name="farmaceuta"
                        disabled={!isEditing}
                        value={formData.farmaceuta}
                        onChange={handleChange}
                        error={errors.farmaceuta}
                        />
                        <Select
                            label="Estado"
                            name="sellStates"
                            options={sellStates}
                            disabled={!isEditing}
                            value={formData.sellStates}
                            onChange={handleChange}
                            error={errors.sellStates}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Input
                            label = 'Fecha y hora'
                            type='datetime-local'
                            name="fecha"
                            disabled
                            value={formData.fecha}
                            />
                            <Select
                                label="Tipo de pago"
                                name="paymentStates"
                                options={paymentStates} 
                                disabled={!isEditing}
                                value={formData.paymentStates}
                                onChange={handleChange}
                                error={errors.paymentStates}               
                            />
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
                        disabled={!isEditing}
                        placeholder='Producto'
                        />
                    </div>
                <div className="flex gap-4 justify-center">

                {isEdit && !isEditing && (
                    <Button type="button" onClick={() => setIsEditing(true)}>
                    Editar
                    </Button>
                )}

                {isEditing && (
                    <Button type="submit">
                    Guardar
                    </Button>
                )}

                </div>        
        </form>
        </div>
    )
}