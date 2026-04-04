import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Select, Button, Input, Title, AvatarUploader } from "../../../../shared/components";
import { medicamentoSchema } from "../../schemas/medicamentoSchema";
import { 
  getPharmaForm, 
  getAdministrationTypes, 
  getSuppliers, 
  getLaboratoriesTypes, 
  getStatesTypes,
} from "../../services/selectService"; 

export default function FormMedicamentos() {
  const navigate = useNavigate();
  const params = useParams();
  const isEdit = Boolean(params.id);

  const [formData, setFormData] = useState({
    nombreMedicamento: "",
    formaFarmaceutica: "",
    viaAdministracion: "",
    laboratorio: "",
    concentracion: "",
    proveedor: "",
    lote: "",
    fechaFabricacion: "",
    fechaVencimiento: "",
    stock: "",
    precioCosto: "",
    precioVenta: "",
    requiresPrescription: "",
    estado: "",
    description: ""
  });

  // Cargar datos si es edición
  useEffect(() => {
    if (isEdit) {
      fetch(`http://127.0.0.1:8000/api/medicamentos/${params.id}/`)
        .then(res => res.json())
        .then(data => {
          setFormData({
            nombreMedicamento: data.nombreMedicamento || "",
            formaFarmaceutica: data.formaFarmaceutica ? String(data.formaFarmaceutica) : "",
            viaAdministracion: data.viaAdministracion ? String(data.viaAdministracion) : "",
            laboratorio: data.laboratorio ? String(data.laboratorio) : "",
            concentracion: data.concentracion || "",
            proveedor: data.proveedor ? String(data.proveedor) : "",
            lote: data.lote || "",
            fechaFabricacion: data.fechaFabricacion || "",
            fechaVencimiento: data.fechaVencimiento || "",
            stock: data.stock || "",
            precioCosto: data.precioCosto || "",
            precioVenta: data.precioVenta || "",
            requiresPrescription: data.requiresPrescription ? String(data.requiresPrescription) : "",
            estado: data.estado ? String(data.estado) : "",
            description: data.description || ""
          });
        })
        .catch(err => console.error("Error cargando medicamento:", err));
    }
  }, [isEdit, params.id]);

  // Estados para los selects
  const [pharmaForm, setPharmaForm] = useState([]);
  const [administrationTypes, setAdministrationTypes] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [laboratoriesTypes, setLaboratoriesTypes] = useState([]);
  const [statesTypes, setStatesTypes] = useState([]);

  // Cargar opciones dinámicas
  useEffect(() => {
    getPharmaForm().then(setPharmaForm);
    getAdministrationTypes().then(setAdministrationTypes);
    getSuppliers().then(setSuppliers);
    getLaboratoriesTypes().then(setLaboratoriesTypes);
    getStatesTypes().then(setStatesTypes);
  }, []);

  console.log("OPTIONS:", pharmaForm)

  // Estado de errores
  const [errors, setErrors] = useState({});

  // Handler de cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler de submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const result = medicamentoSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach(issue => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    const url = isEdit
      ? `http://127.0.0.1:8000/api/medicamentos/${params.id}/`
      : `http://127.0.0.1:8000/api/medicamentos/`;

    const method = isEdit ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(() => {
        navigate("/medicamentos");
      })
      .catch(err => console.error("Error guardando medicamento:", err));
  };
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
                name="nombreMedicamento"
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