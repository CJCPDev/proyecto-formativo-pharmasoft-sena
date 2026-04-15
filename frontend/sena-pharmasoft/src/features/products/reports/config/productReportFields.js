// Define los campos disponibles para configurar el reporte de productos.
// Cada objeto representa una columna que el usuario puede activar o desactivar
// desde el modal de configuración antes de generar el reporte.
//
// Propiedades de cada campo:
//   key:     identificador interno usado para mapear el campo al dato real del producto
//   label:   texto visible que se muestra al usuario en la lista de checkboxes
//   default: si es true el campo viene preseleccionado al abrir el modal
export const productReportFields = [
  {
    key: "nombreMedicamento",
    label: "Nombre del medicamento",
    default: true, // Preseleccionado por ser un campo esencial del reporte
  },
  {
    key: "formaFarmaceutica",
    label: "Forma farmacéutica",
    default: true, // Preseleccionado por ser un campo esencial del reporte
  },
  {
    key: "concentracion",
    label: "Concentración",
    default: false,
  },
  {
    key: "viaAdministracion",
    label: "Vía de administración",
    default: false,
  },
  {
    key: "stock",
    label: "Stock disponible",
    default: false,
  },
  {
    key: "fechaVencimiento",
    label: "Fecha de vencimiento",
    default: false,
  },
  {
    key: "precioVenta",
    label: "Precio de venta",
    default: false,
  },
];
