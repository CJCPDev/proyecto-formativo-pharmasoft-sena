// ─────────────────────────────────────────────
// CartColumns.jsx
// Columnas de la tabla de carritos
// ─────────────────────────────────────────────

import { useNavigate } from "react-router-dom";
import { getUsuarioActual } from "@/features/auth/services/authService";
import { Eye, Pencil } from "lucide-react";

function CartRowActions({ carrito }) {
  const navigate = useNavigate();
  const esActivo = carrito.estado === 'activo';

  return (
    <div className="flex justify-center items-center gap-2">
      {/* Ver detalle — siempre visible */}
      <button
        onClick={() => navigate(`/ver-carrito/${carrito.id_carrito}`)}
        className="p-1 hover:text-brand-hover transition"
        title="Ver detalle"
      >
        <Eye size={18} />
      </button>

      {/* Editar — solo si está activo, admin y farmaceuta */}
      {esActivo && (
        <button
          onClick={() => navigate(`/editar-carrito/${carrito.id_carrito}`)}
          className="p-1 hover:text-brand-hover transition"
          title="Editar"
        >
          <Pencil size={18} />
        </button>
      )}
    </div>
  );
}

export const CartColumns = [
  {
    header: "N° Factura",
    accessorKey: "id_factura",
    cell: ({ row }) => row.original.id_factura ?? "Sin factura",
  },
  {
    header: "Cliente",
    accessorKey: "nombre_cliente",
    cell: ({ row }) => row.original.nombre_cliente ?? "Sin cliente",
  },
  {
    header: "Estado",
    accessorKey: "estado",
    cell: ({ row }) => {
      const estado = row.original.estado;
      const colores = {
        activo: "bg-green-100 text-green-700",
        confirmado: "bg-blue-100 text-blue-700",
        cancelado: "bg-red-100 text-red-700",
      };
      return (
      <div className="flex justify-center">
        <span className={`px-4 py-2 rounded-full text-xs font-bold ${colores[estado] || "bg-gray-100 text-gray-700"}`}>
          {estado}
        </span>
      </div>
      );
    },
  },
  {
    header: "Aprobado por",
    accessorKey: "nombre_aprobado_por",
    cell: ({ row }) => row.original.nombre_aprobado_por ?? "Sin aprobar",
  },
  {
    header: "Acciones",
    id: "acciones",
    cell: ({ row }) => (
      <div className="flex justify-center items-center gap-2">
        <CartRowActions carrito={row.original} />
      </div>
    ),
  },
];