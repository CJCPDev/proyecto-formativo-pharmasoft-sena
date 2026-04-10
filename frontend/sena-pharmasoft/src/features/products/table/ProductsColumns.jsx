// Importaciones al inicio del archivo
import StatusSwitch from "../../../shared/components/StatusSwitch"; 
import ProductsRowActions from "../components/ProductsRowActions";

export const ProductsColumns = [
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
    cell: ({ row }) => {
      const producto = row.original;
      const handleChange = (value) => {
        console.log("Actualizar estado producto:", producto.id_medicamento, value);
      };
      return (
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
    cell: ({ row }) => <ProductsRowActions products={row.original} />,
  },
];
