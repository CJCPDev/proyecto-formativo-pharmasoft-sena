<<<<<<< HEAD
// Iconos usados en los botones de acciones
import { Pencil, Eye } from "lucide-react";

// Hook de React Router para navegar programáticamente entre rutas
import { useNavigate } from "react-router-dom";

// Componente que renderiza las acciones de cada fila de usuario
// Recibe como prop el objeto user
export default function UserRowActions({ user }) {

  // const handleEdit = () => {
  //   console.log("Editar usuario", user.id);
  // };

  // Hook que permite redirigir a otra ruta desde código
    const navigate = useNavigate();

  // Acción para editar el usuario
  // Redirige a la página de edición usando el id del usuario
    const handleEdit = () => {
    navigate(`/editar-usuarios/${user.id}`);
    };

  // Acción para eliminar el usuario
  // Actualmente solo imprime en consola el id
  // En una aplicación real aquí se llamaría a la API
    const handleDetail = () => {
    navigate(`/ver-usuarios/${user.id}`);
    };

    return (
    // Contenedor de los botones de acciones
    <div className="flex gap-2">

      {/* Botón editar */}
        <button
        onClick={handleEdit} // Ejecuta la navegación a la página de edición
        className="p-1 rounded hover:bg-gray-100"
        >
        <Pencil size={16} /> {/* Icono de editar */}
        </button>

      {/* Botón eliminar */}
        <button
        onClick={handleDetail} // Ejecuta la acción de eliminación
        className="p-1 rounded hover:bg-gray-100"
        >
        <Eye size={24} /> {/* Icono de eliminar */}
        </button>

    </div>
    );
}
=======
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
>>>>>>> piloto_backend
