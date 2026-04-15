import { buildReportDataset } from "../utils/buildReportDataset";
import { generateExcelReport } from "./generateExcelReport";
import { generatePdfReport } from "./generatePdfReport";

export async function generateProductReport({
  format,
  selectedFields,
  scope,
  formaFarmaceutica,
}) {
  // Trae los datos del backend
  let url = "http://127.0.0.1:8000/api/medicamentos/";

  const res = await fetch(url);
  const products = await res.json();

  // Mapea los campos del backend a los keys del reporte
  const mappedProducts = products.map((p) => ({
    nombreMedicamento: p.nombre_medicamento,
    formaFarmaceutica: p.nombre_forma_farmaceutica,
    concentracion: p.concentracion,
    viaAdministracion: p.nombre_via_administracion,
    stock: p.stock,
    fechaVencimiento: p.fecha_vencimiento,
    precioVenta: p.precio_venta,
  }));

  const { headers, rows } = buildReportDataset({
    products: mappedProducts,
    selectedFields,
    scope,
    formaFarmaceutica,
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
      fileName: `products-report-${timestamp}.xlsx`,
    });
  }

  if (format === "pdf") {
    generatePdfReport({
      headers,
      rows,
      fileName: `products-report-${timestamp}.pdf`,
    });
  }
}
