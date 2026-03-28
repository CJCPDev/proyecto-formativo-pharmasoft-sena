// ─────────────────────────────────────────────
// UserRowActions.jsx
// Botones de acciones por fila en la tabla de usuarios
// Editar y visualizar redirigen usando el ID real de la BD
// ─────────────────────────────────────────────

import { Pencil, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserRowActions({ user }) {

  const navigate = useNavigate();

  // Redirige a la página de edición usando el ID real de la BD
  const handleEdit = () => {
    navigate(`/editar-usuarios/${user.id_tipo_usuario}`);
  };

  // Redirige a la página de detalle usando el ID real de la BD
  const handleDetail = () => {
    navigate(`/ver-usuarios/${user.id_tipo_usuario}`);
  };

  return (
    <div className="flex gap-2 items-center justify-center">

      {/* Botón editar */}
      <div className="relative group w-max">
        <button onClick={handleEdit} className="p-1 rounded cursor-pointer">
          <Pencil size={18} className="stroke-brand-fort" />
        </button>
        <span className="absolute top-5 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-brand-hover text-white text-sm p-1 rounded z-15">
          Editar
        </span>
      </div>

      {/* Botón visualizar */}
      <div className="relative group w-max">
        <button onClick={handleDetail} className="relative py-1 rounded cursor-pointer">
          <Eye size={20} className="stroke-brand-fort" />
        </button>
        <span className="absolute top-5 -right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-brand-hover text-white text-sm p-1 rounded z-15">
          Visualizar
        </span>
      </div>

    </div>
  );
}