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
        <form className="flex flex-col gap-10">
          {/* Contenedor de columnas */}
          <div className="flex gap-12">
            {/* ================= COLUMNA 1 ================= */}
            <div className="flex flex-col gap-6 flex-1">
              <Input
                label="Nombre del medicamento"
                name="nombre"
                placeholder="Nombre del medicamento"
              />

              <Select
                label="Forma farmaceutica"
                name="formaFarmaceutica"
                options={pharmaForm}
                placeholder="Forma farmaceutica"
                text="Forma farmaceutica"
              />
              <Select
                label="Vía de administración"
                name="viaAdministracion"
                options={administrationTypes}
                text="Vía de administración"
              />

              <Select
                label="Laboratorio"
                name="laboratorio"
                options={laboratoriesTypes}
                text="Laboratorio"
              />

              <Input
                label="Concentración"
                name="concentracion"
                placeholder="Concentración"
              />

              <Select
                label="Proveedores"
                name="proveedor"
                options={suppliers}
                text="Proveedores"
              />
            </div>

            {/* ================= COLUMNA 2 ================= */}
            <div className="flex flex-col gap-6 flex-1">
              <Input 
                label="Lote" 
                name="lote"
                placeholder="Lote" />

              <Input
                label="Fecha fabricación"
                name="fechaFabricacion"
                type="date"
                placeholder="Fecha fabricación"
              />

              <Input
                label="Fecha vencimiento"
                name="fechaVencimiento"
                type="date"
                placeholder="Fecha Vencimiento"
              />

              <Input
                label="Stock"
                name="stock"
                placeholder="Stock"
              />

              <Input
                label="Precio de costo"
                name="precioCosto"
                placeholder="Precio de costo"
              />

              <Input
                label="Precio de venta"
                name="precioVenta"
                placeholder="Precio de venta"
              />
            </div>

            {/* ================= COLUMNA 3 ================= */}
            <div className="flex flex-col gap-6 flex-1">
              <Input
                label="Requiere fórmula"
                name="requiresPrescription"
                placeholder="Sí / No"
              />

              <Select
                label="Estados"
                name="estado"
                options={statesTypes}
                text="Estados"
              />

              <Input
                label="Descripción"
                name="description"
                placeholder="Descripción"
              />
            </div>
          </div>
          <div className="col-span-full flex justify-center gap-6 py-6">
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