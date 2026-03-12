/* import { useState, useEffect } from "react"; */
import { useNavigate } from "react-router-dom"; 
import Input from "../../../shared/components/Input";
import { Select } from "../../../shared/components";
import Button from "../../../shared/components/Button";
/* import { getPharmaForm, getAdministrationTypes, getSuppliers, getLaboratoriesTypes, getStatesTypes } from "../services/selectService"; */
import pharmaForm from "../../../data/selects/pharmaForm.json"
import administrationTypes from "../../../data/selects/administrationTypes.json";


export default function FormMedicamentos() {
  const navigate = useNavigate();   
/* 
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
  }, []); */

  return (
    <div>
      <div>
        {/* Formulario */}
        <form className="flex flex-col gap-10 z-20">
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
                name="pharmaForm"
                options={pharmaForm}
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
/*                 options={} */
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
/*                 options={} */
                text="Proveedores"
              />
            </div>

            {/* ================= COLUMNA 2 ================= */}
            <div className="flex flex-col gap-6 flex-1">
              <Input 
                label="Lote" 
                name="lote"
                placeholder="Lote"
                />

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
/*                 options={} */
                text="Estados"
              />

              <Input
                label="Descripción"
                name="description"
                placeholder="Descripción"
              />
            </div>
          </div>
          <div className="col-span-full flex justify-center gap-4 py-4">
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
              size="sm"
              onClick={() => console.log("Cancelar")}
            >
              Cancelar
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate("/formulario-ver")}
            >
              Ver
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}