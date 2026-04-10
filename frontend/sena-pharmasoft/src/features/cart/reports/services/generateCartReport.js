// ─────────────────────────────────────────────
// generateCartReport.js
// Orquestador de generación de reportes de carritos
// ─────────────────────────────────────────────

import { buildCartDataset } from "../utils/buildCartDataset";
import { generateExcelReport } from "@/features/users/reports/services/generateExcelReport";
import { generatePdfReport } from "@/features/users/reports/services/generatePdfReport";
import { getCarritos } from "../../services/cartService";

export async function generateCartReport({
    format,
    selectedFields,
    filtroEstado,
    scope,
    documento,
    }) {
    try {
    const carritos = await getCarritos();
    console.log("Carritos para reporte:", carritos);

    const { headers, rows } = buildCartDataset({
        carritos,
        selectedFields,
        filtroEstado,
        scope,
        documento,
    });

    if (!rows.length) {
        alert("No hay datos para generar el reporte.");
        return;
    }

    const timestamp = new Date().toISOString().slice(0, 10);

    if (format === "excel") {
        generateExcelReport({
        headers,
        rows,
        fileName: `carritos-report-${timestamp}.xlsx`
        });
    }

    if (format === "pdf") {
        generatePdfReport({
        headers,
        rows,
        fileName: `carritos-report-${timestamp}.pdf`
        });
    }

    } catch (error) {
    console.error("Error al generar el reporte:", error);
    alert("Error al obtener los datos para el reporte");
    }
}