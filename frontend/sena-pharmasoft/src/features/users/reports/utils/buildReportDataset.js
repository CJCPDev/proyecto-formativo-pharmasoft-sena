// ─────────────────────────────────────────────
// buildReportDataset.js
// Utilidad para transformar datos de usuarios
// en un dataset listo para exportar a Excel o PDF
// ─────────────────────────────────────────────

export function buildReportDataset({
  users,           // Array de usuarios desde la API
  selectedFields,  // Campos seleccionados [{ key, label }]
  scope,           // "all" | "document"
  documentNumber   // Número de documento para filtrar
}) {

  // Copia inmutable del array original
  let filteredUsers = [...users];

  // Filtra por número de documento si el alcance es "document"
  if (scope === "document" && documentNumber) {
    filteredUsers = filteredUsers.filter(
      (user) => String(user.documentNumber) === String(documentNumber.trim())
    );
  }

  // Construcción de encabezados del reporte
  const headers = selectedFields.map((field) => field.label);

  // Construcción de filas del reporte
  const rows = filteredUsers.map((user) =>
    selectedFields.map((field) => {
      const value = user[field.key];
      // Normalización — evita undefined o null en el reporte
      return value ?? "";
    })
  );

  return {
    headers, // Array de strings (columnas)
    rows     // Array de arrays (filas)
  };
}