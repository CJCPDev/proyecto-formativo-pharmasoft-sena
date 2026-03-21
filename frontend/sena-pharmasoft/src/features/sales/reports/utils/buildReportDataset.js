// Función utilitaria para construir el dataset de un reporte (tabla)
// Patrón: transformación de datos (input → output listo para exportar)
export function buildReportDataset({
  ventas,           // Array de usuarios origen
  selectedFields,  // Campos seleccionados para el reporte [{ key, label }]
  scope,           // Alcance del reporte: "all" | "document"
  document_Number   // Número de documento para filtrar (si aplica)
}) {

  // Copia inmutable del array original (evita mutaciones)
  let filteredVentas = [...ventas];

  // Filtro por alcance: si es por documento, se aplica filtro específico
  if (scope === "document" && document_Number) {
    filteredVentas = filteredVentas.filter(
      (venta) => venta.document_number === document_Number
    );
  }

  // Construcción de encabezados del reporte
  // Se toma el label de cada campo seleccionado
  const headers = selectedFields.map((field) => field.label);

  // Construcción de filas del reporte
  // Cada usuario se transforma en un array de valores según los campos seleccionados
  const rows = filteredVentas.map((venta) =>
    selectedFields.map((field) => {
      const value = venta[field.key]; // Acceso dinámico a la propiedad

      // Normalización: evita undefined o null en el reporte
      return value ?? "";
    })
  );

  // Estructura final desacoplada de la UI
  // Lista para exportar a Excel, PDF o renderizar en tabla
  return {
    headers, // Array de strings (columnas)
    rows     // Array de arrays (filas)
  };
}

