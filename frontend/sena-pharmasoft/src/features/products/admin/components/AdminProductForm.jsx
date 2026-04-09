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
    description: "",
    imagen: null
  });

  // 🔥 CARGAR DATOS (EDITAR)
  useEffect(() => {
    if (isEdit) {
      fetch(`http://127.0.0.1:8000/api/medicamentos/${params.id}/`)
        .then(res => res.json())
        .then(data => {
          setFormData({
            nombre_medicamento: data.nombre_medicamento || "",
            id_forma_farmaceutica: data.id_forma_farmaceutica?.id_forma_farmaceutica || "",
            id_via_administracion: data.id_via_administracion?.id_via_administracion || "",
            id_laboratorio: data.id_laboratorio?.id_laboratorio || "",
            concentracion: data.concentracion || "",
            id_proveedor: data.id_proveedor?.id_proveedor || "",
            lote: data.lote || "",
            fecha_fabricacion: data.fecha_fabricacion || "",
            fecha_vencimiento: data.fecha_vencimiento || "",
            stock: data.stock || "",
            precio_compra: data.precio_compra || "",
            precio_venta: data.precio_venta || "",
            requiere_formula: data.requiere_formula || "",
            id_estado: data.id_estado?.id_estado || "",
            descripcion: data.descripcion || "",
            imagen: data.imagen || null
          });
        })
        .catch(err => console.error("Error cargando medicamento:", err));
    }
  }, [isEdit, params.id]);

  // 🔥 SELECTS
  const [pharmaForm, setPharmaForm] = useState([]);
  const [administrationTypes, setAdministrationTypes] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [laboratoriesTypes, setLaboratoriesTypes] = useState([]);
  const [statesTypes, setStatesTypes] = useState([]);

  useEffect(() => {
    getPharmaForm().then(setPharmaForm);
    getAdministrationTypes().then(setAdministrationTypes);
    getSuppliers().then(setSuppliers);
    getLaboratoriesTypes().then(setLaboratoriesTypes);
    getStatesTypes().then(setStatesTypes);
  }, []);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  //  SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const result = medicamentoSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach(issue => {
        fieldErrors[issue.path[0]] = issue.message;
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
      body: JSON.stringify({
        nombre_medicamento: formData.nombreMedicamento,
        lote: formData.lote,
        fecha_fabricacion: formData.fechaFabricacion,
        fecha_vencimiento: formData.fechaVencimiento,
        stock: formData.stock,
        precio_compra: formData.precioCosto,
        precio_venta: formData.precioVenta,
        requiere_formula: formData.requiresPrescription === "Sí",
        descripcion: formData.description,
        concentracion: formData.concentracion,
        id_forma_farmaceutica: formData.formaFarmaceutica,
        id_via_administracion: formData.viaAdministracion,
        id_laboratorio: formData.laboratorio,
        id_proveedor: formData.proveedor,
        id_estado: formData.estado
      }),
    })
      .then(res => res.json())
      .then(() => navigate("/medicamentos"))
      .catch(err => console.error("Error guardando medicamento:", err));
  };

  return (
    <div className="p-6"> {/* 🔥 ESTE DIV TE FALTABA */}
      <form className="flex flex-col gap-10 z-20" onSubmit={handleSubmit}>
        {isEdit ? <Title title="Editar Medicamento" /> : <Title title="Crear Medicamento" />}

        <div className="flex gap-12">

          {/* COLUMNA 1 */}
          <div className="flex flex-col gap-6 flex-1">
            <Input label="Nombre del medicamento" name="nombreMedicamento" value={formData.nombreMedicamento} onChange={handleChange} />
            <Select label="Forma farmacéutica" name="formaFarmaceutica" value={formData.formaFarmaceutica} options={pharmaForm} onChange={handleChange} />
            <Select label="Vía de administración" name="viaAdministracion" value={formData.viaAdministracion} options={administrationTypes} onChange={handleChange} />
            <Select label="Laboratorio" name="laboratorio" value={formData.laboratorio} options={laboratoriesTypes} onChange={handleChange} />
            <Input label="Concentración" name="concentracion" value={formData.concentracion} onChange={handleChange} />
            <Select label="Proveedor" name="proveedor" value={formData.proveedor} options={suppliers} onChange={handleChange} />
          </div>

          {/* COLUMNA 2 */}
          <div className="flex flex-col gap-5 flex-1">
            <Input label="Lote" name="lote" value={formData.lote} onChange={handleChange} />
            <Input label="Fecha fabricación" type="date" name="fechaFabricacion" value={formData.fechaFabricacion} onChange={handleChange} />
            <Input label="Fecha vencimiento" type="date" name="fechaVencimiento" value={formData.fechaVencimiento} onChange={handleChange} />
            <Input label="Stock" name="stock" value={formData.stock} onChange={handleChange} />
            <Input label="Precio costo" name="precioCosto" value={formData.precioCosto} onChange={handleChange} />
            <Input label="Precio venta" name="precioVenta" value={formData.precioVenta} onChange={handleChange} />
          </div>

          {/* COLUMNA 3 */}
          <div className="flex flex-col gap-6 flex-1">
            <Input label="Requiere fórmula" name="requiresPrescription" value={formData.requiresPrescription} onChange={handleChange} />
            <Select label="Estado" name="estado" value={formData.estado} options={statesTypes} onChange={handleChange} />
            <Input label="Descripción" name="description" value={formData.description} onChange={handleChange} />

            <AvatarUploader
              label="Cargar foto"
              onChange={(file) =>
                setFormData(prev => ({ ...prev, imagen: file }))
              }
            />
          </div>
        </div>

        <div className="flex gap-6 justify-center">
          <Button onClick={() => navigate(-1)} variant="secondary">
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            {isEdit ? "Actualizar" : "Crear"}
          </Button>
        </div>

      </form>
    </div>
  );
}