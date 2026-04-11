// Componente reutilizable que muestra un switch para activar o desactivar estados
import {StatusSwitch} from "@/shared/components";
import { updateSaleStatus } from "../services/saleService";
// Componente que contiene los botones de acciones (editar y eliminar) para cada usuario
import { Pencil, Eye } from "lucide-react";

// Definición de las columnas de la tabla de usuarios
// Este arreglo suele usarse en librerías de tablas como TanStack Table
export const sellColumns = ({ onView, onEdit }) => [
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

const handleChange = async (checked) => {
  console.log("SWITCH VALUE:", checked);
  await updateSaleStatus(sales.id, checked);
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
    cell: ({ row }) => (
      <div className="flex gap-4">
        <button onClick={() => onEdit(row.original)}>
          <Pencil size={18} />
        </button>

        <button onClick={() => onView(row.original)}>
          <Eye size={18} />
        </button>
      </div>
    ),
  },
];

export default sellColumns;