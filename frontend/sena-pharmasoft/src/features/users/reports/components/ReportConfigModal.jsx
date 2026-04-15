// ─────────────────────────────────────────────
// ReportConfigModal.jsx
// Modal para configurar y generar reportes de usuarios
// ─────────────────────────────────────────────

import { useState } from "react";
import { userReportFields } from "../config/userReportFields";
import { generateUserReport } from "../services/generateUserReport";
import { Button, Input, Select } from "@/shared/components";
import Checkbox from "@/shared/components/Checkbox";
import { getUsuarioActual } from "@/features/auth/services/authService";

export default function ReportConfigModal({ isOpen, onClose }) {
  const [format, setFormat] = useState("pdf");
  const [scope, setScope] = useState("all");
  const [documentNumber, setDocumentNumber] = useState("");
  const [rolFiltro, setRolFiltro] = useState("todos");
  const [selectedFields, setSelectedFields] = useState(() =>
    userReportFields.filter((f) => f.default),
  );

  const usuarioActual = getUsuarioActual();
  const esAdmin = usuarioActual?.id_rol === 1;

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
    generateUserReport({
      format,
      selectedFields,
      scope,
      documentNumber,
      rolFiltro: esAdmin ? rolFiltro : "2",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-lg flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Generar reporte de usuarios</h2>
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

          {esAdmin && (
            <Select
              label="Filtrar por rol"
              value={rolFiltro}
              onChange={(e) => setRolFiltro(e.target.value)}
              options={[
                { label: "Todos los usuarios", value: "todos" },
                { label: "Administradores", value: "1" },
                { label: "Farmaceutas", value: "3" },
                { label: "Clientes", value: "2" },
              ]}
            />
          )}

          <div>
            <p className="mb-2 font-medium">Campos del reporte</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {userReportFields.map((field) => {
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
              { label: "Todos los usuarios", value: "all" },
              { label: "Filtrar por documento", value: "document" },
            ]}
          />

          {scope === "document" && (
            <Input
              label="Número de documento"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              placeholder="Ingrese número de documento"
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
