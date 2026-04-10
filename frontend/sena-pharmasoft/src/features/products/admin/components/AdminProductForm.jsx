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
  getSubformasFarmaceuticas,
} from "../../services/selectService";

export default function AdminProductForm() {
  const navigate = useNavigate();
  const params = useParams();
  const isEdit = Boolean(params.id);

  // ── Estados del formulario ──
  const [subformas, setSubformas] = useState([]);
  const [subformaInicial, setSubformaInicial] = useState(""); // guardamos la subforma al editar
  const [pharmaForm, setPharmaForm] = useState([]);
  const [administrationTypes, setAdministrationTypes] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [laboratoriesTypes, setLaboratoriesTypes] = useState([]);
  const [statesTypes, setStatesTypes] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nombreMedicamento: "",
    formaFarmaceutica: "",
    subformaFarmaceutica: "",
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
    imagen: null,
    imagenUrl: null,
  });

  // ── Carga el medicamento cuando se edita ──
  useEffect(() => {
    if (isEdit) {
      fetch(`http://127.0.0.1:8000/api/medicamentos/${params.id}/`)
        .then((res) => res.json())
        .then((data) => {
          // Guardamos la subforma por separado porque el select de subformas
          // depende de que primero se cargue la forma farmacéutica.
          // Si intentamos setear ambos al mismo tiempo el select no tiene
          // las opciones disponibles aún y no puede mostrar el valor.
          setSubformaInicial(data.id_subforma_farmaceutica || "");
          setFormData({
            nombreMedicamento: data.nombre_medicamento || "",
            formaFarmaceutica: data.id_forma_farmaceutica || "",
            subformaFarmaceutica: data.id_subforma_farmaceutica || "",
            viaAdministracion: data.id_via_administracion || "",
            laboratorio: data.id_laboratorio || "",
            concentracion: data.concentracion || "",
            proveedor: data.id_proveedor || "",
            lote: data.lote || "",
            fechaFabricacion: data.fecha_fabricacion || "",
            fechaVencimiento: data.fecha_vencimiento || "",
            stock: data.stock || "",
            precioCosto: data.precio_compra || "",
            precioVenta: data.precio_venta || "",
            requiresPrescription: data.requiere_formula === "Si" ? "Sí" : "No",
            estado: data.id_estado || "",
            description: data.descripcion || "",
            imagen: data.imagen || null,
            imagenUrl: data.imagen_url || null,
          });
        })
        .catch((err) => console.error("Error cargando medicamento:", err));
    }
  }, [isEdit, params.id]);

  // ── Carga los selects al montar el componente ──
  useEffect(() => {
    getPharmaForm().then(setPharmaForm);
    getAdministrationTypes().then(setAdministrationTypes);
    getSuppliers().then(setSuppliers);
    getLaboratoriesTypes().then(setLaboratoriesTypes);
    getStatesTypes().then(setStatesTypes);
  }, []);

  // ── Cuando subformaInicial y subformas están listos seteamos la subforma ──
  // Esto es necesario porque el select de subformas carga de forma asíncrona
  // después de que se selecciona la forma farmacéutica. Si no esperamos a que
  // las opciones estén disponibles el select no puede mostrar el valor guardado.
  useEffect(() => {
    if (subformaInicial && subformas.length > 0) {
      setFormData((prev) => ({ ...prev, subformaFarmaceutica: subformaInicial }));
      setSubformaInicial(""); // limpiamos para no volver a setear
    }
  }, [subformaInicial, subformas]);

  // ── Carga las subformas cuando cambia la forma farmacéutica ──
  useEffect(() => {
    if (formData.formaFarmaceutica) {
      getSubformasFarmaceuticas(formData.formaFarmaceutica).then((data) => {
        setSubformas(data);
      });
    } else {
      setSubformas([]);
    }
  }, [formData.formaFarmaceutica]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Si cambia la forma farmacéutica reseteamos la subforma
    // para que el usuario seleccione una nueva presentación
    if (name === "formaFarmaceutica") {
      setFormData((prev) => ({ ...prev, [name]: value, subformaFarmaceutica: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = medicamentoSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
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

    const formDataToSend = new FormData();
    formDataToSend.append("nombre_medicamento", formData.nombreMedicamento);
    formDataToSend.append("lote", formData.lote);
    formDataToSend.append("fecha_fabricacion", formData.fechaFabricacion);
    formDataToSend.append("fecha_vencimiento", formData.fechaVencimiento);
    formDataToSend.append("stock", String(formData.stock));
    formDataToSend.append("precio_compra", formData.precioCosto);
    formDataToSend.append("precio_venta", formData.precioVenta);
    formDataToSend.append("requiere_formula", formData.requiresPrescription === "Sí" ? "Si" : "No");
    formDataToSend.append("descripcion", formData.description);
    formDataToSend.append("concentracion", formData.concentracion);
    formDataToSend.append("id_forma_farmaceutica", formData.formaFarmaceutica);
    formDataToSend.append("id_subforma_farmaceutica", formData.subformaFarmaceutica);
    formDataToSend.append("id_via_administracion", formData.viaAdministracion);
    formDataToSend.append("id_laboratorio", formData.laboratorio);
    formDataToSend.append("id_proveedor", formData.proveedor);
    formDataToSend.append("id_estado", formData.estado);

    // Solo enviamos la imagen si es un archivo nuevo
    // Si el usuario no cambió la imagen no la enviamos para evitar errores
    if (formData.imagen && formData.imagen instanceof File) {
      formDataToSend.append("imagen", formData.imagen);
    }

    fetch(url, { method, body: formDataToSend })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          console.log("Error del backend:", errorData);
          throw new Error(JSON.stringify(errorData));
        }
        return res.json();
      })
      .then(() => {
        alert(isEdit ? "Medicamento actualizado exitosamente" : "Medicamento creado exitosamente");
        navigate("/medicamentos");
      })
      .catch((error) => {
        console.error("Error guardando medicamento:", error);
        alert("Error al guardar el medicamento");
      });
  };

  return (
    <div className="p-6">
      <form className="flex flex-col gap-10 z-20" onSubmit={handleSubmit}>
        {isEdit ? <Title title="Editar Medicamento" /> : <Title title="Crear Medicamento" />}

        <div className="flex gap-12">
          {/* Columna 1 */}
          <div className="flex flex-col gap-6 flex-1">
            <Input label="Nombre del medicamento" name="nombreMedicamento" value={formData.nombreMedicamento} onChange={handleChange} placeholder="Nombre del medicamento" error={errors.nombreMedicamento}/>
            <Select label="Forma farmacéutica" name="formaFarmaceutica" value={formData.formaFarmaceutica} options={pharmaForm} onChange={handleChange} error={errors.formaFarmaceutica}/>
            <Select label="Presentación" name="subformaFarmaceutica" value={formData.subformaFarmaceutica} options={subformas} onChange={handleChange} error={errors.subformaFarmaceutica} disabled={!formData.formaFarmaceutica}/>
            <Select label="Vía de administración" name="viaAdministracion" value={formData.viaAdministracion} options={administrationTypes} onChange={handleChange} error={errors.viaAdministracion}/>
            <Select label="Laboratorio" name="laboratorio" value={formData.laboratorio} options={laboratoriesTypes} onChange={handleChange} error={errors.laboratorio}/>
            <Input label="Concentración" name="concentracion" value={formData.concentracion} onChange={handleChange} placeholder="Concentración" error={errors.concentracion}/>
            <Select label="Proveedor" name="proveedor" value={formData.proveedor} options={suppliers} onChange={handleChange} error={errors.proveedor}/>
          </div>

          {/* Columna 2 */}
          <div className="flex flex-col gap-5 flex-1 z-10">
            <Input label="Lote" name="lote" value={formData.lote} onChange={handleChange} placeholder="Lote" error={errors.lote}/>
            <Input className="z-10" label="Fecha fabricación" type="date" name="fechaFabricacion" value={formData.fechaFabricacion} onChange={handleChange} error={errors.fechaFabricacion}/>
            <Input className="z-10" label="Fecha vencimiento" type="date" name="fechaVencimiento" value={formData.fechaVencimiento} onChange={handleChange} error={errors.fechaVencimiento}/>
            <Input label="Stock" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" error={errors.stock}/>
            <Input label="Precio costo" name="precioCosto" value={formData.precioCosto} onChange={handleChange} placeholder="Precio costo" error={errors.precioCosto}/>
            <Input label="Precio venta" name="precioVenta" value={formData.precioVenta} onChange={handleChange} placeholder="Precio venta" error={errors.precioVenta}/>
          </div>

          {/* Columna 3 */}
          <div className="flex flex-col gap-6 flex-1">
            <Input label="Requiere fórmula" name="requiresPrescription" value={formData.requiresPrescription} onChange={handleChange} placeholder="Requiere fórmula" error={errors.requiresPrescription}/>
            <Select label="Estado" name="estado" value={formData.estado} options={statesTypes} onChange={handleChange} error={errors.estado}/>
            <Input label="Descripción" name="description" value={formData.description} onChange={handleChange} placeholder="Descripción" error={errors.description}/>
            <AvatarUploader
              label="Cargar foto"
              currentImage={isEdit ? formData.imagenUrl : null}
              onUpload={(file) => setFormData((prev) => ({ ...prev, imagen: file }))}
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