import { useState, useEffect } from "react";
import Input from "../../shared/components/Input";
import Select from "../../shared/components/Select";
import Button from "../../shared/components/Button";
import { getPharmaForm, getAdministrationTypes, getSuppliers, getLaboratoriesTypes, getStatesTypes } from "./serviced/selectService";


export default function FormMedicamentos() {

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

  const [formData, setFormData] = useState({
  nombre: "",
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


  // Maneja cambios en inputs y selects
  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value
  }));
};
  const handleSubmit = (e) => {
  e.preventDefault();

  console.log("Formulario enviado");
  console.log(formData);

  setFormData({
    nombre: "",
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
};


  return (
    <div
      className="min-h-screen p-12"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div
        className="max-w-7xl mx-auto rounded-xl p-10"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          {/* Contenedor de columnas */}
          <div className="flex gap-12">
            {/* ================= COLUMNA 1 ================= */}
            <div className="flex flex-col gap-6 flex-1">
              <Input
                label="Nombre del medicamento"
                name="nombre"
                onChange={handleChange}
                value={formData.nombre}
                placeholder="Nombre del medicamento"
              />

              <Select
                label="Forma farmaceutica"
                name="formaFarmaceutica"
                onChange={handleChange}
                value={formData.formaFarmaceutica}
                options={pharmaForm}
                text="Forma farmaceutica"
              />
              <Select
                label="Vía de administración"
                name="viaAdministracion"
                onChange={handleChange}
                value={formData.viaAdministracion}
                options={administrationTypes}
                text="Vía de administración"
              />

              <Select
                label="Laboratorio"
                name="laboratorio"
                onChange={handleChange}
                value={formData.laboratorio}
                options={laboratoriesTypes}
                text="Laboratorio"
              />

              <Input
                label="Concentración"
                name="concentracion"
                onChange={handleChange}
                value={formData.concentracion}
                placeholder="Concentración"
              />

              <Select
                label="Proveedores"
                name="proveedor"
                onChange={handleChange}
                value={formData.proveedor}
                options={suppliers}
                text="Proveedores"
              />
            </div>

            {/* ================= COLUMNA 2 ================= */}
            <div className="flex flex-col gap-6 flex-1">
              <Input 
                label="Lote" 
                name="lote"
                onChange={handleChange}
                value={formData.lote}
                placeholder="Lote" />

              <Input
                label="Fecha fabricación"
                name="fechaFabricacion"
                // onChange={handleChange}
                type="date"
                value={formData.fechaFabricacion}
                placeholder="Fecha fabricación"
              />

              <Input
                label="Fecha vencimiento"
                name="fechaVencimiento"
                // onChange={handleChange}
                type="date"
                value={formData.fechaVencimiento}
                placeholder="Fecha Vencimiento"
              />

              <Input
                label="Stock"
                name="stock"
                onChange={handleChange}
                value={formData.stock}
                placeholder="Stock"
              />

              <Input
                label="Precio de costo"
                name="precioCosto"
                value={formData.precioCosto}
                onChange={handleChange}
                placeholder="Precio de costo"
              />

              <Input
                label="Precio de venta"
                name="precioVenta"
                onChange={handleChange}
                value={formData.precioVenta}
                placeholder="Precio de venta"
              />
            </div>

            {/* ================= COLUMNA 3 ================= */}
            <div className="flex flex-col gap-6 flex-1">
              <Input
                label="Requiere fórmula"
                name="requiresPrescription"
                onChange={handleChange}
                value={formData.requiresPrescription}
                placeholder="Sí / No"
              />

              <Select
                label="Estados"
                name="estado"
                onChange={handleChange}
                value={formData.estado}
                options={statesTypes}
                text="Estados"
              />

              <Input
                label="Descripción"
                name="description"
                onChange={handleChange}
                value={formData.description}
                placeholder="Descripción"
              />
            </div>
          </div>
          {/* Botón guardar */}
          <div className="flex justify-center items-center gap-6 mt-12">
            {/* Botón primario → “Guardar” */}
            <Button
              variant="primary"
              size="md"
              type="submit"
            >
              Guardar
            </Button>

            {/* Botón secundario → “Cancelar” */}
            <Button
              variant="secondary"
              size="md"
              onClick={() => console.log("Cancelar")}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}