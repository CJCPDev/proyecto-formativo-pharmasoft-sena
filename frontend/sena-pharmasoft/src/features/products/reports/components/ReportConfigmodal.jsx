// Hook para manejo de estado local en componentes funcionales
import { useState } from "react";

// Configuración de campos disponibles para el reporte
import { productReportFields } from "../config/productReportFields";

// Caso de uso que orquesta la generación del reporte
import { generateProductReport } from "../services/generateProductReport";

// Componentes UI reutilizables (design system)
import { Button, Input, Select, Checkbox } from "@/shared/components";

// Componente modal para configuración de reportes de productos
export default function ReportConfigModal({ isOpen, onClose }) {
    // Estado del formato de salida
    const [format, setFormat] = useState("pdf");

    // Estado del alcance del reporte
    const [scope, setScope] = useState("all");

    // Estado para filtro dinámico (laboratorio o estado)
    const [filterValue, setFilterValue] = useState("");

    // Estado de campos seleccionados (inicialización lazy)
    const [selectedFields, setSelectedFields] = useState(() =>
        productReportFields.filter((f) => f.default) // Solo campos marcados por defecto
    );

    // Control de render: si el modal no está abierto, no se monta en el DOM
    if (!isOpen) return null;

    // Handler para activar/desactivar campos del reporte (checkboxes)
    const handleFieldToggle = (field) => {
        const exists = selectedFields.find((f) => f.key === field.key);
        if (exists) {
        // Si ya estaba seleccionado, lo elimina
        setSelectedFields(selectedFields.filter((f) => f.key !== field.key));
        } else {
        // Si no estaba seleccionado, lo agrega
        setSelectedFields([...selectedFields, field]);
        }
    };

    // Handler principal para generar el reporte
    const handleGenerateReport = () => {
        generateProductReport({
        format,
        selectedFields,
        scope,
        filterValue, // se envía el valor del filtro si aplica
        });
        onClose();
    };

    return (
        // Overlay del modal
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        {/* Contenedor del modal */}
        <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
            {/* Título */}
            <h2 className="mb-6 text-xl font-semibold">
            Generar reporte de productos
            </h2>

            {/* Selección de formato */}
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

            {/* Selección de campos */}
            <div className="mb-4">
            <p className="mb-2 font-medium">Campos del reporte</p>
            <div className="grid grid-cols-2 gap-2">
                {productReportFields.map((field) => {
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

            {/* Selección de alcance */}
            <div className="mb-4">
            <Select
                label="Alcance del reporte"
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                options={[
                { label: "Todos los productos", value: "all" },
                { label: "Filtrar por laboratorio", value: "laboratory" },
                { label: "Filtrar por estado", value: "state" },
                ]}
            />
            </div>

            {/* Campo condicional para filtro */}
            {scope === "laboratory" && (
            <div className="mb-4">
                <Input
                label="Nombre del laboratorio"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                placeholder="Ej: Genfar, Bayer..."
                />
            </div>
            )}

            {scope === "state" && (
            <div className="mb-4">
                <Input
                label="Estado del producto"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                placeholder="Ej: Activo, Inactivo..."
                />
            </div>
            )}

            {/* Acciones del modal */}
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
