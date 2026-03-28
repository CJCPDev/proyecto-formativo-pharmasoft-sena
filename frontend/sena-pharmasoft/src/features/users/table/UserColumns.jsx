// ─────────────────────────────────────────────
// UserColumns.jsx
// Define las columnas de la tabla de usuarios.
// Los nombres de rol y tipo de documento vienen
// directamente desde la API de Django
// ─────────────────────────────────────────────

// Componente reutilizable que muestra un switch para activar o desactivar estados
import StatusSwitch from "@/shared/components/StatusSwitch";

// Componente que contiene los botones de acciones (editar y eliminar) para cada usuario
import UserRowActions from "../components/UserRowActions";
import { cambiarEstadoUsuario } from "../services/usuarioService";
import { getUsuarioActual } from "../../auth/services/authService";

export const UserColumns = [
  {
    // ID del usuario desde la BD
    accessorKey: "id_tipo_usuario",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    // Nombre del rol viene directo desde la API
    accessorKey: "userGroupNombre",
    header: "Rol",
  },
  {
    // Nombre del tipo de documento viene directo desde la API
    accessorKey: "documentTypeNombre",
    header: "Tipo de identificacion",
  },
  {
    accessorKey: "documentNumber",
    header: "Numero de documento",
  },
  {
    accessorKey: "userEmail",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Telefono",
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const user = row.original;
      const usuarioActual = getUsuarioActual();

      //Solo el administrador puede cambiar el estado
      const esAdmin = usuarioActual?.id_rol === 5;

      const handleChange = async (nuevoValor) => {
        try{
          //1 = activo, 2 = Inactivo
          const idEstado = nuevoValor ? 1 : 2;
          await cambiarEstadoUsuario(user.id_tipo_usuario, idEstado);
        } catch (error) {
          console.log("Error al cambiar estado", error);
          alert("No se pudo cambiar el estado del usuario");
        }
      };

      //Farmaceuta solo ve el estado como texto
      if (!esAdmin) {
        return (
          <span className={`px-2 py-1 rounded full text-xs font-medium ${user.estado === 1
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
          }`}>
            {user.estado === 1 ? 'activo' : 'inactivo'}
          </span>
        )
      }

      //Administrador ve el switch interactivo
      return <StatusSwitch checked={user.estado === 1} onChange={handleChange} />;
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => <UserRowActions user={row.original} />,
  },
];