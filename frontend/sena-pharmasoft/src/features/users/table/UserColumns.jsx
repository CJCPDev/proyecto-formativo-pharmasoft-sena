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


export const UserColumns = [
  {
    // ID del usuario desde la BD
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    // Nombre del rol viene directo desde la API
    accessorKey: "userGroup",
    header: "Rol",
  },
  {
    // Nombre del tipo de documento viene directo desde la API
    accessorKey: "documentType",
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
  accessorKey: "is_active",
  header: "Estado",

  cell: ({ row }) => {
    const user = row.original;

    const estado = Boolean(user.is_active); // asegura true/false real

    const handleChange = (value) => {
      console.log("Actualizar estado usuario:", user.id, value);

      // Aquí iría tu API:
      // updateUserStatus(user.id, value)
    };

    return (
      <div className="flex items-center gap-2">
        
        {/* Switch */}
        <StatusSwitch
          checked={estado}
          onChange={handleChange}
        />
      </div>
    );
  },
},
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => <UserRowActions user={row.original} />,
  },
];