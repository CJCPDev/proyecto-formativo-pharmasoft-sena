// ─────────────────────────────────────────────
// generateUserReport.js
// Orquestador de generación de reportes de usuarios
// Los datos vienen desde la API de Django
// El administrador puede filtrar por rol
// ─────────────────────────────────────────────

import { buildReportDataset } from "../utils/buildReportDataset";
import { generateExcelReport } from "./generateExcelReport";
import { generatePdfReport } from "./generatePdfReport";
import { getUsuarios } from "../../services/usuarioService";
import { getUsuarioActual } from "@/features/auth/services/authService";

export async function generateUserReport({
  format,
  selectedFields,
  scope,
  documentNumber,
  rolFiltro  // "todos" | "5" | "6" | "7"
}) {
  try {
    const usuarioActual = getUsuarioActual();
    const esFarmaceuta = usuarioActual?.id_rol === 3;

    // Si es farmaceuta siempre filtra por clientes
    // Si es admin usa el filtro seleccionado en el modal
    const idRol = esFarmaceuta ? 6 : (rolFiltro === "todos" ? null : Number(rolFiltro));
    console.log("idRol enviado a getUsuarios:", idRol);
    // Obtenemos los usuarios desde la API de Django
    const users = await getUsuarios(idRol);
    console.log("usuarios recibidos:", users.length, users);

    // Construcción del dataset
    const { headers, rows } = buildReportDataset({
      users,
      selectedFields,
      scope,
      documentNumber
    });

    // Validación — evita generar archivos vacíos
    if (!rows.length) {
      alert("No hay datos para generar el reporte.");
      return;
    }

    const timestamp = new Date().toISOString().slice(0, 10);

    if (format === "excel") {
      generateExcelReport({
        headers,
        rows,
        fileName: `users-report-${timestamp}.xlsx`
      });
    }

    if (format === "pdf") {
      generatePdfReport({
        headers,
        rows,
        fileName: `users-report-${timestamp}.pdf`
      });
    }

  } catch (error) {
    console.error("Error al generar el reporte:", error);
    alert("Error al obtener los datos para el reporte");
  }
}