import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Select, Button, Input, Title, AvatarUploader } from "../../../shared/components";
import { medicamentoSchema } from "../schemas/medicamentoSchema";
import { getProductsById } from "../services/getProductsById";
import { getPharmaForm, getAdministrationTypes, getSuppliers, getLaboratoriesTypes, getStatesTypes } from "../services/selectService"; 

export default function FormMedicamentos() {
  const navigate = useNavigate();
  const params = useParams()
  const isEdit = Boolean(params.id)
  const product = isEdit ? getProductsById(params.id) : null

      const [formData, setFormData] = useState({
          nombreMedicamento: product?.nombreMedicamento || "",
          formaFarmaceutica: product?.formaFarmaceutica || "",
          viaAdministracion: product?.viaAdministracion || "",            
          laboratorio: product?.laboratorio || "",
          concentracion: product?.concentracion || "",
          proveedor: product?.proveedor || "",
          lote: product?.lote || "",
          fechaFabricacion: product?.fechaFabricacion || "",
          fechaVencimiento: product?.fechaVencimiento || "",
          stock: product?.stock || "",
          precioCosto: product?.precioCosto || "",
          precioVenta: product?.precioVenta || "",
          requiresPrescription: product?.requiresPrescription || "",
          estado: product?.estado || "",
          description: product?.description || ""
          })

    // ==========================HANDLER=====================================
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
    //========================================================================

    //============== HANDLE SUBMIT ============== 
    // Función que se ejecuta cuando se envía el formulario 
    const handleSubmit = (e) => { 
    // Evita que el formulario recargue la página 
    e.preventDefault(); 
    // Se valida el objeto formData usando el esquema definido con Zod 
    // safeParse devuelve un objeto indicando si la validación fue exitosa o no 
    const result = medicamentoSchema.safeParse(formData); 
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
    console.log("Usuario válido:", result.data); 
    };

    // Estado de los errores
    const [errors, setErrors] = useState({});

    // Estado de los tipos de documento
    // const [documentTypes, setDocumentTypes] = useState([]);

  const [pharmaForm, setPharmaForm] = useState([]);
  useEffect(()=> {
    getPharmaForm().then(setPharmaForm)
  }, []);

  const [administrationTypes, setAdministrationTypes] = useState([]);
  useEffect(()=> {
    getAdministrationTypes().then(setAdministrationTypes)
    
  }, []);

  const [suppliers, setSuppliers] = useState([]);
  useEffect(()=> {
    getSuppliers().then(setSuppliers)
  }, []);

  const [laboratoriesTypes, setLaboratoriesTypes] = useState([]);
  useEffect(()=> {
    getLaboratoriesTypes().then(setLaboratoriesTypes)
  }, []);

  const [statesTypes, setStatesTypes] = useState([]);
  useEffect(()=> {
    getStatesTypes().then(setStatesTypes)
  }, []); 
console.log("FORM DATA:", formData);
console.log("OPTIONS:", administrationTypes);
  return (
        <form
        className="flex flex-col gap-10 z-20"
              onSubmit={handleSubmit}>
              { isEdit ? <Title title="Editar Medicamento"/> : <Title title="Crear Medicamento"/> }
          {/* Contenedor de columnas */}
          <div className="flex gap-12">
            {/* ================= COLUMNA 1 ================= */}
            <div className="flex flex-col gap-6 flex-1">
              <Input
                label="Nombre del medicamento"
                name="nombre"
                placeholder="Nombre del medicamento"
                value={formData.nombreMedicamento}
                onChange={handleChange}
                error={errors.nombreMedicamento}
              />
                
              <Select
                label="Forma farmaceutica"
                name="formaFarmaceutica"
                value={formData.formaFarmaceutica}
                options={pharmaForm}
                onChange={handleChange}
                error={errors.formaFarmaceutica}
              />
              <Select
                label="Vía de administración"
                name="viaAdministracion"
                value={formData.viaAdministracion}
                options={administrationTypes}
                onChange={handleChange}
                error={errors.viaAdministracion}
                
              />
              
              <Select
                label="Laboratorio"
                name="laboratorio"
                value={formData.laboratorio}
                options={laboratoriesTypes}
                onChange={handleChange}
                error={errors.laboratorio}
              />

              <Input
                label="Concentración"
                name="concentracion"
                placeholder="Concentración"
                value={formData.concentracion}
                onChange={handleChange}
                error={errors.concentracion}
              />

              <Select
                label="Proveedores"
                name="proveedor"
                value={formData.proveedor}
                options={suppliers} 
                onChange={handleChange}
                error={errors.proveedor}
              />
            </div>

            {/* ================= COLUMNA 2 ================= */}
            <div className="flex flex-col gap-5 flex-1">
              <Input 
                label="Lote" 
                name="lote"
                placeholder="Lote"
                value={formData.lote}
                onChange={handleChange}
                error={errors.lote}
                />

              <Input
                label="Fecha fabricación"
                name="fechaFabricacion"
                type="date"
                placeholder="Fecha fabricación"
                value={formData.fechaFabricacion}
                onChange={handleChange}
                error={errors.fechaFabricacion}
              />

              <Input
                label="Fecha vencimiento"
                name="fechaVencimiento"
                type="date"
                placeholder="Fecha Vencimiento"
                value={formData.fechaVencimiento}
                onChange={handleChange}
                error={errors.fechaVencimiento}
              />

              <Input
                label="Stock"
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
                error={errors.stock}
              />

              <Input
                label="Precio de costo"
                name="precioCosto"
                placeholder="Precio de costo"
                value={formData.precioCosto}
                onChange={handleChange}
                error={errors.precioCosto}
              />

              <Input
                label="Precio de venta"
                name="precioVenta"
                placeholder="Precio de venta"
                value={formData.precioVenta}
                onChange={handleChange}
                error={errors.precioVenta}
              />
            </div>

            {/* ================= COLUMNA 3 ================= */}
            <div className="flex flex-col gap-6 flex-1">
              <Input
                label="Requiere fórmula"
                name="requiresPrescription"
                placeholder="Sí / No"
                value={formData.requiresPrescription}
                onChange={handleChange}
                error={errors.requiresPrescription}
              />

              <Select
                label="Estados"
                name="estado"
                value={formData.estado}
                options={statesTypes} 
                onChange={handleChange}
                error={errors.estado}
              />

              <Input
                label="Descripción"
                name="description"
                placeholder="Descripción"
                value={formData.description}
                onChange={handleChange}
                error={errors.description}
              />
      
            <div className="w-max p-4 rounded-xl border border-brand bg-brand-soft/60 flex flex-col items-center">
          
              {/* Aquí va tu componente AvatarUploader */}
              <AvatarUploader
                label="Cargar foto"
                onChange={(url) =>
                  setFormData((prev) => ({
                    ...prev,
                    imagen: url,
                  }))
                }
              />
            </div>

            </div>
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
  );
}