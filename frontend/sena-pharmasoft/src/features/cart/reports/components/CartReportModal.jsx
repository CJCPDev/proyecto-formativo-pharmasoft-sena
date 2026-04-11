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
    generateCartReport({ format, selectedFields, filtroEstado, scope, documento });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-lg flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Generar reporte de carritos</h2>
        </div>

        {/* Contenido con scroll */}
        <div className="p-6 overflow-y-auto flex-1 grid gap-4">

          <Select
            label="Formato del reporte"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            options={[
              { label: "PDF", value: "pdf" },
              { label: "Excel", value: "excel" },
            ]}
          />

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

          <div>
            <p className="mb-2 font-medium">Campos del reporte</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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

          <Select
            label="Alcance del reporte"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            options={[
              { label: "Todos los clientes", value: "all" },
              { label: "Filtrar por documento", value: "document" },
            ]}
          />

          {scope === "document" && (
            <Input
              label="Número de documento"
              placeholder="Ingrese número de documento"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
            />
          )}

        </div>

        {/* Footer */}
        <div className="p-6 border-t flex flex-col sm:flex-row justify-end gap-2">
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