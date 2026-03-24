    // // Fuente de datos de usuarios (mock o fuente centralizada)
    // import { products } from "@/data/products/products";

    // // Utilidad para transformar datos en dataset de reporte
    // import { buildReportDataset } from "../utils/buildReportDataset";

    // // Servicios de exportación
    // import { generateExcelReport } from "./generateExcelReport";
    // import { generatePdfReport } from "./generatePdfReport";

    // // Caso de uso: orquestador de generación de reportes de usuarios
    // // Patrón: Application Service (coordina utilidades y servicios)
    // export function generateProductReport({
    // format,          // "excel" | "pdf"
    // selectedFields,  // Campos seleccionados por el usuario
    // scope,           // Alcance del reporte
    // formafarmaceutica   // Filtro opcional
    // }) {

    // // Construcción del dataset (desacoplado de la UI)
    //     const { headers, rows } = buildReportDataset({
    //         products,
    //         selectedFields,
    //         scope,
    //         formafarmaceutica
    //     });

    //     // Validación: evita generar archivos vacíos
    //     if (!rows.length) {
    //         alert("No hay datos para generar el reporte.");
    //         return; // Corte de ejecución
    //     }

    //     // Generación de timestamp para nombres únicos de archivo (YYYY-MM-DD)
    //     const timestamp = new Date().toISOString().slice(0, 10);

    //     // Selección de estrategia de exportación según formato
    //     if (format === "excel") {
    //         generateExcelReport({
    //         headers,
    //         rows,
    //         fileName: `products-report-${timestamp}.xlsx`
    //         });
    //     }

    //     if (format === "pdf") {
    //         generatePdfReport({
    //         headers,
    //         rows,
    //         fileName: `products-report-${timestamp}.pdf`
    //         });
    //     }
    // }
import { products } from "@/data/products/products";
import { buildReportDataset } from "../utils/buildReportDataset";
import { generateExcelReport } from "./generateExcelReport";
import { generatePdfReport } from "./generatePdfReport";

export function generateProductReport({ format, selectedFields, scope, filterValue }) {
    // 1. Empieza con todos los productos
    let productos = products;

    // 2. Aplica filtro si corresponde
    if (scope === "formaFarmaceutica" && filterValue) {
        const filtro = filterValue.trim().toLowerCase();
        productos = productos.filter(
        (p) => p.formaFarmaceutica.toLowerCase() === filtro
        );
    }

    // 3. Construye dataset con productos filtrados
    const { headers, rows } = buildReportDataset({
        products: productos,       // aquí va el array filtrado
        selectedFields,
        scope,
        formafarmaceutica: filterValue, // opcional, si tu util lo usa
    });

    // 4. Validación: evita archivos vacíos
    if (!rows.length) {
        alert("No hay datos para generar el reporte.");
        return;
    }

    // 5. Timestamp para nombre de archivo
    const timestamp = new Date().toISOString().slice(0, 10);

    // 6. Exporta según formato
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
