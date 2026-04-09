// ─────────────────────────────────────────────
// CartReportModal.jsx
// Modal para configurar y generar reportes de carritos
// ─────────────────────────────────────────────

import { useState } from "react";
import { cartReportFields } from "../config/cartReportFields";
import { generateCartReport } from "../services/generateCartReport";
import { Button, Input, Select } from "@/shared/components";
import Checkbox from "@/shared/components/Checkbox";

export default function CartReportModal({ isOpen, onClose }) {

  const [format, setFormat] = useState("pdf");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [scope, setScope] = useState("all");
  const [documento, setDocumento] = useState("");
  const [selectedFields, setSelectedFields] = useState(() =>
    cartReportFields.filter((f) => f.default)
  );

  if (!isOpen) return null;

  const handleFieldToggle = (field) => {
    const exists = selectedFields.find((f) => f.key === field.key);
    if (exists) {
      setSelectedFields(selectedFields.filter((f) => f.key !== field.key));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const handleGenerateReport = () => {
    generateCartReport({
      format,
      selectedFields,
      filtroEstado,
      scope,
      documento,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">

        <h2 className="mb-6 text-xl font-semibold">
          Generar reporte de carritos
        </h2>

        {/* Formato */}
        <div className="mb-4">
          <Select
            label="Formato del reporte"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            options={[
              { label: "PDF", value: "pdf" },
              { label: "Excel", value: "excel" },
            ]}
          />
        </div>

        {/* Filtro por estado */}
        <div className="mb-4">
          <Select
            label="Filtrar por estado"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            options={[
              { label: "Todos", value: "todos" },
              { label: "Activo", value: "activo" },
              { label: "Confirmado", value: "confirmado" },
              { label: "Cancelado", value: "cancelado" },
            ]}
          />
        </div>

        {/* Campos del reporte */}
        <div className="mb-4">
          <p className="mb-2 font-medium">Campos del reporte</p>
          <div className="grid grid-cols-2 gap-2">
            {cartReportFields.map((field) => {
              const checked = selectedFields.some((f) => f.key === field.key);
              return (
                <Checkbox
                  key={field.key}
                  id={field.key}
                  name={field.key}
                  label={field.label}
                  checked={checked}
                  onChange={() => handleFieldToggle(field)}
                />
              );
            })}
          </div>
        </div>

        {/* Alcance del reporte */}
        <div className="mb-4">
          <Select
            label="Alcance del reporte"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            options={[
              { label: "Todos los clientes", value: "all" },
              { label: "Filtrar por documento", value: "document" },
            ]}
          />
        </div>

        {/* Input documento — solo si scope es document */}
        {scope === "document" && (
          <div className="mb-4">
            <Input
              label="Número de documento"
              placeholder="Ingrese número de documento"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
            />
          </div>
        )}

        {/* Botones */}
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGenerateReport}>
            Generar reporte
          </Button>
        </div>

      </div>
    </div>
  );
}