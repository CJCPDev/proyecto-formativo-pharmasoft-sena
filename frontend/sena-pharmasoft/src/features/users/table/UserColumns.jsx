<<<<<<< HEAD
=======
// ─────────────────────────────────────────────
// UserColumns.jsx
// Define las columnas de la tabla de usuarios.
// Los nombres de rol y tipo de documento vienen
// directamente desde la API de Django
// ─────────────────────────────────────────────

>>>>>>> piloto_backend
// Componente reutilizable que muestra un switch para activar o desactivar estados
import StatusSwitch from "@/shared/components/StatusSwitch";

// Componente que contiene los botones de acciones (editar y eliminar) para cada usuario
import UserRowActions from "../components/UserRowActions";
<<<<<<< HEAD

// Mapeos
const userGroupMap = {
  "1": "Administrador",
  "2": "Cliente",
  "3": "Farmaceuta",
};

const documentTypeMap = {
  "NIT": "Número de identificación tributaria",
  "C.C": "Cédula de ciudadanía",
  "T.I": "Tarjeta de identidad",
  "PPT": "Permiso por Protección Temporal",
  "PEP": "Permiso Especial de Permanencia",
  "C.E": "Cédula de extranjería",
};

export const UserColumns = [
  {
    accessorKey: "id",
=======
import { cambiarEstadoUsuario } from "../services/usuarioService";
import { getUsuarioActual } from "../../auth/services/authService";

export const UserColumns = [
  {
    // ID del usuario desde la BD
    accessorKey: "id_tipo_usuario",
>>>>>>> piloto_backend
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
<<<<<<< HEAD
    accessorKey: "userGroup",
    header: "Rol",
    // 👇 Convierte el id al label
    cell: ({ row }) => userGroupMap[row.original.userGroup] ?? row.original.userGroup,
  },
  {
    accessorKey: "documentType",
    header: "Tipo de identificacion",
    // 👇 Convierte la sigla al nombre completo
    cell: ({ row }) => documentTypeMap[row.original.documentType] ?? row.original.documentType,
=======
    // Nombre del rol viene directo desde la API
    accessorKey: "userGroupNombre",
    header: "Rol",
  },
  {
    // Nombre del tipo de documento viene directo desde la API
    accessorKey: "documentTypeNombre",
    header: "Tipo de identificacion",
>>>>>>> piloto_backend
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
<<<<<<< HEAD
      const handleChange = (value) => {
        console.log("Actualizar estado usuario:", user.id, value);
      };
      return <StatusSwitch checked={user.estado === "activo"} onChange={handleChange} />;
=======
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
>>>>>>> piloto_backend
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => <UserRowActions user={row.original} />,
  },
];