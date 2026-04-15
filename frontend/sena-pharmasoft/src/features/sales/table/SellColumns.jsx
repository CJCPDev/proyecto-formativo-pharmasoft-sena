import { StatusSwitch } from "@/shared/components";
import { updateSaleStatus } from "../services/saleService";
import { Pencil, Eye } from "lucide-react";

export const sellColumns = ({ onView, onEdit } = {}) => [
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
      const sale = row.original;

      const handleChange = async (checked) => {
        try {
          await updateSaleStatus(sale.id_factura, checked);
        } catch (error) {
          console.error("Error actualizando estado:", error);
        }
      };

      return <StatusSwitch checked={sale.is_active} onChange={handleChange} />;
    },
  },

  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const sale = row.original;

      return (
        <div className="flex gap-4 justify-center">
          <button onClick={() => onEdit?.(sale)}>
            <Pencil size={18} className="cursor-pointer" />
          </button>

          <button onClick={() => onView?.(sale)}>
            <Eye size={18} className="cursor-pointer" />
          </button>
        </div>
      );
    },
  },
];

export default sellColumns;
