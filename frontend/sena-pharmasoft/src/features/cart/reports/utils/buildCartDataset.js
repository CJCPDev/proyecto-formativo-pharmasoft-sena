// ─────────────────────────────────────────────
// buildCartDataset.js
// Transforma los datos del carrito en dataset
// listo para exportar a Excel o PDF
// ─────────────────────────────────────────────

export function buildCartDataset({
  carritos,
  selectedFields,
  filtroEstado,
  scope,
  documento,
}) {
  let filtrados = [...carritos];

  // Filtra por estado
  if (filtroEstado && filtroEstado !== "todos") {
    filtrados = filtrados.filter((c) => c.estado === filtroEstado);
  }

  // Filtra por documento del cliente
  if (scope === "document" && documento) {
    filtrados = filtrados.filter((c) =>
      String(c.documento_cliente).includes(documento.trim()),
    );
  }

  // Construcción de encabezados
  const headers = selectedFields.map((field) => field.label);

  // Construcción de filas
  const rows = filtrados.map((carrito) =>
    selectedFields.map((field) => {
      const value = carrito[field.key];
      return value ?? "";
    }),
  );

  return { headers, rows };
}
