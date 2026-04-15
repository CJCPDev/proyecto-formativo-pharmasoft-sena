// Fuente de datos de usuarios (mock o fuente centralizada)
import { getVentas } from "../../services/saleService";

// Utilidad para transformar datos en dataset de reporte
import { buildReportDataset } from "../utils/buildReportDataset";
import { generateExcelReport } from "../services/generateExcelReport";
import { generatePdfReport } from "../services/generatePdfReport";

export async function generateSalesReport({
  format, // "excel" | "pdf"
  selectedFields, // Campos seleccionados por el usuario
  scope, // Alcance del reporte
  documentNumber, // Filtro opcional
}) {
  // Construcción del dataset (desacoplado de la UI)
  const ventas = await getVentas();
  console.log("sales", ventas);
  const { headers, rows } = buildReportDataset({
    ventas,
    selectedFields,
    scope,
    documentNumber,
  });

  // Validación: evita generar archivos vacíos
  if (!rows.length) {
    alert("No hay datos para generar el reporte.");
    return; // Corte de ejecución
  }

  // Generación de timestamp para nombres únicos de archivo (YYYY-MM-DD)
  const timestamp = new Date().toISOString().slice(0, 10);

  // Selección de estrategia de exportación según formato
  if (format === "excel") {
    generateExcelReport({
      headers,
      rows,
      fileName: `ReportedeVentas-${timestamp}.xlsx`,
    });
  }

  if (format === "pdf") {
    generatePdfReport({
      headers,
      rows,
      fileName: `ReportedeVentas-${timestamp}.pdf`,
    });
  }
}
