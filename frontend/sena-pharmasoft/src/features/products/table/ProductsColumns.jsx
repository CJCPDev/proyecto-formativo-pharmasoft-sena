// // Importaciones al inicio del archivo
// import StatusSwitch from "../../../shared/components/StatusSwitch"; 
// import ProductsRowActions from "../components/ProductsRowActions";

// export const ProductsColumns = [
//   {
//     accessorKey: "id_medicamento",
//     header: "Id",
//   },
//   {
//     accessorKey: "nombre_medicamento",
//     header: "Nombre de medicamento",
//   },
//   {
//     accessorKey: "nombre_forma_farmaceutica",
//     header: "Forma Farmacéutica",
//   },
//   {
//     accessorKey: "concentracion",
//     header: "Concentración",
//   },
//   {
//     accessorKey: "nombre_via_administracion",
//     header: "Vía de Administración",
//   },
//   {
//     accessorKey: "stock",
//     header: "Stock",
//   },
//   {
//     accessorKey: "fecha_vencimiento",
//     header: "Fecha de vencimiento",
//   },
//   {
//     accessorKey: "precio_venta",
//     header: "Precio de venta",
//   },
//   {
//     accessorKey: "nombre_estado",
//     header: "Estado",
//     cell: ({ row }) => {
//       const producto = row.original;
//       const handleChange = (value) => {
//         console.log("Actualizar estado producto:", producto.id_medicamento, value);
//       };
//       return (
//         <StatusSwitch
//           checked={producto.nombre_estado === "Activo"}
//           onChange={handleChange}
//         />
//       );
//     },
//   },
//   {
//     id: "actions",
//     header: "Acciones",
//     cell: ({ row }) => <ProductsRowActions products={row.original} />,
//   },
// ];
// Componente switch reutilizable para activar o desactivar el estado del medicamento
import StatusSwitch from "../../../shared/components/StatusSwitch";

// Componente con los botones de acción (editar, ver detalle) de cada fila
import ProductsRowActions from "../components/ProductsRowActions";

// Define las columnas de la tabla de medicamentos.
// Este array es consumido por el componente DataTable para construir la tabla.
// Cada objeto representa una columna con su campo de datos y su encabezado.
export const ProductsColumns = [
  {
    accessorKey: "id_medicamento",       // Campo del objeto de datos que se muestra
    header: "Id",                         // Texto del encabezado de la columna
  },
  {
    accessorKey: "nombre_medicamento",
    header: "Nombre de medicamento",
  },
  {
    accessorKey: "nombre_forma_farmaceutica",
    header: "Forma Farmacéutica",
  },
  {
    accessorKey: "concentracion",
    header: "Concentración",
  },
  {
    accessorKey: "nombre_via_administracion",
    header: "Vía de Administración",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "fecha_vencimiento",
    header: "Fecha de vencimiento",
  },
  {
    accessorKey: "precio_venta",
    header: "Precio de venta",
  },
  {
    accessorKey: "nombre_estado",
    header: "Estado",
    // Columna con celda personalizada: en lugar de texto muestra un switch
    cell: ({ row }) => {
      const producto = row.original; // Objeto completo del medicamento en esta fila

      // Aquí iría la llamada a la API para persistir el cambio de estado en el servidor
      const handleChange = (value) => {
        console.log("Actualizar estado producto:", producto.id_medicamento, value);
      };

      return (
        // El switch se marca como activo si el estado del medicamento es "Activo"
        <StatusSwitch
          checked={producto.nombre_estado === "Activo"}
          onChange={handleChange}
        />
      );
    },
  },
  {
    id: "actions",
    header: "Acciones",
    // Columna con celda personalizada: renderiza los botones de editar y ver detalle
    cell: ({ row }) => <ProductsRowActions products={row.original} />,
  },
];