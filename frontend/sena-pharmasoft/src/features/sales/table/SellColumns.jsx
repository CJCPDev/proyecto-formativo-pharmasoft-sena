// Componente reutilizable que muestra un switch para activar o desactivar estados
import {StatusSwitch} from "@/shared/components";
import { updateSaleStatus } from "../services/saleService";
// Componente que contiene los botones de acciones (editar y eliminar) para cada usuario
import SalesRowActions from "../components/SalesRowActions";

// Definición de las columnas de la tabla de usuarios
// Este arreglo suele usarse en librerías de tablas como TanStack Table
export const sellColumns = [
  { accessorKey: "id_factura", header: "Id" },

  { accessorKey: "numeroFactura", header: "Número de factura" },

  { accessorKey: "fechaHora", header: "Fecha y hora" },

  {
    header: "Usuario",
    cell: ({ row }) => row.original.usuario,
  },

  {
    header: "Farmaceuta",
    cell: ({ row }) => row.original.farmaceuta,
  },

  {
     accessorKey: "is_active",
    header: "Estado",
    cell: ({ row }) => {
      const sales = row.original;

      const handleChange = async (value) => {
        await updateSaleStatus(sales.id, value);
      };

      return (
        <StatusSwitch
          checked={sales.is_active}
          onChange={handleChange}
        />
      );
    },
  },

  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => <SalesRowActions sales={row.original} />,
  },
];

export default sellColumns;