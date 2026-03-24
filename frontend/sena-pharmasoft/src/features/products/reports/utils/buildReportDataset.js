// Función utilitaria para construir el dataset de un reporte (tabla)
// Patrón: transformación de datos (input → output listo para exportar)
export function buildReportDataset({
  products,          // Array de productos origen
  selectedFields,    // Campos seleccionados para el reporte [{ key, label }]
  scope,             // Alcance del reporte: "all" | "formaFarmaceutica"
  formaFarmaceutica  // Valor de filtro (ej: "Tableta", "Jarabe")
}) {
    // Copia inmutable del array original (evita mutaciones sobre el estado global)
    let filteredProducts = [...products];

    // Filtro por alcance: si el usuario selecciona "formaFarmaceutica"
    // se aplica el filtro específico sobre la propiedad formaFarmaceutica
    if (scope === "formaFarmaceutica" && formaFarmaceutica) {
        filteredProducts = filteredProducts.filter(
        (product) => product.formaFarmaceutica === formaFarmaceutica
        );
    }

    // Construcción de encabezados del reporte
    // Se toma el label de cada campo seleccionado
    const headers = selectedFields.map((field) => field.label);

    // Construcción de filas del reporte
    // Cada producto se transforma en un array de valores según los campos seleccionados
    const rows = filteredProducts.map((product) =>
        selectedFields.map((field) => {
        const value = product[field.key]; // Acceso dinámico a la propiedad
        return value ?? "";               // Normalización: evita undefined o null
        })
    );

    // Estructura final desacoplada de la UI
    // Lista para exportar a Excel, PDF o renderizar en tabla
    return {
        headers, // Array de strings (columnas)
        rows     // Array de arrays (filas)
    };
}
