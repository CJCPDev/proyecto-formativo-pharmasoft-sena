// ─────────────────────────────────────────────
// ReportConfigModal.jsx
// Modal para configurar y generar reportes de usuarios
// El administrador puede filtrar por rol
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
  const [rolFiltro, setRolFiltro] = useState("todos"); // 👈 nuevo filtro por rol
  const [selectedFields, setSelectedFields] = useState(() =>
    userReportFields.filter((f) => f.default)
  );

  // Obtenemos el usuario actual para verificar si es administrador
  const usuarioActual = getUsuarioActual();
  const esAdmin = usuarioActual?.id_rol === 5;

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
    console.log("rolFiltro:", rolFiltro),
    generateUserReport({
      format,
      selectedFields,
      scope,
      documentNumber,
      rolFiltro: esAdmin ? rolFiltro : "6", // farmaceuta siempre filtra por clientes
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">

        <h2 className="mb-6 text-xl font-semibold">
          Generar reporte de usuarios
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

        {/* Filtro por rol — solo para administrador */}
        {esAdmin && (
          <div className="mb-4">
            <Select
              label="Filtrar por rol"
              value={rolFiltro}
              onChange={(e) => setRolFiltro(e.target.value)}
              options={[
                { label: "Todos los usuarios", value: "todos" },
                { label: "Administradores", value: "5" },
                { label: "Farmaceutas", value: "7" },
                { label: "Clientes", value: "6" },
              ]}
            />
          </div>
        )}

        {/* Campos del reporte */}
        <div className="mb-4">
          <p className="mb-2 font-medium">Campos del reporte</p>
          <div className="grid grid-cols-2 gap-2">
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

        {/* Alcance */}
        <div className="mb-4">
          <Select
            label="Alcance del reporte"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            options={[
              { label: "Todos los usuarios", value: "all" },
              { label: "Filtrar por documento", value: "document" },
            ]}
          />
        </div>

        {/* Filtro por documento */}
        {scope === "document" && (
          <div className="mb-4">
            <Input
              label="Número de documento"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              placeholder="Ingrese número de documento"
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