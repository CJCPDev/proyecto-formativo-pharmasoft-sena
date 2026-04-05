import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Select,
  Button,
  Input,
  Title,
  AvatarUploader,
} from "../../../../shared/components";

import { medicamentoSchema } from "../../schemas/medicamentoSchema";
import { getProductsById } from "../../services/getProductsById";
import {
  getPharmaForm,
  getAdministrationTypes,
  getSuppliers,
  getLaboratoriesTypes,
  getStatesTypes,
} from "../../services/selectService";

import {
  createProduct,
  updateMedicamento,
} from "../../services/productService";

export default function FormMedicamentos() {
  const navigate = useNavigate();
  const params = useParams();
  const isEdit = Boolean(params.id);

  const [product, setProduct] = useState(null);
  const [errors, setErrors] = useState({});

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
  });

  // ================= GET PRODUCT =================
  useEffect(() => {
    if (isEdit) {
      getProductsById(params.id).then(setProduct);
    }
  }, [isEdit, params.id]);

  // ================= LOAD DATA INTO FORM =================
  useEffect(() => {
    if (product) {
      setFormData({
        nombreMedicamento: product?.nombre || "",
        formaFarmaceutica: product?.forma_farmaceutica || "",
        viaAdministracion: product?.via_administracion || "",
        laboratorio: product?.laboratorio || "",
        concentracion: product?.concentracion || "",
        proveedor: product?.proveedor || "",
        lote: product?.lote || "",
        fechaFabricacion: product?.fecha_fabricacion || "",
        fechaVencimiento: product?.fecha_vencimiento || "",
        stock: product?.stock || "",
        precioCosto: product?.precio_costo || "",
        precioVenta: product?.precio_venta || "",
        requiresPrescription: product?.requiere_formula ? "Sí" : "No",
        estado: product?.estado || "",
        description: product?.descripcion || "",
      });
    }
  }, [product]);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= MAP DATA (SIN ARCHIVO EXTRA) =================
  const mapToBackend = (data) => {
    return {
      nombreMedicamento: data.nombreMedicamento,
      forma_farmaceutica: data.formaFarmaceutica,
      via_administracion: data.viaAdministracion,
      laboratorio: data.laboratorio,
      concentracion: data.concentracion,
      proveedor: data.proveedor,
      lote: data.lote,
      fecha_fabricacion: data.fechaFabricacion,
      fecha_vencimiento: data.fechaVencimiento,
      stock: Number(data.stock),
      precio_costo: Number(data.precioCosto),
      precio_venta: Number(data.precioVenta),
      requiere_formula: data.requiresPrescription === "Sí",
      estado: data.estado,
      descripcion: data.description,
    };
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = medicamentoSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    try {
      const payload = mapToBackend(result.data);

      if (isEdit) {
        await updateMedicamento(params.id, payload);
      } else {
        await createProduct(payload);
        console.log(createProduct);
      }

      navigate("/medicamentos");
    } catch (error) {
      console.error("Error guardando medicamento:", error);
      console.log("DETALLE BACKEND:", error.response?.data);
    }
  };

  // ================= SELECT DATA =================
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

  return (
    <form className="flex flex-col gap-10 z-20" onSubmit={handleSubmit}>
      <Title title={isEdit ? "Editar Medicamento" : "Crear Medicamento"} />

      <div className="flex gap-12">

        {/* ================= COL 1 ================= */}
        <div className="flex flex-col gap-6 flex-1">
          <Input
            label="Nombre del medicamento"
            name="nombreMedicamento"
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

        {/* ================= COL 2 ================= */}
        <div className="flex flex-col gap-5 flex-1">
          <Input
            label="Lote"
            name="lote"
            value={formData.lote}
            onChange={handleChange}
            error={errors.lote}
          />

          <Input
            label="Fecha fabricación"
            name="fechaFabricacion"
            type="date"
            value={formData.fechaFabricacion}
            onChange={handleChange}
            error={errors.fechaFabricacion}
          />

          <Input
            label="Fecha vencimiento"
            name="fechaVencimiento"
            type="date"
            value={formData.fechaVencimiento}
            onChange={handleChange}
            error={errors.fechaVencimiento}
          />

          <Input
            label="Stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            error={errors.stock}
          />

          <Input
            label="Precio de costo"
            name="precioCosto"
            type="number"
            value={formData.precioCosto}
            onChange={handleChange}
            error={errors.precioCosto}
          />

          <Input
            label="Precio de venta"
            name="precioVenta"
            type="number"
            value={formData.precioVenta}
            onChange={handleChange}
            error={errors.precioVenta}
          />
        </div>

        {/* ================= COL 3 ================= */}
        <div className="flex flex-col gap-6 flex-1">
          <Input
            label="Requiere fórmula"
            name="requiresPrescription"
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
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
          />

          <div className="w-max p-4 rounded-xl border border-brand bg-brand-soft/60 flex flex-col items-center">
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

      <div className="flex gap-6 justify-center">
        <Button onClick={() => navigate(-1)} variant="secondary" size="sm">
          {isEdit ? "Cancelar" : "Regresar"}
        </Button>

        <Button variant="primary" size="md" type="submit">
          {isEdit ? "Actualizar" : "Crear"}
        </Button>
      </div>
    </form>
  );
}