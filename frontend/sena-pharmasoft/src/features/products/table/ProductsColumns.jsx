// Componente switch reutilizable para activar o desactivar el estado del medicamento
import StatusSwitch from "../../../shared/components/StatusSwitch";

// Componente con los botones de acción (editar, ver detalle) de cada fila
import ProductsRowActions from "../components/ProductsRowActions";

// Se exporta como función en lugar de array para poder recibir fetchMedicamentos
// como parámetro y recargar la tabla después de cambiar el estado
export const getProductsColumns = (fetchMedicamentos) => [
  {
    accessorKey: "id_medicamento",
    header: "Id",
  },
  {
    accessorKey: "nombre_medicamento",
    header: "Nombre de medicamento",
  },
  {
    accessorKey: "nombre_forma_farmaceutica",
    header: "Forma farmacéutica",
  },
  {
    accessorKey: "concentracion",
    header: "Concentración",
  },
  {
    accessorKey: "nombre_via_administracion",
    header: "Vía de administración",
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
    // Columna con celda personalizada: muestra un switch en lugar de texto
    cell: ({ row }) => {
      const producto = row.original; // Objeto completo del medicamento en esta fila

      // Llama a la API para persistir el cambio de estado y recarga la tabla
      const handleChange = async (value) => {
        try {
          await fetch(`http://127.0.0.1:8000/api/medicamentos/${producto.id_medicamento}/estado`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            // 1 = Activo, 2 = Inactivo según los ids de la tabla estados_medicamento
            body: JSON.stringify({ id_estado: value ? 1 : 2 })
          });
          // Recargamos la tabla para reflejar el nuevo estado
          fetchMedicamentos();
        } catch (error) {
          console.error("Error al actualizar estado:", error);
        }
      };

      return (
        // El switch se marca como activo si el estado del medicamento es "Activo"
        <StatusSwitch
          checked={producto.nombre_estado === "Activo"}
          onChange={(checked) => handleChange(checked)}
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