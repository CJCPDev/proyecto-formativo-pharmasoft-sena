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


  // Maneja cambios en inputs y selects
  const handleChange = (e) => {
    console.log("Nombre user", e.target.value);
    
  }

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
        <form onSubmit className="flex flex-col gap-10">
          {/* Contenedor de columnas */}
          <div className="flex gap-12">
            {/* ================= COLUMNA 1 ================= */}
            <div className="flex flex-col gap-6 flex-1">
              <Input
                label="Nombre del medicamento"
                onChange={handleChange}
                placeholder="Nombre del medicamento"
              />

              <Select
                label="Formas Farmacéuticas"
                name="pharmaForm"
                onChange={handleChange}
                options={pharmaForm}
                placeholder="Formas Farmaceuticas"
              />

              <Select
                label="Vía de administración"
                onChange={handleChange}
                options={administrationTypes}
                placeholder="Vía de administración"
              />

              <Select
                label="Laboratorio"
                onChange={handleChange}
                options={laboratoriesTypes}
                placeholder="Laboratorio"
              />

              <Input
                label="Concentración"
                onChange={handleChange}
                placeholder="Concentración"
              />

              <Select
                label="Proveedores"
                onChange={handleChange}
                options={suppliers}
                placeholder="Proveedores"
              />
            </div>

            {/* ================= COLUMNA 2 ================= */}
            <div className="flex flex-col gap-6 flex-1">
              <Input label="Lote" onChange={handleChange} placeholder="Lote" />

              <Input
                label="Fecha fabricación"
                type="date"
                onChange={handleChange}
              />

              <Input
                label="Fecha vencimiento"
                type="date"
                onChange={handleChange}
              />

              <Input
                label="Stock"
                onChange={handleChange}
                placeholder="Stock"
              />

              <Input
                label="Precio de costo"
                onChange={handleChange}
                placeholder="Precio de costo"
              />

              <Input
                label="Precio de venta"
                onChange={handleChange}
                placeholder="Precio de venta"
              />
            </div>

            {/* ================= COLUMNA 3 ================= */}
            <div className="flex flex-col gap-6 flex-1">
              <Input
                label="Requiere fórmula"
                name="requiresPrescription"
                onChange={handleChange}
                placeholder="Sí / No"
              />

              <Select
                label="Estados"
                onChange={handleChange}
                options={statesTypes}
                placeholder="Estados"
              />

              <Input
                label="Descripción"
                name="description"
                onChange={handleChange}
                placeholder="Descripción"
              />
            </div>
          </div>
          {/* Botón guardar */}
          <div className="flex gap-3 justify-end mt-6">
            {/* Botón primario → “Guardar” */}
            <Button
              variant="primary"
              size="md"
              type="submit"
              onClick={() => console.log("Guardar")}
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